(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("ReciepeController", ReciepeController)

    function ReciepeController($routeParams, UserService) {
        var model = this;
        var sellerId = $routeParams.sellerId;

        function showAllReciepe() {
            UserService.findUserById(sellerId)
                .then(function (user) {
                    model.seller = user;
                    console.log("RECIEPE USERNAME" + user.userName);
                    model.allRecipies = user.seller.reciepes;
                })
        }
        showAllReciepe();
    }
})();
