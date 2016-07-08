import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { MSGS_TYPES, MSGS_AUTO_FORM, MSG_DATA } from '../constants';

const C_MessageDatas = new Mongo.Collection('msg_datas');

const schema = new SimpleSchema({
    deviceId: { type: String },

    createAt: { type: Number, defaultValue: new Date().getTime() },

    msgType: {
        type: Number, label: "Message Type",
        allowedValues: MSGS_TYPES,
        defaultValue: MSG_DATA
        //autoform: {
        //    options: STATUS_AUTO_FORM
        //}
    },

    payload: { type: Object, blackbox: true }
});

C_MessageDatas.attachSchema(schema);

export default C_MessageDatas;
