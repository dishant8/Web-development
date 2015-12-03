(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("FoodCartController", FoodCartController)

    function FoodCartController($rootScope, UserService) {
        var model = this;
        var user = $rootScope.user;

        model.removeItem = removeItem;

        function findAllOrders() {
            UserService.findUserById(user._id)
                .then(function (user) {
                    console.log("FOOD CART USER" + user.buyer)
                    model.orderMade = user.buyer;
                })
        }
        findAllOrders();

        function removeItem(menuId) {
            UserService.delete
        }
    }
})();