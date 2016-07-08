/**
 * Created by chenhao on 16/6/16.
 */

/**
 * Created by chenhao on 16/6/10.
 */

import { Meteor } from 'meteor/meteor';

//import C_Boards from '../../../lib/collections/Boards';
//import C_Modules from '../../../lib/collections/Modules';

import C_Devices from '../../../lib/collections/Devices';
//import C_Projects from '../../../lib/collections/Projects';
import C_TriggerRules from '../../../lib/collections/TriggerRules';

//import C_MessageDatas from '../../../lib/collections/MessageDatas';

import {RuleHandlers} from './rulePool';

export const Rules = {};

const device_1 = C_Devices.findOne({ name: "IoT Demo - Garage" });
const device_2 = C_Devices.findOne({ name: "IoT Demo - Door" });
const device_3 = C_Devices.findOne({ name: "IoT Demo - Window" });
const device_4 = C_Devices.findOne({ name: "IoT Demo - House Vault Monitoring" });
const device_5 = C_Devices.findOne({ name: "IoT Demo - IR Remote Controller" });
const device_6 = C_Devices.findOne({ name: "IoT Demo - Power Socket" });
const device_7 = C_Devices.findOne({ name: "IoT Demo - Rainbow Pool" });
const device_8 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Indoor)" });
const device_9 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Outdoor)" });
const device_10 = C_Devices.findOne({ name: "IoT Demo - Information Clock" });
const device_11 = C_Devices.findOne({ name: "IoT Demo - Cloud Music Box" });
const device_12 = C_Devices.findOne({ name: "IoT Demo - Road Lamp" });

//////////////////////
// Utils
//////////////////////


//////////////////////
// Rules
//////////////////////

// 车库 -> 安防状态
const processor_1 = (rule, item) => {
    // console.log("inTrigger : processor_1", item);

    let handler = RuleHandlers[rule._id];

    if ((item.deviceId === rule.sourceIds[0]) && item.payload['using']) {
        handler.current.using = JSON.parse(item.payload['using']);
    }

    if (handler.isWaitToken) {
        return false;
    }

    let target = C_Devices.findOne({ _id: rule.targetIds[0] });
    if (target) {

        // console.log("inTrigger : processor_1 handler", handler);
        let entity = {
            deviceId: target._id, token: target.secureToken,
            by: rule.desc,
            enable: !handler.current.using,
        };
        let ret = Meteor.call('control.add', entity);
        // console.log('mqtt control.add', ret);
        return true;
    }
    return false;
};

Rules.rule_1 = {
    _id: '1',
    desc: "车库 -> 安防状态",
    sourceIds: [device_1._id],
    targetIds: [device_4._id],
    processor: processor_1
};

// 门 + 安防状态 -> 报警
const processor_2 = (rule, item) => {
    // console.log("inTrigger : processor_2", item);

    let handler = RuleHandlers[rule._id];

    if ((item.deviceId === rule.sourceIds[0]) && item.payload['opening']) {
        handler.current.opening = JSON.parse(item.payload['opening']);
    }

    if ((item.deviceId === rule.sourceIds[1]) && item.payload['enabled']) {
        handler.current.enabled = JSON.parse(item.payload['enabled']);
    }

    if (handler.isWaitToken) {
        return false;
    }

    if (handler.current.enabled && handler.current.opening) {
        let target = C_Devices.findOne({ _id: rule.targetIds[0] });
        if (target) {

            let entity = {
                deviceId: target._id, token: target.secureToken,
                by: rule.desc,
                warn: true
            };
            let ret = Meteor.call('control.add', entity);
            // console.log('mqtt control.add', ret);

            return true;
        }
    }
    return false;
};

Rules.rule_2 = {
    _id: '2',
    desc: "门 + 安防状态 -> 报警",
    sourceIds: [device_2._id, device_4._id],
    targetIds: [device_4._id],
    processor: processor_2
};

// 窗 + 安防状态 -> 报警
const processor_3 = (rule, item) => {
    // console.log("inTrigger : processor_3", item);

    let handler = RuleHandlers[rule._id];

    if ((item.deviceId === rule.sourceIds[0]) && item.payload['opening']) {
        handler.current.opening = JSON.parse(item.payload['opening']);
    }

    if ((item.deviceId === rule.sourceIds[1]) && item.payload['enabled']) {
        handler.current.enabled = JSON.parse(item.payload['enabled']);
    }

    if (handler.isWaitToken) {
        return false;
    }

    if (handler.current.enabled && handler.current.opening) {
        let target = C_Devices.findOne({ _id: rule.targetIds[0] });
        if (target) {

            let entity = {
                deviceId: target._id, token: target.secureToken,
                by: rule.desc,
                warn: true
            };
            let ret = Meteor.call('control.add', entity);
            // console.log('mqtt control.add', ret);

            return true;
        }
    }

    return false;
};

Rules.rule_3 = {
    _id: '3',
    desc: "窗 + 安防状态 -> 报警",
    sourceIds: [device_3._id, device_4._id],
    targetIds: [device_4._id],
    processor: processor_3
};

// 室外气象站 + 安防状态-> 开窗
const processor_4 = (rule, item) => {
    // console.log("inTrigger : processor_4", item);

    let handler = RuleHandlers[rule._id];

    if ((item.deviceId === rule.sourceIds[0]) && item.payload['PM']) {
        handler.current.PM = item.payload['PM'];
        handler.current.Temperature = item.payload['Temperature'];
        handler.current.Humidity = item.payload['Humidity'];
    }

    if ((item.deviceId === rule.sourceIds[1]) && item.payload['enabled']) {
        handler.current.enabled = JSON.parse(item.payload['enabled']);
    }

    if (handler.isWaitToken) {
        return false;
    }

    if ((!handler.current.enabled) &&
        ( handler.current.PM < 50 && handler.current.Temperature < 25)) {
        let target = C_Devices.findOne({ _id: rule.targetIds[0] });
        if (target) {
            let entity = {
                deviceId: target._id, token: target.secureToken,
                by: rule.desc,
                open: true
            };

            // C_MessageDatas.insert(entity);
            let ret = Meteor.call('control.add', entity);
            // console.log('mqtt control.add', ret);
            return true;
        }
    }
    return false;
};

Rules.rule_4 = {
    _id: '4',
    desc: "室外气象站 + 安防状态-> 开窗",
    sourceIds: [device_9._id, device_4._id],
    targetIds: [device_3._id],
    processor: processor_4
};

// 室外气象站 -> 信息显示时钟
const processor_5 = (rule, item) => {
    // console.log("inTrigger : processor_5", item);

    let handler = RuleHandlers[rule._id];

    if (item.deviceId === rule.sourceIds[0]) {
        handler.current.message = JSON.stringify(item.payload);
    }

    if (handler.isWaitToken) {
        return false;
    }

    let target = C_Devices.findOne({ _id: rule.targetIds[0] });
    if (target) {
        let entity = {
            deviceId: target._id, token: target.secureToken,
            by: rule.desc,
            input: handler.current.message
        };
        let ret = Meteor.call('control.add', entity);
        // console.log('mqtt control.add', ret);
        return true;
    }
    return false;
};

Rules.rule_5 = {
    _id: '5',
    desc: "室外气象站 -> 信息显示时钟",
    sourceIds: [device_9._id],
    targetIds: [device_10._id],
    processor: processor_5
};

// 室内气象站 -> 信息显示时钟
const processor_6 = (rule, item) => {
    // console.log("inTrigger : processor_6", item);

    let handler = RuleHandlers[rule._id];

    if (item.deviceId === rule.sourceIds[0]) {
        handler.current.message = JSON.stringify(item.payload);
    }

    if (handler.isWaitToken) {
        return false;
    }

    let target = C_Devices.findOne({ _id: rule.targetIds[0] });
    if (target) {
        let entity = {
            deviceId: target._id, token: target.secureToken,
            by: rule.desc,
            input: handler.current.message
        };
        let ret = Meteor.call('control.add', entity);
        // console.log('mqtt control.add', ret);
        return true;
    }
    return false;
};

Rules.rule_6 = {
    _id: '6',
    desc: "室内气象站 -> 信息显示时钟",
    sourceIds: [device_8._id],
    targetIds: [device_10._id],
    processor: processor_6
};

// 信息显示时钟 -> 音箱
const processor_7 = (rule, item) => {
    // console.log("inTrigger : processor_7", item);

    let handler = RuleHandlers[rule._id];

    if ((item.deviceId === rule.sourceIds[0]) && item.payload['alarm']) {
        handler.current.alarm = item.payload['alarm'];
    }

    if ((item.deviceId === rule.sourceIds[1]) && item.payload['paused']) {
        handler.current.paused = JSON.parse(item.payload['paused']);
    }

    if (handler.isWaitToken) {
        return false;
    }

    if (handler.current.paused && handler.current.alarm) {
        let target = C_Devices.findOne({ _id: rule.targetIds[0] });
        if (target) {

            let entity = {
                deviceId: target._id, token: target.secureToken,
                by: rule.desc,
                play: "http://mp3_url.mp3", volume: 80
            };
            let ret = Meteor.call('control.add', entity);
            // console.log('mqtt control.add', ret);
            return true;
        }
    }
    return false;
};

Rules.rule_7 = {
    _id: '7',
    desc: "信息显示时钟 -> 音箱",
    sourceIds: [device_10._id, device_11._id],
    targetIds: [device_11._id],
    processor: processor_7
};