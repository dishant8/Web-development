
module.exports = function (app) {

    var obj = require("../models/user.model.js")(app);

    app.get("/api/assignment/user/:username/:password", findUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:username", findUserByUsername);
    //app.get("/api/assignment/user/:id", findUserById);
    app.post("/api/assignment/user", createUser)
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function findUser(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        var credentials = { "username": username, "password": password }

        var user = obj.findUserByCredentials(credentials)

        res.json(user);
    }

    function findAllUsers(req, res) {
        var users = obj.findAllUsers();
        res.json(users);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = obj.findUserByUsername(username);
        res.json(user);
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = obj.findUserById(id);
        res.json(user);
    }

    function createUser(req, res) {
        var userObject = req.body;
        var user = obj.createUser(userObject);
        res.json(user);
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var userObject = req.body;
        console.log(id);
        var user = obj.updateUser(id, userObject);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        var users = obj.deleteUserById(id);
        res.json(users);
    }
}