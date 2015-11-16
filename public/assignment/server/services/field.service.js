var model = require("../models/form.model.js")();
module.exports = function (app) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        var formid = req.params.formId;
        var form = model.findFormByFormId(formid);
        var output;
        if (form == null) {
            output = null;
        }
        else {
            output = form.fields;
        }
        res.json(output);
    }

    function getFieldByFieldId(req, res) {
        var formid = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findFormByFormId(formid);
        var fields = model.findFieldById(fieldId, form)
        res.json(fields);
    }

    function createNewField(req, res) {
        var formid = req.params.formId;
        var newField = req.body;
        var form = model.findFormByFormId(formid);
        var fields = model.createField(newField, form);
        res.json(fields);
    }

    function deleteFieldByIdForForm(req, res) {
        var formid = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findFormByFormId(formid);
        console.log("FORM+++" + form)
        var fields = model.deleteFieldById(fieldId, form)
        res.json(fields);
    }


    function updateField(req, res) {
        var formid = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldFromBody = req.body;
        var form = model.findFormByFormId(formid);
        var field = model.updateField(fieldId, fieldFromBody, form)
        res.json(field);
    }
};