module.exports = function (app, userModel) {

    app.post("/api/project/menu/:userId", createNewMenu)
    app.put("/api/project/menu/update/:userId", updateMenu);
    app.delete("/api/project/menu/delete/:userId/:menuId", deleteMenu);


    function createNewMenu(req, res) {
        var userId = req.params.userId;
        var newMenu = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                var menu = user.seller.menu;
                menu.push(newMenu);
                user.seller.menu = menu;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    });
            })
    }

    function deleteMenu(req, res) {
        var userId = req.params.userId;
        var menuId = req.params.menuId;
        userModel.findUserById(userId)
            .then(function (user) {
                var menu = user.seller.menu;
                for (var i = 0; i < menu.length; i++) {
                    if (menu[i]._id == menuId) {
                        menu.splice(i, 1);
                    };
                }
                user.seller.menu = menu;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    });
            })
    }

    function updateMenu(req, res) {
        var userId = req.params.userId;
        var updatedMenu = req.body;
        userModel.findUserById(userId)
            .then(function (user) {
                var menu = user.seller.menu;
                for (var i = 0; i < menu.length; i++) {
                    if (menu[i]._id == updatedMenu._id) {
                        menu[i] = updatedMenu;
                    };
                }
                user.seller.menu = menu;
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.json(user);
                    });
            })
    }
};