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
    output: {
        margin: 10,
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    },
    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,

    },
    icon: {
        width: 30,
        height: 30,
        padding: 0,
        margin: 15,
    },
    checkbox: {
        margin: 10,
    },
    paper: {
        height: 320,
        width: 320,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class MTerminal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outputRows: ( this.props.widget.others && this.props.widget.others.outputRows) ?
                this.props.widget.others.outputRows : 6,
            output: ( this.props.widget.others && this.props.widget.others.output) ?
                this.props.widget.others.output : ["Welcome to Microduino\n", "==========\n", "\n"],

            input: this.props.input ? this.props.input : "",

            title: this.props.widget.title ? this.props.widget.title : "Terminal",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps');

        this.getCheckPropsSource(nextProps);
    }

    getCheckPropsSource(props) {
        if (!props.datas || !props.datas[0]) {
            return;
        }

        console.log("getCheckPropsSource data[0]", props.datas[0].createAt, JSON.stringify(props.datas[0].payload));

        try {
            let value = props.datas[0].payload[props.widget.source];
            if (value) {
                let ret = JSON.parse(value);
                // console.log("getCheckPropsSource", this.state.output, ret);

                let queue = this.state.output;
                queue.push(ret);
                if (queue.length > this.state.outputRows) {
                    queue.shift();
                }

                this.setState({
                    output: queue,
                });
            }
        } catch (e) {
            // ignore
        }
    };

    handleChange(event, value) {
        // event.preventDefault();

        this.setState({
            input: value,
        });

        if (value.endsWith('\n')) {
            console.log("handleChanged", value);

            let queue = this.state.output;
            queue.push(value);
            if (queue.length > this.state.outputRows) {
                queue.shift();
            }

            this.setState({
                output: queue,
                input: "",
            });

            if (this.props.widget.target) {
                let entity = {
                    deviceId: this.props.device._id, token: this.props.device.secureToken,
                };
                entity[this.props.widget.target] = this.state.input;
                let wId = Meteor.call('control.add', entity);
            }
        }
    }
    ;

    render() {
        return (
            <div>

                <TextField
                    id={"o" + this.props.widgetIndex}
                    style={styles.output}
                    multiLine={true}
                    rows={this.state.outputRows}
                    rowsMax={this.state.outputRows}
                    underlineShow={false}
                    disabled={true}
                    value={this.state.output.join('')}
                />

                <Divider/>

                <TextField
                    id={"i" + this.props.widgetIndex}
                    hintText=">"
                    fullWidth={true}
                    multiLine={true}
                    rows={1}
                    rowsMax={1}
                    value={this.state.input}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

MTerminal
    .
    propTypes = {
    outputRows: PropTypes.number,
    output: PropTypes.array,
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

export
default
MTerminal;

