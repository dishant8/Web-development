(function () {
    angular
        .module("FoodOrderApp")
        .controller("SellerController", SellerController);

    function SellerController($rootScope, $routeParams, UserService, ReviewService, $location) {
        //$scope.$location = $location;
        var user = $rootScope.user;
        var sellerId = $routeParams.sellerId;
        var model = this;
        model.addToReview = addToReview;
        model.deleteReview = deleteReview;
        model.addToCart = addToCart;

        function findSellerById() {
            //var userId = $routeParams.sellerId;
            //console.log(sellerId);
            UserService.findUserById(sellerId)
                .then(function (user) {
                    console.log(user.userName);
                    model.seller = user;
                    console.log(user.seller.reviews);
                    model.allMenu = user.seller.menu;
                    if (user.seller.reviews != null) {
                        model.reviews = user.seller.reviews;
                        console.log(user.seller.menu);
                    }
                })
        }
        findSellerById();

        function addToReview() {
            var reviewMadeBy = user._id;
            if (model.reviewDescription) {
                var reviewDescription = model.reviewDescription;
                var newReview = {
                    "reviewMadeById": reviewMadeBy,
                    "reviewMadeByName": user.userName,
                    "reviewDescription": reviewDescription
                }

                ReviewService.createNewReview(sellerId, newReview)
                    .then(function (user) {
                        model.reviews = user.seller.reviews;
                        model.reviewDescription = "";
                    })
            } else {
                alert("Provide a review");
            }
        }

        function deleteReview(reviewId, reviewMadeById) {
            if (user._id == reviewMadeById) {
                ReviewService.deleteReview(sellerId, reviewId)
                    .then(function (user) {
                        model.reviews = user.seller.reviews
                    })
            } else {
                alert("You have not created this review")
            }
        }

        function addToCart(itemName, costPerItem) {
            var sellerId = $routeParams.sellerId;
            var sellerName;
            UserService.findUserById(sellerId)
                .then(function (user) {
                    sellerName = user.userName;
                })

            UserService.findUserById(user._id)
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
                            findSellerById(user._id);
                            UserService.findUserById(user._id)
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