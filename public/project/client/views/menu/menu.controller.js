(function () {
    angular
        .module("FoodOrderApp")
        .controller("MenuController", MenuController);

    function MenuController($scope, $rootScope, $routeParams, UserService, $location) {
        var user = $rootScope.user;
        var model = this;
        model.addToCart = addToCart;

        function findSellerById() {
            var sellerId = $routeParams.sellerId;
            console.log("USER ID in MENU" + sellerId)
            UserService.findUserById(sellerId)
                .then(function (user) {
                    console.log("USER" + user.userName)
                    model.check = user;
                    model.allMenu = user.seller.menu;
                })
        }
        findSellerById();

        function addToCart(itemName, costPerItem) {
            console.log("CAME HERE");
            UserService.findUserById(user._id)
                .then(function (user) {
                    var orderMade = user.buyer;
                    var newOrder = {
                        "item": itemName,
                        "userProviding": $routeParams.sellerId,
                        "costPerItem": costPerItem
                    }
                    orderMade.push(newOrder);
                    user.buyer = orderMade;
                    UserService.updateUser(user._id, user)
                        .then(function (user) {
                            findSellerById();
                        })
                })


        }

    };
})();