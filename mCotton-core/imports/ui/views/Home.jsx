import React, {Component, PropTypes} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    slide1: {
        margin: 10,
        minHeight: 1200,
    },
    slide: {
        margin: 10,
    },
    swipeable: {}
};

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    };

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div id="mainPage">
                Accounts
            </div>);
    };
};
