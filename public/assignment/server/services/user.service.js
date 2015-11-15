
module.exports = function (app) {

    var obj = require("../models/user.model.js")(app);

    app.get("/api/assignment/user/:username/:password", findUser);

    function findUser(req, res) {

        var username = req.params.username;
        var password = req.params.password;

        var credentials = { "username": username, "password": password }

        var user = obj.findUserByCredentials(credentials)

        res.json(user);

    }
}