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

        $rootScope.$on('auth', function (currentUser) {
            user = model.user = $rootScope.user;
            findAllOrders();
        });

        function findAllOrders() {
            if (user != undefined) {
                UserService.findUserById(user._id)
                    .then(function (userFormService) {
                        model.orderMade = userFormService.buyer;
                        model.totalBill = userFormService.totalBill;
                    })
            }
        }
        findAllOrders();

        function removeItem(itemId) {
            if (user != undefined) {
                FoodCartService.deleteFoodCartItem(user._id, itemId)
                    .then(function (userFormService) {
                        model.totalBill = userFormService.totalBill;
                        model.orderMade = userFormService.buyer;
                    })
            }
        }

        function updateOrder(order, quantity) {
            if (user != undefined) {
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
                    .then(function (userFormService) {
                        model.totalBill = userFormService.totalBill
                        model.orderMade = userFormService.buyer;
                    })
            }
        }
    }
})();