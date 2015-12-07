(function () {
    "use strict";
    angular
    .module("FormBuilderApp")
        //    factory is just a registry for services. each service is just a function object.
        .factory("UserService", UserService);

        function UserService($rootScope, $http, $q) {

            var api = {
                findUserByUsernameAndPassword: findUserByUsernameAndPassword,
                findAllUsers: findAllUsers,
                createUser: createUser,
                deleteUserById: deleteUserById,
                updateUser: updateUser
            };

            return api;

            /*impl below*/

            function findUserByUsernameAndPassword(username, password) {
                var d = $q.defer();
                $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(

                    function(data) {
                        console.log('data got..');
                        console.log(data);
                        d.resolve(data);}

                    )

                ;
                return d.promise;
            }

            function findAllUsers() {
                var d = $q.defer();
                $http.get("/api/assignment/user").success(d.resolve);
                return d.promise;
            }

            function createUser(user) {
                var d = $q.defer();
                $http.post("/api/assignment/user", user).success(function(data)  {
                    d.resolve(data)
                });
                return d.promise;
            }

            function deleteUserById(id) {
                var d = $q.defer();
                $http.delete("/api/assignment/user/" + id).success(d.resolve);
                return d.promise;
            }

            function updateUser(id, user) {
                var d = $q.defer();
                $http.put("/api/assignment/user/" + id, user).success(d.resolve);
                return d.promise;
            }
        };

    })();