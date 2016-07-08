import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import { STATUS_NORMAL, STATUS_DISABLED, STATUS_DELETED, MSG_CONTROL, MSG_EVENT, MSG_DATA } from '../../../lib/constants';

import C_Boards from '../../../lib/collections/Boards';
import C_Modules from '../../../lib/collections/Modules';

import C_Devices from '../../../lib/collections/Devices';
import C_Widgets from '../../../lib/collections/Widgets';

import C_Projects from '../../../lib/collections/Projects';
import C_TriggerRules from '../../../lib/collections/TriggerRules';

import C_MessageDatas from '../../../lib/collections/MessageDatas';

/********************************
 * Default Users
 ********************************/

let now = new Date().getTime();

//if (Meteor.users.find().count() === 0) {
//
//    const users = [
//        { username: "Normal User", email: "normal@example.com", password: "123456", roles: ['user'] },
//        { username: "Editor", email: "editor@microduino.cc", password: "123456", roles: ['editor'] },
//        { username: "Project Approval", email: "pm@microduino.cc", password: "123456", roles: ['project-approval'] },
//        { username: "Customer Care", email: "cc@microduino.cc", password: "123456", roles: ['customer-care'] },
//        { username: "Admin User", email: "admin@microduino.cc", password: "MicroduinoAdmin!", roles: ['admin'] },
//        { username: "Microduino", email: "dev@microduino.cc", password: "123456", roles: ['admin', 'editor'] },
//        { username: "Iasc CHEN", email: "iasc@163.com", password: "123456", roles: ['admin', 'editor'] }
//    ];
//
//    users.forEach(function (user) {
//        let id;
//
//        id = Accounts.createUser({
//            email: user.email,
//            password: user.password,
//            username: user.username
//        });
//
//        if (user.roles.length > 0) {
//            // Need _id of existing user record so this call must come
//            // after `Accounts.createUser` or `Accounts.onCreate`
//            Roles.addUsersToRoles(id, user.roles);
//        }
//
//    });
//}

let sysAdmin = Meteor.users.findOne({ "username": "Microduino" });
let iasc = Meteor.users.findOne({ "username": "Iasc CHEN" });

/********************************
 * Supported Cores
 ********************************/

if (C_Boards.find().count() === 0) {
    var cores = [
        {
            value: "328p16m", board_tag: "328p", board_sub: "16MHzatmega328", name: "Core", desc: "328P@16M,5V",
            icon: "icon-c-core", status: STATUS_NORMAL
        },
        {
            value: "328p8m", board_tag: "328p", board_sub: "8MHzatmega328", name: "Core", desc: "328P@8M,3.3V",
            icon: "icon-c-core", status: STATUS_NORMAL
        },

        {
            value: "168pa16m", board_tag: "168p", board_sub: "16MHzatmega168", name: "Core", desc: "168PA@16M,5V",
            icon: "icon-c-core", status: STATUS_DISABLED
        },
        {
            value: "168pa8m", board_tag: "168p", board_sub: "8MHzatmega168", name: "Core", desc: "168PA@8M,3.3V",
            icon: "icon-c-core", status: STATUS_DISABLED
        },

        {
            value: "644pa16m", board_tag: "644p", board_sub: "16MHzatmega644", name: "Core+", desc: "644PA@16M,5V",
            icon: "icon-c-core-plus", status: STATUS_NORMAL
        },
        {
            value: "644pa8m", board_tag: "644p", board_sub: "8MHzatmega644", name: "Core+", desc: "644PA@8M,3.3V",
            icon: "icon-c-core-plus", status: STATUS_NORMAL
        },

        {
            value: "1284p16m", board_tag: "1284p", board_sub: "16MHzatmega1284", name: "Core+", desc: "1284PA@16M,5V",
            icon: "icon-c-core-plus", status: STATUS_NORMAL
        },
        {
            value: "1284p8m", board_tag: "1284p", board_sub: "8MHzatmega1284", name: "Core+", desc: "1284PA@8M,3.3V",
            icon: "icon-c-core-plus", status: STATUS_NORMAL
        },

        {
            value: "32u416m", board_tag: "32u416m", board_sub: "", name: "CoreUSB", desc: "32U4@16M, or mCookie",
            icon: "icon-c-usb-core", status: STATUS_DISABLED
        },
        {
            value: "128rfa116m", board_tag: "128rfa116m", board_sub: "", name: "CoreRF", desc: "128RFA1@16M",
            icon: "icon-c-usb-core", status: STATUS_NORMAL
        }
    ];

    _.each(cores, function (core) {
        C_Boards.insert(core);
    });
}

/********************************
 * Default Modules
 ********************************/

if (C_Modules.find().count() === 0) {
    var modules = [
        //{icon: "icon-c-core", name: "Core"},
        //{icon: "icon-c-core-plus", name: "Core+"},
        //{icon: "icon-c-usb-core", name: "Core USB"},
        //{icon: "icon-c-usb-core", name: "Core RF"},

        { icon: "icon-c-usb-ttl", name: "USBTTL" },
        { icon: "icon-c-usb-host", name: "USBHost" },

        { icon: "icon-c-wifi", name: "WIFI" },
        { icon: "icon-c-2dot4g", name: "2.4G" },
        { icon: "icon-c-zig-bee", name: "Zig Bee" },
        { icon: "icon-c-nfc", name: "NFC" },
        { icon: "icon-c-wiz", name: "WIZ" },
        { icon: "icon-c-enc", name: "ENC" },
        { icon: "icon-c-rs485", name: "RS485" },
        { icon: "icon-c-gsm-gprs", name: "GSM/GPRS" },
        { icon: "icon-c-bluetouth", name: "Bluetooth" },
        { icon: "icon-c-battery", name: "Battery" },
        { icon: "icon-c-gps", name: "GPS" },
        { icon: "icon-c-crash", name: "Crash" },
        { icon: "icon-c-tft-screen", name: "TFT Screen" },
        { icon: "icon-c-oled-screen", name: "OLED Screen" },
        { icon: "icon-c-10dof", name: "10DOF" },
        { icon: "icon-c-rtc", name: "RTC" },
        { icon: "icon-c-micro-sd", name: "MicroSD" },
        { icon: "icon-c-amplifier", name: "Amplifier" },
        { icon: "icon-c-temperature", name: "Temperature" },
        { icon: "icon-c-plush", name: "Plush" },
        { icon: "icon-c-lightness", name: "Lightness" },
        { icon: "icon-c-motor", name: "Motor" },
        { icon: "icon-c-stepper", name: "Stepper" },
        { icon: "icon-c-led", name: "LED" },
        { icon: "icon-c-gray", name: "Gray" },
        { icon: "icon-c-ir-receiver", name: "IR Receiver" },
        { icon: "icon-c-ir-sensor", name: "IR Sensor" },
        { icon: "icon-c-pir", name: "PIR" },
        { icon: "icon-c-color-led", name: "Color LED" }
    ];

    _.each(modules, function (module) {
        var entity = _.extend(module, {
            status: STATUS_NORMAL
        });
        C_Modules.insert(entity);
    });
}

/********************************
 * Default C_Projects
 ********************************/

if (C_Projects.find().count() == 0) {

    const projects = [
        {
            name: 'IoT Demo - Garage', desc: 'Garage, use lightness sensor to detect a car'
        },
        {
            name: 'IoT Demo - Door',
            desc: 'Door, can be opened by NFC or from cloud , use hall sensor to detect opening/closing'
        },
        {
            name: 'IoT Demo - Window',
            desc: 'Door, can be opened from cloud , use hall sensor to detect opening/closing'
        },
        {
            name: 'IoT Demo - House Vault Monitoring',
            desc: 'Vault monitoring system in house. In protecting mode, use PIR sensor to detect human moving in house, then warn by buzzer'
        },
        {
            name: 'IoT Demo - IR Remote Controller', desc: 'IR Remote Controller, can be controlled from cloud'
        },
        {
            name: 'IoT Demo - Power Socket', desc: 'Power Socket, can be controlled from cloud'
        },
        {
            name: 'IoT Demo - Rainbow Light',
            desc: 'Rainbow Light, can be controlled from cloud, or by environment sound and environment lightness.'
        },
        {
            name: 'IoT Demo - Weather Station',
            desc: ' Weather Station, can send data to cloud, and setting warning threshold from cloud'
        },
        {
            name: 'IoT Demo - Information Clock', desc: 'Clock, can display message from cloud.'
        },
        {
            name: 'IoT Demo - Cloud Music Box', desc: 'Music Box. Download and play music from cloud'
        }
    ];

    projects.forEach (function (project) {
        Object.assign(project, {
            authorId: sysAdmin._id, secureToken: "12345", authorName: sysAdmin.username,
            status: STATUS_NORMAL
            // createAt: now, updateAt: now
        });

        C_Projects.insert(project);
    });
}

/********************************
 * Default C_Devices
 ********************************/

if (C_Devices.find().count() == 0) {
    let project_1 = C_Projects.findOne({ name: "IoT Demo - Garage" })._id;
    let project_2 = C_Projects.findOne({ name: "IoT Demo - Door" })._id;
    let project_3 = C_Projects.findOne({ name: "IoT Demo - Window" })._id;
    let project_4 = C_Projects.findOne({ name: "IoT Demo - House Vault Monitoring" })._id;
    let project_5 = C_Projects.findOne({ name: "IoT Demo - IR Remote Controller" })._id;
    let project_6 = C_Projects.findOne({ name: "IoT Demo - Power Socket" })._id;
    let project_7 = C_Projects.findOne({ name: "IoT Demo - Rainbow Light" })._id;
    let project_8 = C_Projects.findOne({ name: "IoT Demo - Weather Station" })._id;
    let project_9 = C_Projects.findOne({ name: "IoT Demo - Information Clock" })._id;
    let project_10 = C_Projects.findOne({ name: "IoT Demo - Cloud Music Box" })._id;

    const devices = [
        {
            name: '_mqttTrigger', status: STATUS_DELETED, desc: 'mCotton Mqtt Client, system use'
        },
        {
            name: 'IoT Demo - Garage', status: STATUS_NORMAL,
            desc: 'Garage, use lightness sensor to detect a car',
            projectId: project_1,
            deviceProfile: {
                dataNames: ["using"]
            }
        },
        {
            name: 'IoT Demo - Door', status: STATUS_NORMAL,
            desc: 'Door, can be opened by NFC or from cloud , use hall sensor to detect opening/closing',
            projectId: project_2,
            deviceProfile: {
                dataNames: ["opening"],
                controlNames: [{ name: "open", type: "boolean" }]
            }
        },
        {
            name: 'IoT Demo - Window', status: STATUS_NORMAL,
            desc: 'Door, can be opened from cloud , use hall sensor to detect opening/closing',
            projectId: project_3,
            deviceProfile: {
                dataNames: ["opening"],
                controlNames: [{ name: "open", type: "boolean" }]
            }
        },
        {
            name: 'IoT Demo - House Vault Monitoring', status: STATUS_NORMAL,
            desc: 'Vault monitoring system in house. In protecting mode, use PIR sensor to detect human moving in house, then warn by buzzer',
            projectId: project_4,
            deviceProfile: {
                dataNames: ["enabled"],
                controlNames: [{ name: "enable", type: "boolean" }, { name: "warn", type: "boolean" }],
                eventNames: ["EQ_PIR"]
            }
        },
        {
            name: 'IoT Demo - IR Remote Controller', status: STATUS_NORMAL,
            desc: 'IR Remote Controller, can be controlled from cloud',
            projectId: project_5,
            deviceProfile: {
                controlNames: [{ name: "send", type: "number" }]
            }
        },
        {
            name: 'IoT Demo - Power Socket', status: STATUS_NORMAL,
            desc: 'Power Socket, can be controlled from cloud',
            projectId: project_6,
            deviceProfile: {
                dataNames: ["powered"],
                controlNames: [{ name: "power", type: "boolean" }]
            }
        },
        {
            name: 'IoT Demo - Rainbow Pool', status: STATUS_NORMAL,
            desc: 'Rainbow Pool, can be controlled from cloud, or by environment sound.',
            projectId: project_7,
            deviceProfile: {
                dataNames: ["inMode"],
                controlNames: [
                    {
                        name: "mode", type: "enum",
                        values: [
                            { label: "OFF", value: "MO" },
                            { label: "Color", value: "MC" },
                            { label: "Flash", value: "MF" },
                            { label: "Rainbow", value: "MR" },
                            { label: "Voice", value: "MV" },
                            { label: "Lightness", value: "ML" }]
                    },
                    { name: "color", type: "string" },
                    { name: "setting", type: "json" }],
                eventNames: ["LT_Lightness", "GT_Lightness"]
            }
        },
        {
            name: 'IoT Demo - Weather Station (Indoor)', status: STATUS_NORMAL,
            desc: ' Weather Station, can send data to cloud, and setting warning threshold from cloud',
            projectId: project_8,
            deviceProfile: {
                dataNames: ["Temperature", "Humidity", "Lightness", "PM", "Gas"],
                controlNames: [{ name: "setting", type: "json" }],
                eventNames: ["LT_Temperature", "GT_Temperature", "LT_Humidity", "GT_Humidity",
                    "LT_PM", "GT_PM", "LT_Lightness", "GT_Lightness"]
            }
        },
        {
            name: 'IoT Demo - Weather Station (Outdoor)', status: STATUS_NORMAL,
            desc: ' Weather Station, can send data to cloud, and setting warning threshold from cloud',
            projectId: project_8,
            deviceProfile: {
                dataNames: ["Temperature", "Humidity", "Lightness", "PM", "Gas"],
                controlNames: [{ name: "setting", type: "json" }],
                eventNames: ["LT_Temperature", "GT_Temperature", "LT_Humidity", "GT_Humidity",
                    "LT_PM", "GT_PM", "LT_Lightness", "GT_Lightness"]
            }
        },
        {
            name: 'IoT Demo - Information Clock', status: STATUS_NORMAL,
            desc: 'Clock, can display message from cloud.',
            projectId: project_9,
            deviceProfile: {
                dataNames: ["output"],
                controlNames: [
                    { name: "input", type: "string" },
                    { name: "color", type: "string" },
                    { name: "alarm", type: "json" }
                ],
                eventNames: ["ON_ALARM"]
            }
        },
        {
            name: 'IoT Demo - Cloud Music Box', status: STATUS_NORMAL,
            desc: 'Music Box. Download and play music from cloud',
            projectId: project_10,
            deviceProfile: {
                dataNames: ["playing", "volume", "paused"],
                controlNames: [
                    { name: "play", type: "string" },
                    { name: "pause", type: "boolean" },
                    { name: "volume", type: "number" }]
            }
        },
        {
            name: 'IoT Demo - Road Lamp', status: STATUS_NORMAL,
            desc: 'Road Lamp, can be controlled from cloud, or by environment lightness.',
            projectId: project_7,
            deviceProfile: {
                dataNames: ["inMode"],
                controlNames: [
                    {
                        name: "mode", type: "enum",
                        values: [
                            { label: "OFF", value: "MO" },
                            { label: "Color", value: "MC" },
                            { label: "Flash", value: "MF" },
                            { label: "Rainbow", value: "MR" },
                            { label: "Voice", value: "MV" },
                            { label: "Lightness", value: "ML" }]
                    },
                    { name: "color", type: "string" },
                    { name: "setting", type: "json" }],
                eventNames: ["LT_Lightness", "GT_Lightness"]
            }
        },
    ];

    devices.forEach (function (device) {
        delete device["deviceDashboard"];
        Object.assign(device, {
            ownerId: sysAdmin._id, secureToken: "12345", subscribeToken: "54321", ownerName: sysAdmin.username,
            // createAt: now, lastAccessAt: now
        });
        let devId = C_Devices.insert(device);
    });
}

// C_Widgets.remove({});

if (C_Widgets.find().count() == 0) {
    let device_1 = C_Devices.findOne({ name: "IoT Demo - Garage" })._id;
    let device_2 = C_Devices.findOne({ name: "IoT Demo - Door" })._id;
    let device_3 = C_Devices.findOne({ name: "IoT Demo - Window" })._id;
    let device_4 = C_Devices.findOne({ name: "IoT Demo - House Vault Monitoring" })._id;
    let device_5 = C_Devices.findOne({ name: "IoT Demo - IR Remote Controller" })._id;
    let device_6 = C_Devices.findOne({ name: "IoT Demo - Power Socket" })._id;
    let device_7 = C_Devices.findOne({ name: "IoT Demo - Rainbow Pool" })._id;
    let device_8 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Indoor)" })._id;
    let device_9 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Outdoor)" })._id;
    let device_10 = C_Devices.findOne({ name: "IoT Demo - Information Clock" })._id;
    let device_11 = C_Devices.findOne({ name: "IoT Demo - Cloud Music Box" })._id;
    let device_12 = C_Devices.findOne({ name: "IoT Demo - Road Lamp" })._id;

    const widgets = [
        {
            deviceId: device_1, widget: 'MLed', widgetType: 'o', source: "using", title: 'Garage using',
            rows: 1, cols: 1
        },

        {
            deviceId: device_2, widget: 'MLed', widgetType: 'o', source: "opening", title: 'Door opening',
            rows: 1, cols: 1
        },
        {
            deviceId: device_2, widget: 'MToggle', widgetType: 'i', source: "opening", target: "open", title: 'Open',
            rows: 2, cols: 1
        },

        {
            deviceId: device_3, widget: 'MLed', widgetType: 'o', source: "opening", title: 'Window opening',
            rows: 1, cols: 1
        },
        {
            deviceId: device_3, widget: 'MToggle', widgetType: 'i', source: "opening", target: "open", title: 'Open',
            rows: 2, cols: 1
        },


        {
            deviceId: device_4, widget: 'MLed', widgetType: 'o', source: "enabled", title: 'Vault enabled',
            rows: 1, cols: 1
        },
        {
            deviceId: device_4, widget: 'MToggle', widgetType: 'i', source: "enabled", target: "enable",
            title: 'Enable', rows: 2, cols: 1
        },
        {
            deviceId: device_4, widget: 'MButton', widgetType: 'i', target: "warn", title: 'Warn',
            rows: 2, cols: 1
        },

        {
            deviceId: device_5, widget: 'MInput', widgetType: 'i', target: "send", title: 'Send',
            rows: 1, cols: 4
        },

        {
            deviceId: device_6, widget: 'MLed', widgetType: 'o', source: "powered", title: 'Powered',
            rows: 1, cols: 1
        },
        {
            deviceId: device_6, widget: 'MToggle', widgetType: 'i', source: "powered", target: "power", title: 'Power',
            rows: 2, cols: 1
        },

        {
            deviceId: device_7, widget: 'MLabel', widgetType: 'o', source: "inMode", title: 'In Mode',
            rows: 1, cols: 2
        },
        {
            deviceId: device_7, widget: 'MSelector', widgetType: 'i', target: "mode", title: 'Mode Selected',
            rows: 1, cols: 4
        },
        {
            deviceId: device_7, widget: 'MColor', widgetType: 'i', target: "color", title: 'Color',
            rows: 2, cols: 4
        },
        //{
        //    deviceId: device_7, widget: 'MRangeSlider', widgetType:'i',title: 'Lightness Sensor',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 2000, step: 1, bind: ["LT_Lightness", "GT_Lightness"] },
        //    target: "setting"
        //},

        {
            deviceId: device_8, widget: 'MLabel', widgetType: 'o', title: 'Temperature',
            rows: 1, cols: 2,
            source: "Temperature"
        }, {
            deviceId: device_8, widget: 'MLabel', widgetType: 'o', title: 'Humidity',
            rows: 1, cols: 2,
            source: "Humidity"
        }, {
            deviceId: device_8, widget: 'MLabel', widgetType: 'o', title: 'Lightness',
            rows: 1, cols: 2,
            source: "Lightness"
        }, {
            deviceId: device_8, widget: 'MLabel', widgetType: 'o', title: 'Gas',
            rows: 1, cols: 2,
            source: "Gas"
        },
        //{
        //    deviceId: device_8, widget: 'MRangeSlider',widgetType:'i',title: 'Temperature Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: -40, max: 50, step: 1, bind: ["LT_Temperature", "GT_Temperature"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_8, widget: 'MRangeSlider', widgetType:'i',title: 'Lightness Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 2000, step: 1, bind: ["LT_Lightness", "GT_Lightness"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_8, widget: 'MRangeSlider', widgetType:'i',title: 'PM Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 1000, step: 1, bind: ["LT_PM", "GT_PM"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_8, widget: 'MRangeSlider', widgetType:'i',title: 'Humidity Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 100, step: 1, bind: ["LT_Humidity", "GT_Humidity"] },
        //    target: "setting"
        //},

        {
            deviceId: device_9, widget: 'MLabel', widgetType: 'o', title: 'Temperature',
            rows: 1, cols: 2,
            source: "Temperature"
        }, {
            deviceId: device_9, widget: 'MLabel', widgetType: 'o', title: 'Humidity',
            rows: 1, cols: 2,
            source: "Humidity"
        }, {
            deviceId: device_9, widget: 'MLabel', widgetType: 'o', title: 'Lightness',
            rows: 1, cols: 2,
            source: "Lightness"
        }, {
            deviceId: device_9, widget: 'MLabel', widgetType: 'o', title: 'PM',
            rows: 1, cols: 2,
            source: "PM"
        },
        //{
        //    deviceId: device_9, widget: 'MRangeSlider', widgetType:'i',title: 'Temperature Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: -40, max: 50, step: 1, bind: ["LT_Temperature", "GT_Temperature"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_9, widget: 'MRangeSlider', widgetType:'i',title: 'Lightness Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 2000, step: 1, bind: ["LT_Lightness", "GT_Lightness"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_9, widget: 'MRangeSlider', widgetType:'i',title: 'PM Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 1000, step: 1, bind: ["LT_PM", "GT_PM"] },
        //    target: "setting"
        //}, {
        //    deviceId: device_9, widget: 'MRangeSlider', widgetType:'i',title: 'Humidity Threshold',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 100, step: 1, bind: ["LT_Humidity", "GT_Humidity"] },
        //    target: "setting"
        //},

        {
            deviceId: device_10, widget: 'MOutput', widgetType: 'io', source: "output", target: "input",
            title: 'Information', rows: 2, cols: 4
        },
        {
            deviceId: device_10, widget: 'MColor', widgetType: 'i', target: "color", title: 'Color',
            rows: 2, cols: 4
        },
        //{
        //    deviceId: device_10, widget: 'MTimePicker', widgetType: 'i', target: "alarm", title: 'Alarm',
        //    rows: 1, cols: 4
        //},

        {
            deviceId: device_11, widget: 'MInput', widgetType: 'i', target: "play", title: 'Music',
            rows: 1, cols: 4
        },
        {
            deviceId: device_11, widget: 'MSlider', widgetType: 'i', target: "volume", title: 'Volume',
            rows: 1, cols: 4,
            others: { min: 0, max: 30, step: 1 }
        },
        {
            deviceId: device_11, widget: 'MToggle', widgetType: 'i', source: "paused", target: "pause", title: 'Pause',
            rows: 2, cols: 1
        },

        {
            deviceId: device_12, widget: 'MOutput', widgetType: 'o', source: "inMode", title: 'In Mode',
            rows: 2, cols: 4
        },
        {
            deviceId: device_12, widget: 'MSelector', widgetType: 'i', target: "mode", title: 'Mode Selected',
            rows: 1, cols: 4
        },
        {
            deviceId: device_12, widget: 'MColor', widgetType: 'i', target: "color", title: 'Color',
            rows: 2, cols: 4
        },
        //{
        //    deviceId: device_12, widget: 'MRangeSlider', widgetType:'i',title: 'Lightness Sensor',
        //    rows: 1, cols: 4,
        //    others: { min: 0, max: 2000, step: 1, bind: ["LT_Lightness", "GT_Lightness"] },
        //    target: "setting"
        //}
    ];

    widgets.forEach (function (widget) {
        let widgetId = C_Widgets.insert(widget);
    });
}

C_MessageDatas.remove({});

if (C_MessageDatas.find().count() == 0) {
    let device_1 = C_Devices.findOne({ name: "IoT Demo - Garage" })._id;
    let device_2 = C_Devices.findOne({ name: "IoT Demo - Door" })._id;
    let device_3 = C_Devices.findOne({ name: "IoT Demo - Window" })._id;
    let device_4 = C_Devices.findOne({ name: "IoT Demo - House Vault Monitoring" })._id;
    let device_5 = C_Devices.findOne({ name: "IoT Demo - IR Remote Controller" })._id;
    let device_6 = C_Devices.findOne({ name: "IoT Demo - Power Socket" })._id;
    let device_7 = C_Devices.findOne({ name: "IoT Demo - Rainbow Pool" })._id;
    let device_8 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Indoor)" })._id;
    let device_9 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Outdoor)" })._id;
    let device_10 = C_Devices.findOne({ name: "IoT Demo - Information Clock" })._id;
    let device_11 = C_Devices.findOne({ name: "IoT Demo - Cloud Music Box" })._id;
    let device_12 = C_Devices.findOne({ name: "IoT Demo - Road Lamp" })._id;

    const datas = [
        {
            msgType: MSG_DATA, payload: { using: true }, deviceId: device_1
        },
        {
            msgType: MSG_DATA, payload: { opening: true }, deviceId: device_2
        },
        {
            msgType: MSG_DATA, payload: { temperature: 100, humidity: 32 }, deviceId: device_9
        },
        {
            msgType: MSG_CONTROL, payload: { message: "Hello Clock" }, deviceId: device_10
        },
        {
            msgType: MSG_EVENT, payload: { ON_ALARM: "Alarm name" }, deviceId: device_10
        }];

    datas.forEach (function (data) {
        // Object.assign(data, {});

        C_MessageDatas.insert(data);
    });
}

/********************************
 * Default Device Rules
 ********************************/

if (C_TriggerRules.find().count() == 0) {
    let device_1 = C_Devices.findOne({ name: "IoT Demo - Garage" })._id;
    let device_2 = C_Devices.findOne({ name: "IoT Demo - Door" })._id;
    let device_3 = C_Devices.findOne({ name: "IoT Demo - Window" })._id;
    let device_4 = C_Devices.findOne({ name: "IoT Demo - House Vault Monitoring" })._id;
    let device_5 = C_Devices.findOne({ name: "IoT Demo - IR Remote Controller" })._id;
    let device_6 = C_Devices.findOne({ name: "IoT Demo - Power Socket" })._id;
    let device_7 = C_Devices.findOne({ name: "IoT Demo - Rainbow Pool" })._id;
    let device_8 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Indoor)" })._id;
    let device_9 = C_Devices.findOne({ name: "IoT Demo - Weather Station (Outdoor)" })._id;
    let device_10 = C_Devices.findOne({ name: "IoT Demo - Information Clock" })._id;
    let device_11 = C_Devices.findOne({ name: "IoT Demo - Cloud Music Box" })._id;
    let device_12 = C_Devices.findOne({ name: "IoT Demo - Road Lamp" })._id;

    //const rules = [
    //    {
    //        name: 'Rule 1', enabled: true, ownerId: iasc._id, owner: iasc.profile.name,
    //        sourceIds: [device1._id, device2._id], targetIds: [device3._id],
    //        processor: "console.log('in processor')"
    //        rules: [{
    //            conditions: [{
    //                source: device0._id,
    //                data: { payload: { temperature: { $gt: 33 }, lightness: { $gt: 1990 } } }
    //            },
    //                { source: device1._id, data: { payload: { lightness: { $gt: 2000 } } } }],
    //            actions: [{ target: device2._id, control: { payload: { show: 'hello' } } }]
    //        }],
    //    },
    //    { name: 'Rule 2', enabled: false, ownerId: iasc._id, owner: iasc.profile.name },
    //    { name: 'Rule 3', enabled: true, ownerId: sysAdmin._id, owner: sysAdmin.profile.name }
    //];
    //
    //rules.forEach (function (rule) {
    //    Object.assign(rule, {
    //        createAt: now, updateAt: now
    //    });
    //
    //    C_TriggerRules.insert(rule);
    //});
}