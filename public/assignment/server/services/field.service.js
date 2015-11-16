var model = require("../models/form.model.js")();
module.exports = function (app) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createNewField);
    app.post("/api/assignment/form/:formId/field/:fieldId", updateField);

    function getFieldsForForm(req, res) {
        var fid = req.params.formId;
        var form = model.findById(fid);
        var output;
        if (form == null) {
            output = null;
        }
        else {
            output = form.fields;
        }
        res.json(output);
    }

    function getFieldByIdForForm(req, res) {
        var fid = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findById(fid);
        res.json(model.findFieldById(fieldId, form));
    }

    function deleteFieldByIdForForm(req, res) {
        var fid = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = model.findById(fid);
        res.json(model.deleteFieldById(fieldId, form));
    }

    function createNewField(req, res) {
        var fid = req.params.formId;
        var newField = req.body;
        var form = model.findById(fid);
        res.json(model.createField(newField, form));
    }

    function updateField(req, res) {
        var fid = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldFromBody = req.body;
        var form = model.findById(fid);
        res.json(model.updateField(fieldId, fieldFromBody, form));
    }
};