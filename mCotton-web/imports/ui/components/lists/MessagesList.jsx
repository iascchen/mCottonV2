import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import ActionAlarmOn from 'material-ui/svg-icons/action/alarm-on';
import AvLibraryMusic from 'material-ui/svg-icons/av/library-music';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

import ActionInfo from 'material-ui/svg-icons/action/info';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';

const style = { margin: 10 };

const MessagesList = () => (
    <List>
        <ListItem >
            <Card style={style}>
                <CardHeader
                    title="Without Avatar"
                    subtitle="Subtitle"
                    actAsExpander={true}
                    avatar={<Avatar icon={<MapsDirectionsCar />} color={blue300} backgroundColor={indigo900} size={30} />}
                />
            </Card>
        </ListItem>
        <ListItem primaryText="Garage" leftIcon={<MapsDirectionsCar />}/>

    </List>
);

export default MessagesList;
