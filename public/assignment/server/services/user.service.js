
module.exports = function (app, userModel) {


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

        var credentials = { "userName": username, "password": password }

        userModel.findUserByCredentials(credentials).then(function (user) {
            res.json(user);
        })

    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserByUsername(req, res) {
        var userName = req.params.username;
        userModel.findUserByUsername(userName)
         .then(function (users) {
             res.json(users);
         });
    }

    function findUserById(req, res) {
        var id = req.params.id;
        userModel.findUserById(id)
         .then(function (users) {
             res.json(users);
         });
    }

    function createUser(req, res) {
        var userObject = req.body;
        userModel.createUser(userObject)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var userObject = req.body;
        userModel.updateUser(id, userObject)
            .then(function (user) {
                res.json(user);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        userModel.deleteUserById(id)
              .then(function (users) {
                  res.json(users);
              });
    }

}