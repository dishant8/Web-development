(function () {
    angular
        .module("FoodOrderApp")
        .controller("MenuProfileController", MenuProfileController);

    function MenuProfileController($scope, $routeParams, MenuService, UserService, $location, $rootScope) {
        var user = $rootScope.user;

        var menuForUpdate;

        function displayMenu() {
            UserService.findUserById(user._id)
                .then(function (user) {
                    $scope.allMenu = user.seller.menu;
                })
        }

        displayMenu();

        $scope.addToMenu = function () {
            var itemName = $scope.itemName;
            var costPerItem = $scope.costPerItem;
            var menu = {
                "item": itemName,
                "costPerItem": costPerItem
            }
            MenuService.createNewMenu(user._id, menu)
                .then(function (user) {
                    $scope.itemName = "";
                    $scope.costPerItem = "";
                    $scope.allMenu = user.seller.menu;
                })
        }

        $scope.deleteMenu = function (menuId) {
            MenuService.deleteMenu(user._id, menuId)
                .then(function (user) {
                    var check = user.seller.menu;
                    for (var i = 0; i < check.length; i++) {
                        //                        console.log("DELETED" + check[i].item);
                    }
                    $scope.allMenu = user.seller.menu;

                })
        }

        $scope.selectMenu = function (menuId, itemName, costPerItem) {
            menuForUpdate = menuId;
            $scope.itemName = itemName;
            $scope.costPerItem = costPerItem;
            var menuAfterSelect = [];
            var menu = user.seller.menu;

            UserService.findUserById(user._id)
                .then(function (user) {
                    menu = user.seller.menu;
                    for (var i = 0; i < menu.length; i++) {
                        if (menu[i]._id != menuId) {
                            menuAfterSelect.push(menu[i]);
                        }
                    }
                    $scope.allMenu = menuAfterSelect;
                })


        }

        $scope.updateMenu = function () {
            var menuId = menuForUpdate;
            var menu = {
                "_id": menuId,
                "item": $scope.itemName,
                "costPerItem": $scope.costPerItem
            }

            if ($scope.itemName) {
                MenuService.updateMenu(user._id, menu)
                    .then(function (user) {
                        $scope.allMenu = user.seller.menu;
                        $scope.itemName = "";
                        $scope.costPerItem = "";
                    })
            }
            else {
                alert("Select Item to Edit");
            }
        }
    }
})();