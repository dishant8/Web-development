module.exports = function (app, userModel) {

    //    app.get("/api/project/user/:username/:password", findUser);
    //    app.get("/api/project/user", findAllUsers);
    //    app.get("/api/project/user/:username", findUserByUsername);
    //    app.get("/api/project/userById/:userId", findUserById);
    app.post("/api/project/reciepe/:userId", createNewReciepe)
    app.put("/api/project/reciepe/update/:userId", updateReciepe);
    app.delete("/api/project/reciepe/delete/:userId/:reciepeId", deleteReciepe);


    function createNewReciepe(req, res) {
        var userId = req.params.userId;
        var newReciepe = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                //  console.log("USER---" + user);
                var reciepes = user.seller.reciepes;
                //                console.log(newMenu);
                reciepes.push(newReciepe);
                user.seller.reciepes = reciepes;
                //              console.log("AFTER ADDING" + user.seller.menu);
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        //                        console.log("USER CREATED" + user.seller.menu);
                        res.json(user);
                    });
            })
    }

    function deleteReciepe(req, res) {
        var userId = req.params.userId;
        var reciepeId = req.params.reciepeId;
        userModel.findUserById(userId)
            .then(function (user) {
                var reciepes = user.seller.reciepes;
                for (var i = 0; i < reciepes.length; i++) {
                    if (reciepes[i]._id == reciepeId) {
                        reciepes.splice(i, 1);
                    };
                }
                user.seller.reciepes = reciepes;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        //                        console.log("USER UPDATED" + user.seller.menu);
                        res.json(user);
                    });
            })
    }

    function updateReciepe(req, res) {
        var userId = req.params.userId;
        var updatedReciepe = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                var reciepes = user.seller.reciepes;
                for (var i = 0; i < reciepes.length; i++) {
                    if (reciepes[i]._id == updatedReciepe._id) {
                        reciepes[i] = updatedReciepe;
                    };
                }
                user.seller.reciepes = reciepes;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    });
            })
    }
};