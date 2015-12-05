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
         
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {};
            newForm = form;
            newForm.id = chance.guid();
            newForm.userid = userId;

            forms.push(newForm);

            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {


            var ret = [];

            for (var f in forms) {
                if (forms[f].userid == userId)
                    ret.push(forms[f]);
            }

            callback(ret);
        }

        function deleteFormById(formId, callback) {
            debugger;
            // MAYBE buggy!
            for (var f in forms) {
                if (forms[f].id == formId){
                    forms.splice(f, 1);
                    callback(forms.slice(0));
                    return;
                }
            }

            
        }

        function updateFormById(formId, newForm, callback) {
            for (var f in forms) {
                if (forms[f].id == formId)
                    forms[f] = newForm;
            }
            
            callback(newForm);
        }

    }
})();