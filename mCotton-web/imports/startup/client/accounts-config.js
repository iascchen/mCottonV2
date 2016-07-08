//import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

//FlowRouter.route("/login", {
//    action(params) {
//        mount(MainLayout, {
//            content: <Accounts.ui.LoginForm />
//        });
//    }
//});