import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules

import appModule from './modules/app';
import adminModule from './modules/admin';

// init context
const context = initContext();

// create app
const app = createApp(context);

app.loadModule(appModule);
app.loadModule(adminModule);

app.init();
