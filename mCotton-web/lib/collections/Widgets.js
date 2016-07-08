import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NORMAL } from '../constants';

const C_Widgets = new Mongo.Collection('widgets');

// { widget: 'MLed', source: "powered", title: 'Powered', rows: 1, cols: 1 },

const schema = new SimpleSchema({
    deviceId : { type: String },

    widget: {
        type: String, label: "Widget Name",
    },

    widgetType: {
        type: String, label: "Widget type",
    },

    cols: {
        type: Number, defaultValue: 1
    },

    rows: {
        type: Number, defaultValue: 1
    },

    title: {
        type: String
    },

    source: {
        type: String, label: "Data Sources",
        optional: true
    },

    target: {
        type: String, label: "Control",
        optional: true
    },

    color: {
        type: String, label: "Color",
        optional: true
    },

    background: {
        type: String, label: "Background",
        optional: true
    },

    others: {
        type: Object, label: "Other Setting",
        optional: true, blackbox: true,
    },

    createAt: {
        type: Number, label: "Create at",
        defaultValue: new Date().getTime()
    },

    status: {
        type: Number, label: "Status",
        allowedValues: STATUS_TYPES,
        defaultValue: STATUS_NORMAL
    },
});

C_Widgets.attachSchema(schema);

C_Widgets.allow({
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

export default C_Widgets;
