/**
 * Created by chenhao on 15/4/7.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    after: function () {
        Session.set('hash', this.params.hash);
    },
});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.route('/', {name: 'home', fastRender: true});

Router.route('/admin', {
    name: 'admin',
    template: 'accountsAdmin',
    onBeforeAction: function () {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
            console.log('redirecting');
            this.redirect('/');
        } else {
            this.next();
        }
    }
});