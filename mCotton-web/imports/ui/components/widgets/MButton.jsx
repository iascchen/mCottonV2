/**
 * Created by chenhao on 16/6/17.
 */
import React, {Component, PropTypes} from 'react';

import MPaper from './Paper';
import Divider from 'material-ui/Divider';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {orange500, blue500} from 'material-ui/styles/colors';

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

class MButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.widget.title ? this.props.widget.title : "Button",
            color: this.props.widget.color ? this.props.widget.color : orange500,
        };
    }

    handleButton(event) {
        // console.log("buttonUp");
        if (this.props.widget.target) {
            let entity = {
                deviceId: this.props.device._id, token: this.props.device.secureToken,
            };
            entity[this.props.widget.target] = true;
            let wId = Meteor.call('control.add', entity);
        }
    };

    render() {
        const iconProps = {
            style: styles.icon,
        };
        let child = this.props.children;
        if (child) {
            if (!child.type || child.type.muiName !== 'SvgIcon') {
                throw new TypeError('MToggle: children must be SvgIcon.');
            }
            child = React.cloneElement(child, iconProps);
        } else {
            child = (<ActionPowerSettingsNew {...iconProps} />);
        }

        return (
            <RaisedButton
                fullWidth={true}
                backgroundColor={this.props.backgroundColor}
                style={styles.button}
                onTouchTap={this.handleButton.bind(this)}
            >
                {child}
            </RaisedButton>
        )
    }
}

MButton.propTypes = {
    color: PropTypes.string,

    widgetLoading: PropTypes.bool,
    widget: PropTypes.object.isRequired,
    widgetExists: PropTypes.bool,

    deviceLoading: PropTypes.bool,
    device: PropTypes.object.isRequired,
    deviceExists: PropTypes.bool,

    dataLoading: PropTypes.bool,
    datas: PropTypes.array,
};

export default MButton;

