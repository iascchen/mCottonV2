import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import {Accounts} from 'meteor/accounts-base';

import MainLayout from '../../ui/layouts/MainLayout';
import WidgetTestLayout from '../../ui/layouts/WidgetTestLayout';

import Home from '../../ui/views/Home';
import House from '../../ui/views/House';
import DataConsole from '../../ui/views/DataConsole';

import DeviceDashboard from '../../ui/components/dashboard/DeviceDashboard';

import ProjectsContainer from '../../ui/container/ProjectsContainer';
import DevicesContainer from '../../ui/container/DevicesContainer';

import ControlsContainer from '../../ui/container/ControlsContainer';
import DatasContainer from '../../ui/container/DatasContainer';
import EventsContainer from '../../ui/container/EventsContainer';

//import DevicesList from '../../ui/components/lists/DevicesList';
//import EventsList from '../../ui/components/lists/EventsList';
//import DatasList from '../../ui/components/lists/DatasList';
//import ControlsList from '../../ui/components/lists/ControlsList';

//import MCanvas from '../../ui/components/widgets/MCanvas';

import MLed from '../../ui/components/widgets/MLed';
import MOutput from '../../ui/components/widgets/MOutput';

import MButton from '../../ui/components/widgets/MButton';
import MToggle from '../../ui/components/widgets/MToggle';
import MSlider from '../../ui/components/widgets/MSlider';
import MRangeSlider from '../../ui/components/widgets/MRangeSlider';
import MInput from '../../ui/components/widgets/MInput';
import MColor from '../../ui/components/widgets/MColor';
import MColorChrome from '../../ui/components/widgets/MColorChrome';
import MSelector from '../../ui/components/widgets/MSelector';
import MTimePicker from '../../ui/components/widgets/MTimePicker';

import MTerminal from '../../ui/components/widgets/MTerminal';

import LifeCycle from '../../ui/components/react/LifeCycle';
import DestroyComponent from '../../ui/components/react/DestroyComponent';
import Selector from '../../ui/components/react/Selector';

/********************************
 * React
 ********************************/

FlowRouter.route("/lifecycle", {
    subscriptions: function () {
        // this.register('projects', Meteor.subscribe('projects'));
    },
    action() {
        mount(MainLayout, {
            content: (<LifeCycle value="Hello Haha"/>)
        });
    }
});

FlowRouter.route("/destroy", {
    subscriptions: function () {
        // this.register('projects', Meteor.subscribe('projects'));
    },
    action() {
        mount(MainLayout, {
            content: (<DestroyComponent />)
        });
    }
});

FlowRouter.route("/selector", {
    subscriptions: function () {
        // this.register('projects', Meteor.subscribe('projects'));
    },
    action() {
        mount(MainLayout, {
            content: (<Selector />)
        });
    }
});

/********************************
 * Components
 ********************************/

FlowRouter.route("/projects", {
    //subscriptions: function () {
    //    // this.register('projects', Meteor.subscribe('projects'));
    //},
    action() {
        mount(MainLayout, {
            content: (<ProjectsContainer />)
        });
    }
});

FlowRouter.route("/devices", {
    //subscriptions: function () {
    //    this.register('devices', Meteor.subscribe('devices'));
    //},
    action() {
        mount(MainLayout, {
            content: (<DevicesContainer />)
        });
    }
});

FlowRouter.route("/msgevents", {
    subscriptions: function () {
        this.register('msg_events', Meteor.subscribe('msg_events'));
    },
    action() {
        mount(MainLayout, {
            content: (<EventsContainer />)
        });
    }
});

FlowRouter.route("/msgdatas", {
    subscriptions: function () {
        this.register('msg_datas', Meteor.subscribe('msg_datas'));
    },
    action() {
        mount(MainLayout, {
            content: (<DatasContainer />)
        });
    }
});

FlowRouter.route("/msgcontrols", {
    subscriptions: function () {
        this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<ControlsContainer />)
        });
    }
});

FlowRouter.route("/widget_setting", {
    subscriptions: function () {
        this.register('devices', Meteor.subscribe('devices'));
    },
    action() {
        mount(MainLayout, {
            content: (<DeviceFieldSelector />)
        });
    }
});

/********************************
 * Widgets
 ********************************/

const widgetsRoutes = FlowRouter.group({
    prefix: '/widgets',
    name: 'widgets',
    triggersEnter: [function (context, redirect) {
        console.log('running group triggers');
    }]
});


//widgetsRoutes.route("/", {
//    subscriptions: function () {
//        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
//    },
//    action() {
//        mount(MainLayout, {
//            content: (<MCanvas cols={4} cellHeight={100}/>)
//        });
//    }
//});

widgetsRoutes.route("/m_led", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MLed color="#ff00ff" title="门禁" on={true}/>)
        });
    }
});

widgetsRoutes.route("/m_output", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MOutput outputRows={3}
                               output={["Welcome to Microduino\n","==========\n","\n"]}/>)
        });
    }
});

import ActionAndroid from 'material-ui/svg-icons/action/android';
import {orange500} from 'material-ui/styles/colors';
widgetsRoutes.route("/m_button", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(WidgetTestLayout, {
            children: [
                <MButton type="toggle" title="按钮1" />,
                <MButton type="toggle" title="按钮2" backgroundColor="green" />,
                <MButton type="toggle" title="Android"><ActionAndroid /></MButton>,
                <MButton type="toggle" title="按钮4" disabled="true" />,
                <MButton type="toggle" title="按钮5" backgroundColor={orange500} />,
            ],
        });
    }
});

widgetsRoutes.route("/m_toggle", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(WidgetTestLayout, {
            children: [
                <MToggle toggled="true" title="灯1"/>,
                <MToggle toggled="true" title="Android"><ActionAndroid /></MToggle>,
                <MToggle toggled="true" title="灯3"/>,
                <MToggle toggled="true" title="灯4"/>,
            ],
        });
    }
});

widgetsRoutes.route("/m_slider", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MSlider title="温度" min={-20} max={100} value={10} step={1}/>)
        });
    }
});

widgetsRoutes.route("/m_range_slider", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        let value = { start: 10, end: 80 };

        mount(MainLayout, {
            content: (<MRangeSlider title="温度" min={-20} max={100} value={ JSON.stringify(value) } step={1}/>)
        });
    }
});

widgetsRoutes.route("/m_input", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MInput />)
        });
    }
});

widgetsRoutes.route("/m_terminal", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MTerminal
                outputRows={6}
                output={["Welcome to Microduino\n","==========\n","\n"]}/>)
        });
    }
});

widgetsRoutes.route("/m_color", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MColor color="#0000ff"/>)
        });
    }
});

widgetsRoutes.route("/m_color_chrome", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MColorChrome />)
        });
    }
});

widgetsRoutes.route("/m_selector", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MSelector title="模式"/>)
        });
    }
});

widgetsRoutes.route("/m_time", {
    subscriptions: function () {
        //this.register('msg_controls', Meteor.subscribe('msg_controls'));
    },
    action() {
        mount(MainLayout, {
            content: (<MTimePicker title="提醒"/>)
        });
    }
});

//FlowRouter.route("/rule/:id/edit", {
//    subscriptions: function () {
//        this.register('device_rules', Meteor.subscribe('device_rules'));
//    },
//    action() {
//        mount(Layout, {
//            content: (<DeviceRuleEditor />)
//        });
//    }
//});
