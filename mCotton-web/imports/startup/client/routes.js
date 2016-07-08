import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/accounts-base';

import MainLayout from '../../ui/layouts/MainLayout';

import Home from '../../ui/views/Home';
import DataTab from '../../ui/views/DataTab';
import House from '../../ui/views/House';
import DataConsole from '../../ui/views/DataConsole';
import DeviceDashboardContainer from '../../ui/components/dashboard/DeviceDashboardContainer';

//import ProjectsList from '../../ui/components/lists/ProjectsList';
//import DevicesList from '../../ui/components/lists/DevicesList';
//import EventsList from '../../ui/components/lists/EventsList';
//import DatasList from '../../ui/components/lists/DatasList';
//import ControlsList from '../../ui/components/lists/ControlsList';

//import DeviceFieldSelector from '../../ui/components/widgets/DeviceFieldSelector';
//
//import MCanvas from '../../ui/components/widgets/MCanvas';
//import MButton from '../../ui/components/widgets/MButton';
//import MToggle from '../../ui/components/widgets/MToggle';
//import MSlider from '../../ui/components/widgets/MSlider';
//import MTerminal from '../../ui/components/widgets/MTerminal';

FlowRouter.route("/", {
    name: 'Home',
    action() {
        mount(MainLayout, {
            content: (<Home />)
        });
    }
});

FlowRouter.route("/data_tab", {
    name: 'DataTab',
    action() {
        mount(MainLayout, {
            content: (<DataTab />)
        });
    }
});

/********************************
 * Login
 ********************************/

//TODO

const handleLogin = function () {
    FlowRouter.go('/');
};

FlowRouter.route("/login", {
    action() {
        mount(MainLayout, {
            content: (<Accounts.ui.LoginFormSet redirect={handleLogin}/>)
        });
    }
});

FlowRouter.route("/verify-email", {
    subscriptions: function () {
        this.register('devices', Meteor.subscribe('devices'));
    },
    action() {
        mount(MainLayout, {
            content: (<House />)
        });
    }
});

FlowRouter.route("/reset-password", {
    subscriptions: function () {
        this.register('devices', Meteor.subscribe('devices'));
    },
    action() {
        mount(MainLayout, {
            content: (<House />)
        });
    }
});

FlowRouter.route("/enroll-account", {
    subscriptions: function () {
        this.register('devices', Meteor.subscribe('devices'));
    },
    action() {
        mount(MainLayout, {
            content: (<House />)
        });
    }
});

/********************************
 * Views
 ********************************/

FlowRouter.route("/house", {
    name: 'House',
    //subscriptions: function () {
    //    this.register('devices', Meteor.subscribe('devices'));
    //},
    action() {
        mount(MainLayout, {
            content: (<House />)
        });
    }
});

FlowRouter.route("/console", {
    name: 'Console',
    //subscriptions: function () {
    //    this.register('msg_datas', Meteor.subscribe('msg_datas'));
    //    this.register('msg_events', Meteor.subscribe('msg_events'));
    //    this.register('msg_controls', Meteor.subscribe('msg_controls'));
    //},
    action() {
        mount(MainLayout, {
            content: (<DataConsole />)
        });
    }
});

FlowRouter.route("/dashboard/:id", {
    name: 'Dashboard',
    //subscriptions: function (params) {
    //    this.register('device', Meteor.subscribe('device', params.id));
    //},
    action(params) {
        // console.log("action", params);

        mount(MainLayout, {
            content: (<DeviceDashboardContainer params={{id: params.id}}/>)
        });
    }
});

//FlowRouter.route("/devices/:_id", {
//    name: 'DevicesDetail',
//    subscriptions: function (params) {
//        this.register('device', Meteor.subscribe('device', params._id));
//    },
//    action(params) {
//        // console.log("action" , params);
//
//        mount(MainLayout, {
//            content: (<DevicesDetail />)
//        });
//    }
//});