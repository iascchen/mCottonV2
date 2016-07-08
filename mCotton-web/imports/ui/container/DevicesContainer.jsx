/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import C_Devices from '../../../lib/collections/Devices';

import DevicesList from '../components/lists/DevicesList';

export default DevicesContainer = createContainer(() => {
    const handle = Meteor.subscribe('devices');
    const loading = !handle.ready();

    const entities = C_Devices.find({}).fetch();
    const entitiesCount = C_Devices.find({}).count();

    const itemClickPath = 'Dashboard';

    return {
        loading,
        entities,
        entitiesCount,
        itemClickPath,

    };
}, DevicesList);