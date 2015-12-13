(function () {
    "use strict";
    angular
        .module("MovieApp")
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
            $http.get("/api/project/user?username=" + username + "&password=" + password).success(d.resolve);
            return d.promise;
        }

        function findAllUsers() {
            var d = $q.defer();
            $http.get("/api/project/user").success(d.resolve);
            return d.promise;
        }

        function createUser(user) {
            var d = $q.defer();
            $http.post("/api/project/user", user).success(d.resolve);
            return d.promise;
        }

        function deleteUserById(id) {
            var d = $q.defer();
            $http.delete("/api/project/user/" + id).success(d.resolve);
            return d.promise;
        }

        function updateUser(id, user) {
            var d = $q.defer();
            $http.put("/api/project/user/" + id, user).success(d.resolve);
            return d.promise;
        }
    };

})();