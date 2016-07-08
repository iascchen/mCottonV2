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
    //paper: {
    //    height: 240,
    //    width: 320,
    //    margin: 10,
    //    padding: 5,
    //    textAlign: 'center',
    //    display: 'inline-block',
    //}
};

class MOutput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outputRows: ( this.props.widget.others && this.props.widget.others.outputRows) ? this.props.widget.others.outputRows : 3,
            output: ( this.props.widget.others && this.props.widget.others.output) ?
                this.widget.others.props.output : "Welcome to Microduino\n==========\n",

            title: this.props.widget.title ? this.props.widget.title : "Output",
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

        console.log("getCheckPropsSource data[0]",
            props.datas[0].createAt, JSON.stringify(props.datas[0].payload), props.widget.source);

        try {
            let value = props.datas[0].payload[props.widget.source];
            if (value) {
                // let ret = JSON.parse(value);
                let ret = JSON.stringify(value);
                // console.log("getCheckPropsSource", this.state.output, ret);

                if (this.state.output != ret) {
                    this.setState({ output: ret });
                }
            }
        } catch (e) {
            // ignore
        }
    };

    render() {
        return (
            <TextField
                id={"o" + this.props.widgetIndex}
                style={styles.output}
                multiLine={true}
                rows={this.state.outputRows}
                rowsMax={this.state.outputRows}
                underlineShow={false}
                disabled={true}
                value={this.state.output}
            />
        )
    }
}

MOutput.propTypes = {
    outputRows: PropTypes.number,
    output: PropTypes.string,

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

export default MOutput;

