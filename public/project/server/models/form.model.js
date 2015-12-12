module.exports = function (app) {
    var fs = require('fs');
    var formList = JSON.parse(fs.readFileSync('public/assignment/server/models/form.mock.json', 'utf8'));

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        getFieldsByFormId: getFieldsByFormId,
        getField: getField,
        removeField: removeField,
        createField: createField,
        updateField: updateField
    }
    return api;

    function createForm(form) {
        form.fields = [];
        formList.push(form);
        return form;
    }

    function findAllForms() {
        return formList;
    }

    function findFormById(id) {
        // if exists, return elelment; otherwise null/undefined
        return formList.filter(function (ele) {
            return ele.id == id;
        })[0];
    }

    function updateForm(id, form) {
        for (var index in formList) {
            if (formList[index].id == id) {
                formList[index] = form;
                return formList[index];
            }
        }

        return null;
    }

    function deleteForm(id) {
        for (var index in formList) {
            if (formList[index].id == id)
                formList.splice(index, 1);
        }
        return formList;
    }

    function findFormByTitle(title) {
        return formList.filter(function (ele) {
            return ele.title == title;
        })[0];
    }

    function findFormsForUser(userId) {
        return formList.filter(function (u) {
            return u.userId == userId
        });
    }

    function getFieldsByFormId(id) {
        var form = findFormById(id);

        return form ? form.fields : [];
    }

    function getField(formId, fieldId) {
        var form = findFormById(formId);
        return form ? (form.fields.filter(function (ele) {
            return ele.id == fieldId;
        })[0]) : [];
    }

    function removeField(formId, fieldId) {
        var form = findFormById(formId);
        console.log("removeField\t" + formId + "\t " + fieldId)
        if (form) {
            for (var index in form.fields) {
                if (form.fields[index].id == fieldId) {
                    form.fields.splice(index, 1);
                    break;
                }
            }
            return form.fields;

        }

        return [];

    }

    function createField(formId, field) {
        var form = findFormById(formId);
        if (!form) {
            return null;
        }

        form.fields.push(field);
        return field;
    }

    function updateField(formId, fieldId, field) {
        var form = findFormById(formId);
        if (!form)
            return null;

        for (var index in form.fields) {
            if (form.fields[index].id == fieldId) {
                form.fields[index].label = field.label;
                form.fields[index].type = field.type;
                form.fields[index].placeholder = field.placeholder;
                if (field.type == "OPTIONS") {
                    form.fields[index].options = field.options;
                }
                break;
            }
        }
        return form.fields;
    }
};