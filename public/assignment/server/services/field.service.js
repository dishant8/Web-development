
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        var formid = req.params.formId;
        formModel.findFormById(formid)
            .then(function (form) {
                var output;
                if (form == null) {
                    output = null;
                }
                else {
                    output = form.fields;
                }
                res.json(output);
            });

    }

    function getFieldByFieldId(req, res) {
        var formid = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormById(formid)
            .then(function (form) {
                fields = form.fields;
                for (i = 0; i < fields.length; i++) {
                    if (fields[i].id == fieldId) {
                        res.json(fields[i]);
                    }
                }
            })
    }

    function createNewField(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        formModel.findFormById(formId)
            .then(function (form) {
                var fields = form.fields;
                fields.push(newField);
                form.fields = fields;
                formModel.updateFormById(formId, form)
                    .then(function (form) {
                        res.json(form);
                    });
            });
    }

    function deleteFieldByIdForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormById(formId).then(function (form) {
            var fields = form.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i]._id == fieldId) {

                    fields.splice(i, 1);
                }
            }
            form.fields = fields;
            formModel.updateFormById(formId, form)
                .then(function (forms) {
                    res.json(forms);
                });
        });
    }


    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldFromBody = req.body;
        formModel.findFormById(formId).then(function (form) {
            var fields = form.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] == fieldId) {
                    fields[i] = fieldFromBody;
                };
            }
            form.fields = fields;

            formModel.updateFormById(formId, form)
                .then(function (field) {
                    res.json(field);
                })
        });
    }
};