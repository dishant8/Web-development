
module.exports = function (app) {

    var obj = require("../models/user.model.js")(app);

    app.get("/api/search/user/:username/:password", findUser);
    app.get("/api/search/:query/:type1/:type2", searchData);
    app.get("/api/search/user", findAllUsers);
    app.get("/api/search/user/:username", findUserByUsername);
    //app.get("/api/search/user/:id", findUserById);
    app.post("/api/search/user", createUser)
    app.put("/api/search/user/:id", updateUser);
    app.delete("/api/search/user/:id", deleteUserById);

    function findUser(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        var credentials = { "username": username, "password": password }

        var user = obj.findUserByCredentials(credentials)

        res.json(user);
    }

    function searchData(req, res) {
        console.log("idhar aya");
        var query = req.params.query;
        var type1 = req.params.type1;
        var type2 = req.params.type2;
        var results = obj.searchData(query, type1, type2);
        res.json(results);
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