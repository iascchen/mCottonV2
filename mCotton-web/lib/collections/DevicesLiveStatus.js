import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const C_DevicesLiveStatus = new Mongo.Collection('devices_live');

const schema = new SimpleSchema({
    deviceId: {
        type: String
    },

    deviceName: {
        type: String,
        optional: true
    },

    ownerName: {
        type: String,
        optional: true
    },

    liveInterval: {
        type: Number,
        defaultValue: 300000  // 300 Seconds
    },

    accessedAt: {
        type: Number, label: "Last access at",
        optional: false
    },
});

C_DevicesLiveStatus.attachSchema(schema);

export default C_DevicesLiveStatus;
