(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        //    factory is just a registry for services. each service is just a function object.
        .factory("UserService", UserService);




    function UserService($rootScope) {
        // all users here. 
        var users = [];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            var user = null;

            for (var  u in users) {
                if (users[u].username == username && users[u].password == password) {
                    user = users[u];
                    break;
                }
            }

            return callback(user);
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            /* guid generation*/
            user.id = chance.guid();
            users.push(user);
            return callback(user)
        }

        function deleteUserById(id, callback) {
            for (var u in users) {
                if (users[u].id == id) {
                    users.splice(u, 1);
                    break;
                }
            }

            callback(users);
        }


        function updateUser(id, user, callback) {
            for (var  u in users) {
                if (users[u].id == id) {
                    users[u] = user;
                    break;
                }
            }

            callback(user);
        }
    };

})();