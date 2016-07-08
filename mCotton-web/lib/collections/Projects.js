import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NORMAL } from '../constants';

const C_Projects = new Mongo.Collection('projects');

const schema = new SimpleSchema({
    authorId: {
        type: String, label: "Developer Id"
    },

    secureToken: {
        type: String, label: "Developer secure token"
    },

    authorName: {
        type: String, label: "Developer name",
        optional: true
    },

    name: {
        type: String
    },

    desc: {
        type: String, label: "Description",
        optional: true
    },

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
        defaultValue: STATUS_NORMAL
        //autoform: {
        //    options: STATUS_AUTO_FORM
        //}
    },

    /////////////////////
    // Sketch Source
    /////////////////////

    supportedBoards: {
        type: [String], label: "Supported boards / cores",
        optional: true
    },

    usedModules: {
        type: [String], label: "Modules Used",
        optional: true
    },

    sourceCodeUrl: {
        type: String, label: "Sketch source code url",
        optional: true
    },
});

C_Projects.attachSchema(schema);

export default C_Projects;
