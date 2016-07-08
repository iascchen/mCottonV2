import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

//import { Collections_Constants } from './constants';

const C_TriggerRules = new Mongo.Collection('trigger_rules');

const schema = new SimpleSchema({
    ownerId: {
        type: String, label: "Owner Id"
    },

    ownerName: {
        type: String, label: "Owner name",
        optional: true
    },

    name: {
        type: String
    },

    enabled: {
        type: Boolean,
        defaultValue: false
    },

    sourceIds: {
        type: [String], optional: true
    },

    targetIds: {
        type: [String], optional: true
    },

    processor: {
        type: String, optional: true
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
    }
});

C_TriggerRules.attachSchema(schema);

export default C_TriggerRules;
