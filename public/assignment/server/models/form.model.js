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
        console.log("BCCC");
        findFormById(formId)
            .then(function (form) {
                userId = form.idForUser;
                for (var prop in form) {
                    if (!(typeof newForm[prop] == 'undefined')) {
                        form[prop] = newForm[prop];
                    }
                }
                form.save(function (err) {
                    findAllFormsForUser(userId)
                        .then(function (forms) {
                            deferred.resolve(forms);
                        })
                })
            })
        return deferred.promise;
    }

}