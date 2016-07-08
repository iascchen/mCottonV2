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

    payload: { type: Object, blackbox: true },

    by: { type: String, optional: true }
});

C_MessageDatas.attachSchema(schema);

C_MessageDatas.ensureIndex({ deviceId: 1, createAt: -1 });
C_MessageDatas.ensureIndex({ createAt: -1, 'payload.location': '2d' }, { sparse: true });

export default C_MessageDatas;
