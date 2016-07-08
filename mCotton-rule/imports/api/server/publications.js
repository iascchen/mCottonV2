//import { Meteor } from 'meteor/meteor';
//import { check } from 'meteor/check'
////import { FindFromPublication } from 'meteor/percolate:find-from-publication'
//
////import { Counts } from 'meteor/tmeasday:publish-counts';
//
//import { STATUS_NORMAL, STATUS_DISABLED, MSG_DATA, MSG_CONTROL, MSG_EVENT, SHARE_PUBLIC } from '../../../lib/constants';
//
//import C_Boards from '../../../lib/collections/Boards';
//import C_Modules from '../../../lib/collections/Modules';
//
//import C_Devices from '../../../lib/collections/Devices';
//import C_Widgets from '../../../lib/collections/Widgets';
//
//import C_Projects from '../../../lib/collections/Projects';
//import C_TriggerRules from '../../../lib/collections/TriggerRules';
//
//import C_MessageDatas from '../../../lib/collections/MessageDatas';
//
//
///********************************
// * C_Devices
// ********************************/
//
//const deviceListFields = {
//    name: 1, desc: 1, status: 1
//};
//
//const projectListFields = {
//    name: 1, desc: 1, status: 1
//};
//
////const getDevicesPublication = function (filter, pageSkip = 0) {
////    let query = {};
////
////    switch (filter.type) {
////        case 'SHOW_ALL':
////            break;
////        case 'SHOW_NORMAL':
////            query.status = C_Constants.STATUS_NORMAL;
////            break;
////        case 'SHOW_OWNER':
////            query = {
////                status: C_Constants.STATUS_NORMAL,
////                $or: [{ ownerId: filter.ownerId }, { share: C_Constants.SHARE_PUBLIC }]
////            };
////            break;
////        case 'SHOW_PUBLIC':
////            query.share = C_Constants.SHARE_PUBLIC;
////            query.status = C_Constants.STATUS_NORMAL;
////            break;
////        default:
////            break;
////    }
////
////    Counts.publish(this, 'DeviceCount', C_Devices.find(query));
////    // Counts.get('DeviceCount');
////
////    return C_Devices.find(query, { fields: devicePubFields, skip: pageSkip, limit: 10 });
////};
////
////Meteor.publish('getDevices', getDevicesPublication);
//
///********************************
// * Utils
// ********************************/
//
//const MAX_LIMIT = Meteor.settings.general.queryMaxLimit;
//
//const fetchMyDeviceIds = function () {
//    let dev_ids = C_Devices.find({ ownerId: this.userId }, { fields: { _id: 1 } }).fetch();
//    return Array.from(dev_ids, (x) => x._id);
//};
//
///********************************
// * Publish
// ********************************/
//
//Meteor.publish('devices', function (limit) {
//    return C_Devices.find(
//        { status: STATUS_NORMAL },
//        { sort: { createdAt: -1 }, fields: deviceListFields, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('my_devices', function (limit) {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    return C_Devices.find(
//        { ownerId: this.userId },
//        { sort: { createdAt: -1 }, fields: deviceListFields, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('my_usable_devices', function (limit) {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    return C_Devices.find(
//        { status: STATUS_NORMAL, $or: [{ ownerId: this.userId }, { share: SHARE_PUBLIC }] },
//        { sort: { createdAt: -1 }, fields: deviceListFields, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('device', function (deviceId) {
//    check(deviceId, String);
//
//    return C_Devices.find({ _id: deviceId });
//});
//
////Meteor.publish('widget', function (widgetId) {
////    check(widgetId, String);
////
////    return C_Widgets.find({ _id: widgetId });
////});
//
//Meteor.publish('device_widgets', function (deviceId) {
//    check(deviceId, String);
//
//    return C_Widgets.find({ deviceId: deviceId });
//});
//
//Meteor.publish('projects', function (limit) {
//    return C_Projects.find({},
//        { sort: { createdAt: -1 }, fields: projectListFields, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('trigger_rules', function () {
//    return C_TriggerRules.find({});
//});
//
//Meteor.publish('my_trigger_rules', function () {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    return C_TriggerRules.find({ ownerId: this.userId });
//});
//
//// TODO , add use for demo, need remove after demo
//Meteor.publish('device_datas', function (deviceId, limit) {
//    return C_MessageDatas.find({ deviceId: deviceId },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('msg_datas', function (limit) {
//    return C_MessageDatas.find({ msgType: MSG_DATA },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('msg_controls', function (limit) {
//    return C_MessageDatas.find({ msgType: MSG_CONTROL },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('msg_events', function (limit) {
//    return C_MessageDatas.find({ msgType: MSG_EVENT },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('my_devices_datas', function (limit) {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    let ids = fetchMyDeviceIds();
//    return C_MessageDatas.find({ msgType: MSG_DATA, deviceId: { $in: ids } },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('my_devices_controls', function (limit) {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    let ids = fetchMyDeviceIds();
//    return C_MessageDatas.find({ msgType: MSG_CONTROL, deviceId: { $in: ids } },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});
//
//Meteor.publish('my_devices_events', function (limit) {
//    if (!this.userId) {
//        return this.ready();
//    }
//
//    let ids = fetchMyDeviceIds();
//    return C_MessageDatas.find({ msgType: MSG_EVENT, deviceId: { $in: ids } },
//        { sort: { createdAt: -1 }, limit: Math.min(limit, MAX_LIMIT) });
//});