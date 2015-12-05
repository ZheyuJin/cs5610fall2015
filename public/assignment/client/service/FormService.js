(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        //    factory is just a registry for services. each service is just a function object.
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        /*impl below*/
        
        function createFormForUser(userId, form) {
            var d = $q.defer();
            $http.post("/api/assignment/user/" + userId + "/form", form).success(d.resolve);
            return d.promise;
        }

        function findAllFormsForUser(userId) {
            var d = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form").success(d.resolve);
            return d.promise;
        }

        function deleteFormById(formId) {
            var d = $q.defer();
            $http.delete("/api/assignment/form/" + formId).success(d.resolve);
            return d.promise;
        }

        function updateFormById(formId, newForm) {
            var d = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm).success(d.resolve);
            return d.promise;
        }


    }
})();