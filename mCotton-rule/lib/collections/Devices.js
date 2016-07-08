import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NEW, SHARES_TYPES, SHARES_AUTO_FORM, SHARE_PRIVATE } from '../constants';

const C_Devices = new Mongo.Collection('devices');

const schema = new SimpleSchema({
    ownerId: {
        type: String, label: "Owner Id"
    },

    secureToken: {
        type: String, label: "Owner secure token, can sub/pub"
    },

    subscribeToken: {
        type: String, label: "Secure token for other people use its data, only sub"
    },

    ownerName: {
        type: String, label: "Owner name",
        optional: true
    },

    name: {
        type: String
    },

    desc: {
        type: String, label: "Description",
        optional: true
    },

    share: {
        type: Number, label: "Share",
        allowedValues: SHARES_TYPES,
        defaultValue: SHARE_PRIVATE
        //autoform: {
        //    options: SHARES_AUTO_FORM
        //},
    },

    projectId: {
        type: String,
        optional: true
    },

    deviceProfile: {
        type: Object, label: "Device profile, provided by developer",
        blackbox: true, optional: true
    },

    //deviceDashboard: {
    //    type: [String], label: "Device dashboard, store user customized control dashboard",
    //    optional: true
    //},

    image: {
        type: String, label: "Image url",
        optional: true
    },

    createAt: {
        type: Number, label: "Create at",
        defaultValue: new Date().getTime()
    },

    updateAt: {
        type: Number, label: "Update at",
        autoValue: function () {
            return new Date().getTime();
        }
    },

    status: {
        type: Number, label: "Status",
        allowedValues: STATUS_TYPES,
        defaultValue: STATUS_NEW
        //autoform: {
        //    options: STATUS_AUTO_FORM
        //}
    }
});

C_Devices.attachSchema(schema);

C_Devices.allow({
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

export default C_Devices;
