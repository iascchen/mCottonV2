import React from 'react';

import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Divider from 'material-ui/Divider';

import MessagesList from '../components/lists/MessagesList';
import DevicesContainer from '../container/DevicesContainer';

const House = ({content}) => (
    <div >
        <MessagesList />
        <Divider />
        <DevicesContainer />
    </div>
);

export default House;