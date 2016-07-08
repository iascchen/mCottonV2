/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { blue300 } from 'material-ui/styles/colors';
import DatasList from '../components/lists/DatasList';

import C_MessageDatas from '../../../lib/collections/MessageDatas';
import { MSG_DATA, MSG_CONTROL, MSG_EVENT } from '../../../lib/constants';

export default ControlsContainer = createContainer(() => {
    const handle = Meteor.subscribe('msg_datas');
    const loading = !handle.ready();

    const entities = C_MessageDatas.find({ msgType: MSG_DATA }, { sort: { createAt: -1 } }).fetch();
    const entitiesCount = C_MessageDatas.find({ msgType: MSG_DATA }).count();

    return {
        title: "Recent data uploaded",
        iconColor: blue300,
        iconText: "D",

        loading,
        entities,
        entitiesCount,
    };
}, DatasList);