module.exports = function (app, userModel) {

    app.delete("/api/project/user/foodCart/:userId/:itemId", deleteItem);

    function deleteItem(req, res) {
        var itemId = req.params.itemId;
        var userId = req.params.userId;
        var removeCostFromTotal;
        userModel.findUserById(userId)
            .then(function (user) {
                var buyerList = user.buyer;
                for (i = 0; i < buyerList.length; i++) {
                    if (buyerList[i]._id == itemId) {
                        removeCostFromTotal = buyerList[i].total;
                        buyerList.splice(i, 1);
                    }
                }
                user.buyer = buyerList;
                user.totalBill = user.totalBill - removeCostFromTotal;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    })

            })
    }
};