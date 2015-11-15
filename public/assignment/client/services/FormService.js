(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {
                userName: "asdf",
                name: "myForm",
                id: "1234"
            }
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findAllForms: findAllForms,
            guid: guid
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userName = userId;
            forms.push(form);
            callback(form);
        }

        function findAllForms(callback) {
            callback(forms);
        }

        function findAllFormsForUser(userId, callback) {
            console.log("entered")
            var formsFound = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userName == userId) {
                    formsFound.push(forms[i]);
                }
                callback(formsFound);
            }
        }

        function deleteFormById(formId, callback) {
            for (i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            form = null;
            
            for (i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    forms.userId = newForm.userId;
                    forms.userId = newForm.userId;
                    form = forms[i];
                }
            }
            callback(form);
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

})();