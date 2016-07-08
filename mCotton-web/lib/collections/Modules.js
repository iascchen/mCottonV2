import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NORMAL } from '../constants';

const C_Modules = new Meteor.Collection('modules');

const schema = new SimpleSchema({
    name: {
        type: String, label: "Name",
        max: 120,
        unique: true
    },

    icon: {
        type: String, label: "Icon Name",
        max: 30,
    },

    desc: {
        type: String, label: "Description",
        optional: true
    },

    status: {
        type: Number, label: "Status",
        allowedValues: STATUS_TYPES,
        defaultValue: STATUS_NORMAL
        //autoform: {
        //    options: STATUS_AUTO_FORM
        //}
    },
});

C_Modules.attachSchema(schema);

export default C_Modules;
