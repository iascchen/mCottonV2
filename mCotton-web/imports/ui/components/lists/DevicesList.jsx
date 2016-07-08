/**
 * Created by chenhao on 16/6/15.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const styles = {
    title: {
        margin: 10,
    },
    list: {
        margin: 5,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default class DevicesList extends Component {

    selectEntity(id) {
        // console.log("selectEntity", id);
        if (this.props.itemClickPath) {
            FlowRouter.go(FlowRouter.path(this.props.itemClickPath, { id: id }));
        }
    }

    render() {
        if (this.props.loading) {
            return (<CircularProgress />);
        }

        return (
            <div>
                <List>
                    <Subheader style={styles.title}>
                        Your already have {this.props.entitiesCount} devices.
                    </Subheader>
                    <Divider inset={true}/>

                    {this.props.entities.map((entity) => (
                    <ListItem style={styles.list} key={entity._id}
                              primaryText={entity.name + " , " + entity._id}
                              secondaryText={entity.desc}
                              leftAvatar={<Avatar size={48} src="/imgs/device.png" />}
                              onClick={this.selectEntity.bind(this, entity._id)}
                    >
                    </ListItem>
                        ))}

                </List>
            </div>
        )
    }
}

DevicesList.propTypes = {
    loading: PropTypes.bool.isRequired,
    entities: PropTypes.array.isRequired,
    entitiesCount: PropTypes.number.isRequired,
    itemClickPath: PropTypes.string,
};