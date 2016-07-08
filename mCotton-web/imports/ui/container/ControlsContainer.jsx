/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { orange300 } from 'material-ui/styles/colors';
import DatasList from '../components/lists/DatasList';

import C_MessageDatas from '../../../lib/collections/MessageDatas';
import { MSG_DATA, MSG_CONTROL, MSG_EVENT } from '../../../lib/constants';

export default ControlsContainer = createContainer(() => {
    const handle = Meteor.subscribe('msg_controls');
    const loading = !handle.ready();

    const entities = C_MessageDatas.find({ msgType: MSG_CONTROL }, { sort: { createAt: -1 } }).fetch();
    const entitiesCount = C_MessageDatas.find({ msgType: MSG_CONTROL }).count();

    return {
        title: "Recent controls between devices",
        iconColor: orange300,
        iconText: "C",

        loading,
        entities,
        entitiesCount,
    };
}, DatasList);