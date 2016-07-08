/**
 * Created by chenhao on 15/4/16.
 */
import { Meteor } from 'meteor/meteor';

import Fiber from 'fibers';
import mosca from 'mosca';

import { SHARE_PRIVATE, SHARE_TOKEN, SHARE_PUBLIC, STATUS_DELETED } from '../../../lib/constants';
import C_Devices from '../../../lib/collections/Devices';

const adminDevice = C_Devices.findOne({ name: "_mqttTrigger", status: STATUS_DELETED });

// Accepts the connection if the device_id and secureToken are valid
const authenticate = function (client, deviceId, secureToken, callback) {
    //console.log("authenticate");
    let authorized = false;

    Fiber(function () {
        try {
            let token = secureToken.toString();
            let device = C_Devices.findOne({ _id: deviceId });
            if (device) {
                if (device.secureToken === token) {
                    authorized = true;

                    client.device = deviceId;
                    client.pubsub = true;
                }
                else if (((device.subscribeToken === token) && (device.share === SHARE_TOKEN ))
                    || (device.share === SHARE_PUBLIC)) {
                    authorized = true;

                    client.device = deviceId;
                    client.pubsub = false;
                }
            }

            // console.log('mqtt client authenticate', authorized);
        } catch (e) {
            console.log("Error in authenticate : " + deviceId, e);
        }

        callback(null, authorized);
    }).run();

};

const authorizePublish = function (client, topic, payload, callback) {
    let ok = (( client.device === topic.split('/')[2] ) && client.pubsub)
        || (client.device === adminDevice._id);
    //console.log("authorizePublish", ok);

    // TODO if user publish to other's Topic(It is wrong), it will access server many times and not stop.

    callback(null, ok);
};

const authorizeSubscribe = function (client, topic, callback) {
    let ok = ( client.device === topic.split('/')[2])
        || (client.device === adminDevice._id);
    //console.log("authorizeSubscribe", ok);

    callback(null, ok);
};

const formatMsg = (msg) => {
    const deviceName = ["device_id", "device_Id", "Device_id", "Device_Id"];
    deviceName.forEach((name) => {
        delete msg[name];
    });
};

Meteor.startup(function () {
    const enabled = Meteor.settings.mqtt.enabled;
    if (!enabled) {
        return;
    }

    const mqttDbUrl = Meteor.settings.mqtt.server.dbUrl;
    const mqttPort = Meteor.settings.mqtt.server.port;

    const settings = {
        port: mqttPort,
        backend: {
            type: 'mongo',
            url: mqttDbUrl,
            pubsubCollection: 'ascoltatori',
            mongo: {}
        }
    };

    console.log("mqtt mosca settings", settings);
    const server = new mosca.Server(settings);

    // fired when the mqtt server is ready
    function setup() {
        server.authenticate = authenticate;
        server.authorizePublish = authorizePublish;
        server.authorizeSubscribe = authorizeSubscribe;

        console.log('mCotton mqtt server is up and running');
    }

    server.on('ready', setup);

    server.on('clientConnected', function (client) {
        console.log('mqtt client connected', client.id);
    });

    // fired when a message is received
    // TODO : add rate limit
    server.on('published', function (packet, client) {
        let topic = packet.topic;
        let payload = packet.payload;

        if (topic.indexOf("$SYS") > -1)
            return;

        console.log('Published', topic, payload.toString());

        new Fiber(() => {
            try {
                let event = JSON.parse(payload.toString());
                let device;

                if (client.device === adminDevice._id) {
                    device = C_Devices.findOne({ _id: event.deviceId });
                } else {
                    device = C_Devices.findOne({ _id: client.device });
                }

                if (!device) {
                    return;
                }

                formatMsg(event);

                let mqttcmd = topic.split("/")[1];
                switch (mqttcmd) {
                    case 'c':
                    {
                        Object.assign(event, { deviceId: device._id, token: device.secureToken, by: "Device" });

                        let ret = Meteor.call('control.add', event);
                        // console.log('mqtt control.add', ret);
                    }
                        break;
                    case 'd':
                    {
                        Object.assign(event, { deviceId: device._id, token: device.secureToken });

                        if (event.deviceId && event.token) {
                            let ret = Meteor.call('data.add', event);
                            // console.log('mqtt data.add', ret);
                        }
                    }
                        break;
                    case 'e':
                    {
                        Object.assign(event, { deviceId: device._id, token: device.secureToken });

                        if (event.deviceId && event.token) {
                            let ret = Meteor.call('event.add', event);
                            // console.log('mqtt event.add', ret);
                        }
                    }
                        break;
                }
            } catch (e) {
                console.log("Error in published : " + payload.toString(), e);
            }
        }).run();
    });
});
