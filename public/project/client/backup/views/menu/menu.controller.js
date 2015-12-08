(function () {
    angular
        .module("FoodOrderApp")
        .controller("MenuController", MenuController);

    function MenuController($scope, $rootScope, $routeParams, UserService, $location) {
        var userInScope = $rootScope.user;
        var model = this;
        model.addToCart = addToCart;

        function findSellerById() {
            var sellerId = $routeParams.sellerId;
            UserService.findUserById(sellerId)
                .then(function (user) {
                    model.check = user;
                    model.allMenu = user.seller.menu;
                })
        }
        findSellerById();

        function addToCart(itemName, costPerItem) {
            var sellerId = $routeParams.sellerId;
            var sellerName;
            UserService.findUserById(sellerId)
                .then(function (user) {
                    sellerName = user.userName;
                })


            UserService.findUserById(userInScope._id)
                .then(function (user) {
                    var orderMade = user.buyer;
                    var newOrder = {
                        "item": itemName,
                        "nameOfSeller": sellerName,
                        "userProviding": $routeParams.sellerId,
                        "total": costPerItem,
                        "costPerItem": costPerItem,
                        "quantity": 1
                    }
                    orderMade.push(newOrder);
                    user.buyer = orderMade;

                    UserService.updateUser(user._id, user)
                        .then(function (user) {
                            findSellerById();
                            UserService.findUserById(userInScope._id)
                                .then(function (user) {
                                    var totalBill = 0;
                                    for (var i = 0; i < user.buyer.length; i++) {
                                        totalBill = totalBill + user.buyer[i].total;
                                    }
                                    console.log("TOTAL BILL" + totalBill);
                                    user.totalBill = totalBill;
                                    UserService.updateUser(user._id, user)
                                        .then(function (user) {

                                        })
                                })


                        })
                })


        }

    };
})();