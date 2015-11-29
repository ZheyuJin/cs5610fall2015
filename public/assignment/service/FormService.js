(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        //    factory is just a registry for services. each service is just a function object.
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };


        function createFormForUser(userId, form, callback) {

            form.id = chance.guid();
            form.userid = userId;

            forms.push(form);

            return callback(form);
        }

        function findAllFormsForUser(userId, callback) {


            var ret = [];

            for (f in forms) {
                if (forms[f].userid == userId)
                    ret.push(forms[f]);
            }

            callback(ret);
        }

        function deleteFormById(formId, callback) {
            // MAYBE buggy!
            for (f in forms) {
                if (forms[f].id == formId)
                    forms.splice(f, 1);
            }

            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (f in forms) {
                if (forms[f].id == formId)
                    forms[f] = newForm;
            }

            callback(newForm);
        }

    }
})();