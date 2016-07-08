/**
 * Created by chenhao on 16/6/15.
 */

import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

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

export default class ProjectsList extends Component {

    selectEntity(id) {
        // console.log("selectEntity", id);
        if (this.props.itemClickPath) {
            FlowRouter.go(FlowRouter.path(this.props.itemClickPath, { id: id }));
        }
    }

    render() {
        if(this.props.loading){
            return (<CircularProgress />);
        }

        return (
            <List>
                <Subheader style={styles.title}>
                    {this.props.entitiesCount} awesome projects are waiting for you.
                </Subheader>
                <Divider inset={true}/>

                {this.props.entities.map((entity) => (
                <ListItem style={styles.list} key={entity._id}
                          primaryText={entity.name + " , by " + entity.authorName}
                          secondaryText={entity.desc}
                          leftAvatar={<Avatar size={48} src="/imgs/project.png" />}
                          onClick={this.selectEntity.bind(this, entity._id)}
                >
                </ListItem>
                    ))}
            </List>
        )
    }
}

ProjectsList.propTypes = {
    loading: PropTypes.bool.isRequired,
    entities: PropTypes.array.isRequired,
    entitiesCount: PropTypes.number.isRequired,
    itemClickPath: PropTypes.string,
};