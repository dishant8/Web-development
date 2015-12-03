(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("FoodCartController", FoodCartController)

    function FoodCartController($rootScope, UserService) {
        var model = this;
        var user = $rootScope.user;

        function findAllOrders() {
            UserService.findUserById(user._id)
                .then(function (user) {
                    console.log("FOOD CART USER" + user.buyer)
                    model.orderMade = user.buyer;
                })
        }
        findAllOrders();
    }
})();