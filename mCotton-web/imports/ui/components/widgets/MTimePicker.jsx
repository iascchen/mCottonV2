/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

import {orange500, blue500} from 'material-ui/styles/colors';

//import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
    },
    time: {
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

// TODO add loop info
class MTimePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value24: null,

            title: this.props.widget.title ? this.props.widget.title : "Time",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    handleChangeTimePicker24(event, date) {
        console.log("handleChangeTimePicker24", date);

        this.setState({ value24: date });

        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = date;
            let wId = Meteor.call('control.add', entity);
        }
    };

    render() {
        return (
                <TimePicker
                    style={styles.time}
                    fullWidth={true}
                    autoOk={true}
                    format="24hr"
                    hintText="24hr Format"
                    value={this.state.value24}
                    onChange={this.handleChangeTimePicker24.bind(this)}
                />
        )
    }
}

MTimePicker.propTypes = {
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

export default MTimePicker;

