(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }

        return api;

        // functional style below;
        function createFieldForForm(formId, field) {
            var d = $q.defer();
            $http.post("/api/assignment/form/" + formId + "/field", field).success(d.resolve);
            return d.promise;
        }

        function getFieldsForForm(formId) {
            var d = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field").success(d.resolve);
            return d.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var d = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId).success(d.resolve);
            return d.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var d = $q.defer();
            console.log("delete" + formId + fieldId);
            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId).success(d.resolve);
            return d.promise;
        }

        function updateField(formId, fieldId, field) {
            var d = $q.defer();
            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field).success(d.resolve);
            return d.promise;
        }
    }
})();