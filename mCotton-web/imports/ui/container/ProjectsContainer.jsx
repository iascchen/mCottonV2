/**
 * Created by chenhao on 16/6/22.
 */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import C_Projects from '../../../lib/collections/Projects';

import ProjectsList from '../components/lists/ProjectsList';

export default ProjectsContainer = createContainer(() => {
    const handle = Meteor.subscribe('projects');
    const loading = !handle.ready();

    const entities = C_Projects.find({}).fetch();
    const entitiesCount = C_Projects.find({}).count();

    return {
        loading,
        entities,
        entitiesCount,
    };
}, ProjectsList);