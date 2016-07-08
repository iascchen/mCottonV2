/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { pink300 } from 'material-ui/styles/colors';
import DatasList from '../components/lists/DatasList';

import C_MessageDatas from '../../../lib/collections/MessageDatas';
import { MSG_DATA, MSG_CONTROL, MSG_EVENT } from '../../../lib/constants';

export default EventsContainer = createContainer(() => {
    const handle = Meteor.subscribe('msg_events');
    const loading = !handle.ready();

    const entities = C_MessageDatas.find({ msgType: MSG_EVENT }, { sort: { createAt: -1 } }).fetch();
    const entitiesCount = C_MessageDatas.find({ msgType: MSG_EVENT }).count();

    return {
        title: "Recent events in your house",
        iconColor: pink300,
        iconText: "E",

        loading,
        entities,
        entitiesCount,
    };
}, DatasList);