/**
 * Created by chenhao on 15/4/12.
 */

if (Meteor.users.find().count() === 0) {

    // var now = new Date().getTime();

    /********************************
     * Default Users
     ********************************/

    var users = [
        {
            name: "Normal User", email: "normal@example.com", password: "123456", roles: ['user'],
        },
        {
            name: "Editor", email: "editor@microduino.cc", password: "123456", roles: ['editor'],
        },
        {
            name: "Project Approval", email: "pm@microduino.cc", password: "123456", roles: ['project-approval'],
        },
        {
            name: "Customer Care", email: "cc@microduino.cc", password: "123456", roles: ['customer-care'],
        },
        {
            name: "Admin User", email: "admin@microduino.cc", password: "12345678", roles: ['admin'],
        },
        {
            name: "Iasc CHEN", email: "iasc@163.com", password: "123456", roles: ['admin', 'editor'],
        }
    ];

    _.each(users, function (user) {
        var id;

        id = Accounts.createUser({
            username: user.name,
            email: user.email,
            password: user.password,
            profile: { name: user.name, photo: user.photo }
        });

        if (user.roles.length > 0) {
            // Need _id of existing user record so this call must come
            // after `Accounts.createUser` or `Accounts.onCreate`
            Roles.addUsersToRoles(id, user.roles);
        }

    });
}