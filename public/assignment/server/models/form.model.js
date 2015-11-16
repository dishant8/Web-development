var mock = require("./form.mock.json");

module.exports = function (app) {


    var api = {
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        selectUser: selectUser,
        updateFormById: updateFormById,
        findField: findField,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField,
        guid: guid

    }

    return api;

    function findAllFormsForUser(id) {

        var forms = [];
        for (i = 0; i < mock.length; i++) {
            if (mock[i].userId == id) {
                forms.push(mock[i]);
            }
        }
        return forms;
    }

    function createFormForUser(id, form) {
        form.id = guid();
        form.userId = id;
        mock.push(form);
        var forms = [];
        for (i = 0; i < mock.length; i++) {
            if (mock[i].userId == id) {
                forms.push(mock[i]);
            }
        }
        return forms;
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
        for (i = 0; i < mock.length; i++) {
            if (mock[i].title == title) {
                return mock[i];
            }
        }
    }

    function deleteFormById(formId) {
        for (i = 0; i < mock.length; i++) {
            if (mock[i].id == formId) {
                var userId = mock[i].userId;
                mock.splice(i, 1);
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

    function findField(fieldId, form) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i].id == fieldId) {
                return form.fields[i];
            }
        }
        return null;
    }

    function deleteField(fieldId, form) {
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