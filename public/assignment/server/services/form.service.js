module.exports = function (app, formModel) {

    //    var formModel = require("../models/form.model.js")(app);
    //    var obj = require("../models/user.model.js")(app);

    app.get("/api/assignment/form/user/:id", findAllFormsForUser);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.id;

        formModel.findAllFormsForUser(userId)
            .then(function (forms) {

                res.json(forms);
            });
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;

        formModel.createFormForUser(userId, form)
            .then(function (forms) {

                res.json(forms);
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(function (forms) {
                console.log("IN SERVICE" + forms);
                res.json(forms)
            });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        formModel.updateFormById(formId, newForm)
            .then(function (forms) {

                res.json(forms);
            });
    }
}