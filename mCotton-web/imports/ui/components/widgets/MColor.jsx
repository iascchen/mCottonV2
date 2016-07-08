/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { SliderPicker } from 'react-color';

import {orange500, grey500} from 'material-ui/styles/colors';

//import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    color: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    paper: {
        height: 160,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MColor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Color",
            color: this.props.widget.color ? this.props.widget.color : "#00ff00", // TODO, use microduino green
        };
    }

    handleChange(color) {
        console.log("color", color.hex);

        this.setState({ color: color.hex });

        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = color.hex;
            let wId = Meteor.call('control.add', entity);
        }
    };

    render() {
        return (
            <div>
                <div style={styles.title}>
                    { JSON.stringify(this.state.color)}
                </div>

                <div style={styles.color}>
                    <SliderPicker
                        color={ this.state.color }
                        onChange={ this.handleChange.bind(this) }
                    />
                </div>
            </div>
        )
    }
}

MColor.propTypes = {
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

export default MColor;

