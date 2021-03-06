﻿(function () {
    angular
        .module("FoodOrderApp")
        .controller("SellerController", SellerController);

    function SellerController($rootScope, $routeParams, UserService, ReviewService, $location) {
        $rootScope.$on('auth', function (currentUser) {

            user = model.user = $rootScope.user;

        });
        var model = this;
        model.user = $rootScope.user;
        var user = $rootScope.user;
        var sellerId = $routeParams.sellerId;
        model.addToReview = addToReview;
        model.deleteReview = deleteReview;
        model.addToCart = addToCart;
        model.menuSelected = menuSelected;
        model.recipesSelected = recipesSelected;
        model.reviewsSelected = reviewsSelected;
        model.menuSelect = true;


        function findSellerById() {
            var sellerId = $routeParams.sellerId;
            UserService.findUserById(sellerId)
                .then(function (user) {
                    model.check = user;
                    model.seller = user;

                    if (user.seller.menu != null) {

                        model.allMenu = user.seller.menu;
                    }

                    if (user.seller.reciepes != null) {

                        model.allReciepes = user.seller.reciepes;
                    }

                    if (user.seller.reviews != null) {

                        model.reviews = user.seller.reviews;
                    }

                })
        }
        findSellerById();

        function addToReview() {
            if (user != undefined) {
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
        }

        function deleteReview(reviewId, reviewMadeById) {
            if (user != undefined) {
                if (user._id == reviewMadeById) {
                    ReviewService.deleteReview(sellerId, reviewId)
                        .then(function (user) {
                            model.reviews = user.seller.reviews
                        })
                } else {
                    alert("You have not created this review")
                }
            }
        }

        function menuSelected() {
            model.menuSelect = true;
            model.recipeSelect = false;
            model.reviewsSelect = false;
        }

        function recipesSelected() {
            model.recipeSelect = true;
            model.menuSelect = false;
            model.reviewsSelect = false;
        }

        function reviewsSelected() {
            model.reviewsSelect = true;
            model.recipeSelect = false;
            model.menuSelect = false;

        }


        function addToCart(itemName, costPerItem, index) {
            if (user != undefined) {
                model.added = true;
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
                                findSellerById();
                                UserService.findUserById(user._id)
                                    .then(function (user) {
                                        var totalBill = 0;
                                        for (var i = 0; i < user.buyer.length; i++) {
                                            totalBill = totalBill + user.buyer[i].total;
                                        }
                                        user.totalBill = totalBill;
                                        UserService.updateUser(user._id, user)
                                            .then(function (user) {

                                            })
                                    })
                            })
                    })
            }

        }
    };
})();