import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

export default function () {
    if (Meteor.users.find().count() === 0) {

        const users = [
            { username: "Normal User", email: "normal@example.com", password: "123456", roles: ['user'] },
            { username: "Editor", email: "editor@microduino.cc", password: "123456", roles: ['editor'] },
            { username: "Project Approval", email: "pm@microduino.cc", password: "123456", roles: ['project-approval']},
            { username: "Customer Care", email: "cc@microduino.cc", password: "123456", roles: ['customer-care'] },
            { username: "Admin User", email: "admin@microduino.cc", password: "MicroduinoAdmin!", roles: ['admin'] },
            { username: "Microduino", email: "dev@microduino.cc", password: "123456", roles: ['admin', 'editor'] },
            { username: "Iasc CHEN", email: "iasc@163.com", password: "123456", roles: ['admin', 'editor'] }
        ];

        users.forEach(function (user) {
            let id;

            id = Accounts.createUser({
                email: user.email,
                password: user.password,
                username: user.username
            });

            if (user.roles.length > 0) {
                // Need _id of existing user record so this call must come
                // after `Accounts.createUser` or `Accounts.onCreate`
                Roles.addUsersToRoles(id, user.roles);
            }

        });
    }
}
