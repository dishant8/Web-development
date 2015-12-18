module.exports = function (app, userModel) {

    app.post("/api/project/review/:userId", createNewReview);
    app.delete("/api/project/review/delete/:userId/:reviewId", deleteReview);


    function createNewReview(req, res) {
        var userId = req.params.userId;
        var newReview = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                var reviews = user.seller.reviews;
                reviews.push(newReview);
                user.seller.reviews = reviews;
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
                        res.json(user);
                    });
            })
    }

};