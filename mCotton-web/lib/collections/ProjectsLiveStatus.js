import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const C_ProjectLiveStatus = new Mongo.Collection('projects_live');

const schema = new SimpleSchema({
    projectId: {
        type: String
    },

    projectName: {
        type: String,
        optional: true
    },

    authorName: {
        type: String,
        optional: true
    },

    downloadAt: {
        type: Number, label: "Last Download at",
        optional: true
    },

    downloadCounts: {
        type: Number, label: "Download counts",
        optional: true
    },

    activeAt: {
        type: Number, label: "Last active at",
        optional: false
    },

    activeCounts: {
        type: Number, label: "Active instances counts",
        optional: true
    },
});

C_ProjectLiveStatus.attachSchema(schema);

export default C_ProjectLiveStatus;
