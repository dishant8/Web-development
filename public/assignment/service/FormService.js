(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {formName:"myForm"}
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            guid: guid
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsFound = [];
            for (i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
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
                    console.log("aya");
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