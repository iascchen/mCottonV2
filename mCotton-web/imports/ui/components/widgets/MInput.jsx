/**
 * Created by chenhao on 16/6/17.
 */
import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
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

class MInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: this.props.input ? this.props.input : "",

            title: this.props.widget.title ? this.props.widget.title : "Input",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    handleChange(event, value) {
        // event.preventDefault();

        console.log("handleChanged", value);

        this.setState({
            input: value,
        });
    }

    handleBlur() {
        console.log("handleBlur", this.state.input);

        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = this.state.input;
            let wId = Meteor.call('control.add', entity);
        }
    }

    render() {
        return (
            <TextField
                id={"o" + this.props.widgetIndex}
                style={styles.input}
                hintText=">"
                fullWidth={true}
                multiLine={false}
                value={this.state.input}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
            />
        )
    }
}

MInput.propTypes = {
    input: PropTypes.string,

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

export default MInput;

