module.exports = function (app, userModel) {

    //    app.get("/api/project/user/:username/:password", findUser);
    //    app.get("/api/project/user", findAllUsers);
    //    app.get("/api/project/user/:username", findUserByUsername);
    //    app.get("/api/project/userById/:userId", findUserById);
    app.post("/api/project/review/:userId", createNewReview)
    //    app.put("/api/project/menu/update/:userId", updateMenu);
    app.delete("/api/project/review/delete/:userId/:reviewId", deleteReview);


    function createNewReview(req, res) {
        var userId = req.params.userId;
        var newReview = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                //  console.log("USER---" + user);
                var reviews = user.seller.reviews;
                //                console.log(newMenu);
                reviews.push(newReview);
                user.seller.reviews = reviews;
                //              console.log("AFTER ADDING" + user.seller.menu);
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    });
            })
    }

    function deleteReview(req, res) {
        var userId = req.params.userId;
        var reviewId = req.params.reviewId;
        userModel.findUserById(userId)
            .then(function (user) {
                var reviews = user.seller.reviews;
                for (var i = 0; i < reviews.length; i++) {
                    if (reviews[i]._id == reviewId) {
                        reviews.splice(i, 1);
                    };
                }
                user.seller.reviews = reviews;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        //                        console.log("USER UPDATED" + user.seller.menu);
                        res.json(user);
                    });
            })
    }

};