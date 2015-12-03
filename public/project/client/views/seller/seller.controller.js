(function () {
    angular
        .module("FoodOrderApp")
        .controller("SellerController", SellerController);

    function SellerController($scope, $routeParams, UserService, $location) {
        $scope.$location = $location;

        function findSellerById() {
            var userId = $routeParams.sellerId;
            console.log("USER ID " + userId)
            UserService.findUserById(userId)
                .then(function (user) {
                    console.log(user);
                    $scope.seller = user;
                })
        }
        findSellerById();
    };
})();