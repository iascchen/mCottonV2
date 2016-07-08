/**
 * Created by chenhao on 16/6/18.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export const LoginWrapper = React.createClass({
    handleLogin: function () {
        // redirect through ReactRouter if it have ability or through window:
        window.location.href = this.targetUrl;
    },
    render: function () {
        this.targetUrl = window.location.href; // save target URL from window on through ReactRouter if it have ability
        return (
            <Accounts.ui.LoginFormSet redirect={this.handleLogin}/>
        );
    }
});