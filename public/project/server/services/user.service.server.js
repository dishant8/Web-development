module.exports = function (app, userModel) {

    app.get("/api/project/user/:username/:password", findUser);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:username", findUserByUsername);
    app.get("/api/project/userById/:userId", findUserById);
    app.post("/api/project/user", createUser)
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);

    function findUser(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        var credentials = { "userName": username, "password": password }

        userModel.findUserByCredentials(credentials)
            .then(function (user) {
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
        var userId = req.params.userId;
        userModel.findUserById(userId)
         .then(function (user) {
             res.json(user);
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
        console.log("AYA");
        var userId = req.params.userId;
        var userObject = req.body;
        console.log(userObject.buyer);
        userModel.updateUser(userId, userObject)
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