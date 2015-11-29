var q = require('q');
var mongoose = require('mongoose');

module.exports = function (db) {
    var FormSchema = require("./form.schema.js");
    var FormModel = mongoose.model("FormModel", FormSchema)

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        findFormByFormId: findFormByFormId,
        selectUser: selectUser,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFieldById: findFieldById,
        createField: createField,
        deleteFieldById: deleteFieldById,
        updateField: updateField,
        guid: guid

    }

    return api;

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.find({ "idForUser": userId }, function (err, forms) {
            deferred.resolve(forms);
        })
        return deferred.promise;
    }

    function createFormForUser(userId, form) {
        var deferred = q.defer();
        console.log("ID WHILE CREATE" + userId);
        FormModel.create(form, function (err, form) {
            FormModel.find({ "idForUser": userId }, function (err, forms) {
                console.log("FORMS IN MODEL" + forms);
                deferred.resolve(forms);
            })
        })
        return deferred.promise;
    }

    function findFormByFormId(formid) {
        var deferred = q.defer();
        FormModel.findById(formid, function (err, form) {
            deferred.resolve(form);
        })
        return deferred.promise;
    }

    function selectUser(formId) {
        var userId;
        for (i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                userId = mock[i].userId;
            }
        }

        var forms = [];
        for (i = 0; i < mock.length; i++) {
            if (mock[i].id != formId) {
                if (mock[i].userId == userId) {
                    forms.push(mock[i]);
                }
            }
        }
        return forms;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({ "title": title }, function (err, form) {
            deferred.response(form);
        })
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.remove({ "_id": formId }, function (err, form) {
            deferred.response(form);
        })
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        console.log(formId);
        console.log(form.title);
        for (i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                mock[i].title = form.title;
                var userId = mock[i].userId;
                var forms = [];
                for (i = 0; i < mock.length; i++) {
                    if (mock[i].userId == userId) {
                        forms.push(mock[i]);
                    }
                }
                return forms;
            }
        }
    }

    function findFieldById(fieldId, form) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                return form.fields[i];
            }
        }
        return null;
    }

    function deleteFieldById(fieldId, form) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                form.fields.splice(i, 1);
            }
        }
        console.log(form.fields);
        return form.fields;
    }

    function createField(newField, form) {
        newField.id = guid();
        form.fields.push(newField);
        return form.fields;
    }

    function updateField(fieldId, formFields, form) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                form.fields[i] = formFields;
            }
        }
        return form.fields;
    }


    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


}