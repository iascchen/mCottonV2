/**
 * Created by chenhao on 15/4/16.
 */

import { Meteor } from 'meteor/meteor';
//import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

import mqtt from 'mqtt';

import { MSG_CONTROL , STATUS_DELETED} from '../../../lib/constants';

import C_Devices from '../../../lib/collections/Devices';
import C_MessageDatas from '../../../lib/collections/MessageDatas';

////////////////////////
// MQTT

const contorl_cmd = "c";

let mqttClient;

const startMqttTrigger = function () {
    const mqttHost = Meteor.settings.mqtt.trigger.host;
    const mqttPort = Meteor.settings.mqtt.trigger.port;

    const adminDevice = C_Devices.findOne({ name: "_mqttTrigger", status: STATUS_DELETED });

    let settings = {
        host: mqttHost,
        port: mqttPort,
        username: adminDevice._id,
        password: adminDevice.secureToken
    };

    console.log("mqtt client settings", settings);

    return mqtt.connect(settings);
};

const stopMqttTrigger = function () {
    mqttClient.end();
};

const publishControl = function (event) {
    const controls = ["v1.0", contorl_cmd, event.deviceId];
    const control_topic = controls.join("/");

    const device = C_Devices.findOne({ _id: event.deviceId });
    let ret = { cmd: "cm", token: device.secureToken };
    Object.assign(ret, event.payload);

    // console.log("publishControl", control_topic, JSON.stringify(ret));
    mqttClient.publish(control_topic, JSON.stringify(ret));
};

// DDPRateLimiter.addRule(publishControl, 4, 1000);

////////////////////////
// Init Data trigger when Meteor.startup

Meteor.startup(function () {
    const enabled = Meteor.settings.mqtt.enabled;
    if (!enabled) {
        return;
    }

    mqttClient = startMqttTrigger();

    let initializing = true;
    let now = new Date().getTime();

    C_MessageDatas.find({
        msgType: MSG_CONTROL,
        createAt: { $gt: now }
    }).observeChanges({
        added: function (id, entity) {
            if (!initializing) {
                // console.log("inMqttTrigger control added: ", entity);

                publishControl(entity);
            }
        }
    });

    initializing = false;
});
