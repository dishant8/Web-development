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
        model.menuSelected = menuSelected;
        model.recipesSelected = recipesSelected;
        model.reviewsSelected = reviewsSelected;
        model.menuSelect = true;

        $rootScope.$on('auth', function (currentUser) {

            user = model.user = $rootScope.user;

        });

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
                        //console.log(user.seller.menu);
                    }

                })
        }
        findSellerById();


        //function findSellerById() {
        //    //var userId = $routeParams.sellerId;
        //    //console.log(sellerId);
        //    UserService.findUserById(sellerId)
        //        .then(function (user) {
        //            console.log("SELLERNAME" + user.userName);
        //            model.seller = user;
        //            // console.log(user.seller.reviews);
        //            model.allMenu = user.seller.menu;
        //            console.log("MENU" + user.seller.menu);
        //            if (user.seller.reviews != null) {
        //                model.reviews = user.seller.reviews;
        //                //console.log(user.seller.menu);
        //            }
        //        })
        //}
        //findSellerById();

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
            console.log("MENU TRUE");
            model.menuSelect = true;
            model.recipeSelect = false;
            model.reviewsSelect = false;
        }

        function recipesSelected() {

            console.log("recipe aya");
            model.recipeSelect = true;
            model.menuSelect = false;
            model.reviewsSelect = false;
        }

        function reviewsSelected() {
            console.log("review aya")
            model.reviewsSelect = true;
            model.recipeSelect = false;
            model.menuSelect = false;

        }

        //function updateMenuAfterAdding(index) {
        //    var sellerId = $routeParams.sellerId;
        //    UserService.findUserById(sellerId)
        //        .then(function (user) {
        //            var list = [];
        //            if (user.seller.menu != null) {
        //                for (var i = 0; i < user.seller.menu.length; i++) {
        //                    if (i == index) {
        //                        list.push(user)
        //                    }
        //                }
        //                model.allMenu = user.seller.menu;
        //            }


        //        })
        //}

        function addToCart(itemName, costPerItem, index) {
            console.log("INDEX" + index);
            if (user != undefined) {
                model.added = true;
                var sellerId = $routeParams.sellerId;
                console.log("SELLER" + sellerId)
                var sellerName;
                UserService.findUserById(sellerId)
                    .then(function (user) {
                        sellerName = user.userName;
                        console.log(sellerName);
                    })

                UserService.findUserById(user._id)
                    .then(function (user) {
                        var orderMade = user.buyer;
                        console.log("ORDER RET" + orderMade)
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
                                console.log("USER RETURN" + user.buyer.length);
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
                                                console.log(user.totalBill);
                                            })
                                    })
                            })
                    })
            }

        }
    };
})();