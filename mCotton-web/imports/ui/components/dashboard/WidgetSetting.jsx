/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import {orange500, blue500} from '../../../../node_modules/material-ui/styles/colors';

import C_Widgets from '../../../../lib/collections/Widgets';

const styles = {
    title: {
        margin: 10,
    },
    output: {
        margin: 10,
    },
    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    slider: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: -15,
    },
    paper: {
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

const profile2DataSources = (profile) => {
    let ret = [];

    if (profile.dataNames) {
        ret = ret.concat(profile.dataNames);
    }

    if (profile.eventNames) {
        ret = ret.concat(profile.eventNames);
    }

    // console.log("profile2DataSources", ret);
    return ret;
};

const profile2Control = (profile) => {
    let ret = [];
    if (profile.controlNames) {
        let names = profile.controlNames.map(function (control) {
            return control.name;
        });

        ret = ret.concat(names);
    }
    // console.log("profile2Control", ret);
    return ret;
};

const parseSources = (profile) => {
    let sources = profile2DataSources(profile);
    let fields = [];

    sources.map((item, index) => {
        fields.push(<MenuItem value={item} key={index} primaryText={item}/>);
    });

    return fields;
};

const parseTargets = (profile) => {
    let sources = profile2Control(profile);
    let fields = [];

    sources.map((item, index) => {
        fields.push(<MenuItem value={item} key={index} primaryText={item}/>);
    });

    return fields;
};

class WidgetSetting extends Component {
    constructor(props) {
        super(props);

        // console.log("WidgetSetting", this.props);

        this.state = {
            title: this.props.title ? this.props.title : "Device Binding",
            widgetTitle: this.props.widget.title,
            sourceValue: this.props.widget.source,
            targetValue: this.props.widget.target,
        };
    }

    changeDashboardWidget(widget, infos) {

        // console.log("infos", infos);

        C_Widgets.update({ _id: widget._id }, { $set: infos });
    }

    handleTitleChange(event, value) {
        console.log("handleTitleChange", value);

        this.setState({
            widgetTitle: value,
        });
    }

    handleTitleBlur() {
        console.log("handleTitleBlur", this.state.widgetTitle);

        this.changeDashboardWidget(this.props.widget, { title: this.state.widgetTitle });
    }

    handleSourceFieldChange(event, index, value) {
        this.setState({
            sourceValue: value,
        });

        this.changeDashboardWidget(this.props.widget, { source: value });
    };

    handleTargetFieldChange(event, index, value) {
        this.setState({
            targetValue: value,
        });

        this.changeDashboardWidget(this.props.widget, { target: value });
    };

    renderSources() {
        // console.log("renderSources" , this.props.device.deviceProfile);

        if (this.props.source !== undefined) {
            const dataSources = parseSources(this.props.device.deviceProfile);

            // console.log("renderSources" , dataSources);

            return (
                <div>
                    <SelectField
                        value={this.state.sourceValue}
                        onChange={this.handleSourceFieldChange.bind(this)}
                        floatingLabelText="Data and Events"
                        fullWidth={true}
                    >
                        {dataSources}
                    </SelectField>
                </div>
            );
        }
    }

    renderTargets() {
        console.log("renderTargets", this.props.device.deviceProfile);

        if (this.props.target !== undefined) {
            const targets = parseTargets(this.props.device.deviceProfile);

            console.log("renderTargets", targets);

            return (
                <div>
                    <SelectField
                        value={this.state.targetValue}
                        onChange={this.handleTargetFieldChange.bind(this)}
                        floatingLabelText="Controls"
                        fullWidth={true}
                    >
                        {targets}
                    </SelectField>
                </div>
            );
        }
    }

    render() {
        console.log(this.props.widget);
        return (
            <div>
                <div style={styles.title}>
                    {this.props.device.name}
                </div>

                <TextField
                    id={"t" + this.props.widgetIndex}
                    style={styles.input}
                    hintText="Name your widget"
                    fullWidth={true}
                    multiLine={false}
                    value={this.state.widgetTitle}
                    floatingLabelText="Name your widget"
                    onChange={this.handleTitleChange.bind(this)}
                    onBlur={this.handleTitleBlur.bind(this)}
                />

                {this.renderSources()}

                {this.renderTargets()}
            </div>
        )
    }
}

WidgetSetting.propTypes = {
    device: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
};

export default createContainer(({ params }) => {
    return params;
}, WidgetSetting);
