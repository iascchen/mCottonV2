/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

//import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    input: {
        margin: 0,
    },
    paper: {
        height: 100,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value ? this.props.value : 1,

            title: this.props.widget.title ? this.props.widget.title : "Selector",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    handleChange(event, index, value) {
        // console.log("handleChange", index, value);

        this.setState({
            value: value,
        });

        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = value;
            let wId = Meteor.call('control.add', entity);
        }
    };

    getSelectorItems(device, widget) {
        let items = [];

        if (device.deviceProfile.controlNames) {
            device.deviceProfile.controlNames.map((control) => {

                if (widget.target
                    && (widget.target === control.name)
                    && (control.type === "enum")
                    && control.values) {

                    control.values.map((v, index) => {
                        items.push(<MenuItem value={v.value} key={index} primaryText={v.label}/>);
                    });

                    // console.log("getSelectorItems" , items);
                }
            });
        }

        return items;
    }

    render() {
        return (
            <SelectField
                style={styles.input}
                fullWidth={true}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
            >
                {this.getSelectorItems(this.props.device, this.props.widget)}
            </SelectField>
        )
    }
}

MSelector.propTypes = {
    value: PropTypes.number,

    title: PropTypes.string,
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,

    widgetIndex: PropTypes.number.isRequired,
};

export default MSelector;

