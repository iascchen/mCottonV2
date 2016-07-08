import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 5,
    },
    list: {
        margin: 5,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class DatasList extends Component {

    render() {
        if (this.props.loading) {
            return (<CircularProgress />);
        }

        return (
            <div>
                <Divider />
                <Chip style={styles.chip}
                      backgroundColor={this.props.iconColor}>
                    {this.props.title} : {this.props.entitiesCount}
                </Chip>
                <List>
                    {this.props.entities.map((msg) => (
                    <ListItem style={styles.list} key={msg._id}
                              primaryText={msg.deviceId + " , " + msg.createAt}
                              secondaryText={JSON.stringify(msg.payload)}
                              leftAvatar={<Avatar backgroundColor={this.props.iconColor} >{this.props.iconText}</Avatar>}
                    >
                    </ListItem>
                        ))}
                </List>
            </div>
        )
    }
}

DatasList.propTypes = {
    title: PropTypes.string,
    iconColor: PropTypes.string,
    iconText: PropTypes.string,

    loading: PropTypes.bool.isRequired,
    entities: PropTypes.array.isRequired,
    entitiesCount: PropTypes.number.isRequired,
};