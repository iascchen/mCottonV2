import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const C_TriggerRulesLiveStatus = new Mongo.Collection('trigger_rules_live');

const schema = new SimpleSchema({
    ruleId: {
        type: String
    },

    ruleName: {
        type: String,
        optional: true
    },

    accessedAt: {
        type: Number, label: "Last accessed at",
        optional: true
    },

    accessedMsg: {
        type: String, label: "Last accessed message",
        optional: true
    },
});

C_TriggerRulesLiveStatus.attachSchema(schema);

export default C_TriggerRulesLiveStatus;
