module.exports = function (app, mongoose, FormSchema) {
    var fs = require('fs');
    var formList = JSON.parse(fs.readFileSync('public/assignment/server/models/form.mock.json', 'utf8'));
    var q = require('q');
    var FormModel = mongoose.model("cs5610.assignment.form", FormSchema);

    /*remove all and reinset*/
    FormModel.remove(function (err, result) {
        if(err){
            console.error(err);
        }
        else{
            formList.forEach(function(ele){
                createForm(ele);        
            });
        }
    });



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
        var deferred = q.defer();
        FormModel.create(
        {
            id: form.id,
            title: form.title,
            userId: form.userId,
            fields: form.fields
        },
        function (err, result) {
            if(err){
                console.error(err);
                deferred.reject(err);
            }
            else
                deferred.resolve(form);
        });

        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = q.defer();
        FormModel.find(
        {
            id: id
        },
        function (err, result) {                    
            deferred.resolve(result[0]);            
        });
        return deferred.promise;
    }

    function updateForm(id, form) {
        var deferred = q.defer();
        FormModel.findOneAndUpdate(
        {
            id: id
        },
        {
            title: form.title,
            userId: form.userId,
            fields: form.fields
        }, 
        function (err, result) {
            deferred.resolve(form);
        });

        return deferred.promise;
    }

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel.remove(
        {
            id: id
        },
        function (err, result) {
            deferred.resolve(null);
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find(
        {
            title: title
        },
        function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function findFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.find(
        {
            userId: userId
        },
        function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getFieldsByFormId(id) {
        var deferred = q.defer();
        findFormById(id).then(function (form) {
            if (!form) {
                deferred.resolve([]);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function getField(formId, fieldId) {
        var deferred = q.defer();
        findFormById(formId).then(function (form) {
            if (!form) {
                deferred.resolve(null);
            } else {
                for (var idx in form.fields) {
                    if (form.fields[idx].id == fieldId) {
                        deferred.resolve(form.fields[idx]);
                    }
                }
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function removeField(formId, fieldId) {
        var deferred = q.defer();
        findFormById(formId).then(function (form) {
            if (!form) {
                deferred.resolve([]);
            } else {
                for (var idx in form.fields) {
                    if (form.fields[idx].id == fieldId) {
                        form.fields.splice(idx, 1);
                        break;
                    }
                }
                updateForm(formId, form);
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function createField(formId, field) {
        var deferred = q.defer();

        findFormById(formId).then(function (form) {
            if (!form) {
                deferred.resolve(null);
            } else {
                form.fields.push(field);
                updateForm(formId, form);
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        findFormById(formId).then(function (form) {
            if (!form) {
                deferred.resolve(null);
            } else {
                for (var idx in form.fields) {
                    if (form.fields[idx].id == fieldId) {
                        form.fields[idx].label = field.label;
                        form.fields[idx].fieldType = field.fieldType;
                        form.fields[idx].placeholder = field.placeholder;
                        if (field.fieldType == "OPTIONS") {
                            form.fields[idx].options = field.options;
                        }
                        break;
                    }
                }
                updateForm(formId, form);
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }
};