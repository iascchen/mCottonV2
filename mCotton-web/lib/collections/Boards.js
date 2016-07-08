import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NORMAL } from '../constants';

const C_Boards = new Mongo.Collection('boards');

const schema = new SimpleSchema({
    value: {
        type: String, label: "value",
        optional: false,
        unique: true,
    },

    name: {
        type: String, label: "Name",
        optional: false,
    },

    icon: {
        type: String,
        label: "Icon Name",
        max: 30,
        optional: false
    },

    board_tag: {
        type: String, label: "Board Tag",
        optional: false,
    },

    board_sub: {
        type: String, label: "Board Sub",
        optional: true,
    },

    desc: {
        type: String, label: "Description",
        optional: true,
    },

    status: {
        type: Number, label: "Status",
        allowedValues: STATUS_TYPES,
        defaultValue: STATUS_NORMAL,
        //autoform: {
        //    options: STATUS_AUTO_FORM
        //}
    },
});

C_Boards.attachSchema(schema);

export default C_Boards;