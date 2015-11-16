module.exports = function (app) {

    var formModel = require("../models/form.model.js")(app);
    //    var obj = require("../models/user.model.js")(app);

    app.get("/api/assignment/form/user/:id", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", selectUser);
    app.post("/api/assignment/user/:id/form", createFormForUser);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var id = req.params.id;
        var forms = formModel.findAllFormsForUser(id);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var id = req.params.id;
        var form = req.body;

        var forms = formModel.createFormForUser(id, form);
        res.json(forms);
    }

    function selectUser(req, res) {
        console.log("YOU ARE IN FORM SERVICE SERVER");
        var id = req.params.formId;
        var forms = formModel.selectUser(id);
        res.json(forms);
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;

        var forms = formModel.deleteFormById(formId);
        res.json(forms)
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var forms = formModel.updateFormById(formId, newForm);
        console.log(forms);
        res.json(forms);
    }
}