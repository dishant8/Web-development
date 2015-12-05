module.exports = function (app, userModel) {

    //    app.get("/api/project/user/:username/:password", findUser);
    //    app.get("/api/project/user", findAllUsers);
    //    app.get("/api/project/user/:username", findUserByUsername);
    //    app.get("/api/project/userById/:userId", findUserById);
    //app.post("/api/project/menu/:userId", createNewMenu)
    //app.put("/api/project/menu/update/:userId", updateMenu);
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
//                console.log("REMOVE COST FROM TOTAL" + removeCostFromTotal);
//                console.log("TOTAL BEFORE DELETE" + user.totalBill)
                user.totalBill = user.totalBill - removeCostFromTotal;
//                console.log("TOTAL AFTER DELETE" + user.totalBill)
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    })

            })
    }
};