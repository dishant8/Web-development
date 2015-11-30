var q = require('q');
var mongoose = require('mongoose');

module.exports = function (db) {
    var FormSchema = require("./form.schema.js");
    var FormModel = mongoose.model("FormModel", FormSchema)

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFieldById: findFieldById,
        createField: createField,
        deleteFieldById: deleteFieldById,
        updateField: updateField,
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
        FormModel.create(form, function (err, form) {
            FormModel.find({ "idForUser": userId }, function (err, forms) {
                deferred.resolve(forms);
            })
        })
        return deferred.promise;
    }


    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({ "title": title }, function (err, form) {
            deferred.resolve(form);
        })
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        var userId;

        findFormById(formId)
            .then(function (form) {
                userId = form.idForUser;
                FormModel.remove({ "_id": formId }, function (err, form) {
                    findAllFormsForUser(userId).then(function (forms) {
                        deferred.resolve(forms);
                    })
                })
            })
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            for (var prop in form) {
                if (!(typeof newForm[prop] == 'undefined')) {

                    form[prop] = newForm[prop];
                }
            }
            form.save(function (err) {
                FormModel.findById(formId,function (err, form) {
                    deferred.resolve(form);
                })
            })
        })
        return deferred.promise;
    }


    function findFieldById(fieldId, form) {
        var deferred = q.defer();

        for (i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                deferred.resolve(form.fields[i]);
            }
        }
        return deferred.promise;
    }

    function deleteFieldById(fieldId, form) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                form.fields.splice(i, 1);
            }
        }
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