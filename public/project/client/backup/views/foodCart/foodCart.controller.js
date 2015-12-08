(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("FoodCartController", FoodCartController)

    function FoodCartController($rootScope, UserService, FoodCartService) {
        var model = this;
        var user = $rootScope.user;

        model.removeItem = removeItem;
        model.updateOrder = updateOrder;

        function findAllOrders() {
            UserService.findUserById(user._id)
                .then(function (user) {
                    model.orderMade = user.buyer;
                    model.totalBill = user.totalBill;
                })
        }
        findAllOrders();

        function removeItem(itemId) {
            FoodCartService.deleteFoodCartItem(user._id, itemId)
                .then(function (user) {
                    model.totalBill = user.totalBill;
                    model.orderMade = user.buyer;
                })
        }

        function updateOrder(order, quantity) {
            var total = quantity * order.costPerItem;
            console.log("ORDER--" + order.userProviding);
            console.log("QUANTITY" + quantity);
            var newOrder = {
                "_id": order._id,
                "item": order.item,
                "userProviding": order.userProviding,
                "costPerItem": order.costPerItem,
                "quantity": quantity,
                "total": total
            }
            for (var i = 0; i < user.buyer.length; i++) {
                if (user.buyer[i]._id == order._id) {
                    user.buyer[i] = newOrder;
                }
            }

            var totalBill = 0;
            for (var i = 0; i < user.buyer.length; i++) {
                totalBill = totalBill + user.buyer[i].total;
            }

            user.totalBill = totalBill;

            UserService.updateUser(user._id, user)
                .then(function (user) {
                    model.totalBill = user.totalBill
                    model.orderMade = user.buyer;
                })
        }
    }
})();