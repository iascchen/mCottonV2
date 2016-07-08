import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Accounts } from 'meteor/accounts-base';

import MainLayout from '../../ui/layouts/MainLayout';

import Home from '../../ui/views/Home';

FlowRouter.route("/", {
    name: 'Home',
    action() {
        mount(MainLayout, {
            content: (<Home />)
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