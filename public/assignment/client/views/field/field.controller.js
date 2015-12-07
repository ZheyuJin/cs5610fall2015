(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var model = this;

        
        
        /*values come from form view, parsed here*/
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        FieldService.getFieldsForForm(formId).then(function(response) { model.fields = response});

        model.addField = function(fieldType)  {
            var field = null;

            switch (fieldType) {
                case "TEXT":
                field = '{"id": null, "label": "New Text Field", "fieldType": "TEXT", "placeholder": "New Field"}';
                break;
                case "TEXTAREA":
                field = '{"id": null, "label": "New Text Field", "fieldType": "TEXTAREA", "placeholder": "New Field"}';
                break;
                case "DATE":
                field = '{"id": null, "label": "New Date Field", "fieldType": "DATE"}';
                break;
                case "SELECT":
                field = '{"id": null, "label": "New Dropdown", "fieldType": "OPTIONS", "options": [{"label": "Option 1", "value": "OPTION_1"},{"label": "Option 2", "value": "OPTION_2"},{"label": "Option 3", "value": "OPTION_3"}]}';
                break;
                case "CHECKBOXES":
                field = '{"id": null, "label": "New Checkboxes", "fieldType": "CHECKBOXES", "options": [ {"label": "Option A","value": "OPTION_A"}, {"label": "Option B","value": "OPTION_B"}, {"label": "Option C","value": "OPTION_C"}]}';
                break;
                case "RADIOS":
                field = '{"id": null, "label": "New Radio Buttons", "fieldType": "RADIOS", "options": [{"label": "Option X", "value": "OPTION_X"},{"label": "Option Y", "value": "OPTION_Y"},{"label": "Option Z", "value": "OPTION_Z"}]}';
                break;
            }

            if (field) {
                FieldService.createFieldForForm(formId, field).then(function(f) {model.fields.push(f)});
            }
        }

        model.removeField = function (field) {
            FieldService.deleteFieldFromForm(formId, field.id).then(function(response) { model.fields = response});
        }
    }
})();