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

        function findSellerById() {
            //var userId = $routeParams.sellerId;
            //console.log(sellerId);
            UserService.findUserById(sellerId)
                .then(function (user) {
                    console.log(user.userName);
                    model.seller = user;
                    console.log(user.seller.reviews);
                    if (user.seller.reviews != null) {
                        model.reviews = user.seller.reviews;
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
            if(user._id == reviewMadeById){
            ReviewService.deleteReview(sellerId, reviewId)
                .then(function (user) {
                    model.reviews = user.seller.reviews
                })
            } else {
                alert("You have not created this review")
            }
        }
    };
})();