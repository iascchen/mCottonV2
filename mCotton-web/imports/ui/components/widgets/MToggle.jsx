/**
 * Created by chenhao on 16/6/17.
 */
import React, {Component, PropTypes} from 'react';

import MPaper from './Paper';
import Divider from 'material-ui/Divider';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {orange500, grey500} from 'material-ui/styles/colors';

//import SettingDialog from '../dashboard/SettingDialog';

const styles = {
    title: {
        margin: 10,
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
        margin: 10,
    },
};

class MToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: this.props.toggled ? this.props.toggled : false,

            title: this.props.widget.title ? this.props.widget.title : "Toggle",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    handleToggle() {
        let value = !this.state.toggled;
        console.log("handleToggleChange", value);

        this.setState({
            toggled: value,
        });

        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = value;
            let wId = Meteor.call('control.add', entity);
        }
    };

    render() {
        const iconProps = {
            style: styles.icon,
            color: this.state.toggled ? this.state.color : grey500,
        };
        let child = this.props.children;
        if (child) {
            if (!child.type || child.type.muiName !== 'SvgIcon') {
                throw new TypeError('MToggle: children must be SvgIcon.');
            }
            child = React.cloneElement(child, iconProps);
        } else {
            child = (<ActionLightbulbOutline {...iconProps} />);
        }

        return (
            <RaisedButton
                fullWidth={true}
                onTouchTap={this.handleToggle.bind(this)}
                backgroundColor="transparent"
                style={styles.button}
            >
                {child}
            </RaisedButton>
        )
    }
}

MToggle.propTypes = {
    toggled: PropTypes.bool,
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
    iconColor: PropTypes.string,
};

export default MToggle;

