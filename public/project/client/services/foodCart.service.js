(function () {
    angular
        .module("FoodOrderApp")
        .factory("FoodCartService", FoodCartService);

    function FoodCartService($http, $q) {
        var api = {
            deleteFoodCartItem: deleteFoodCartItem,
        }

        return api;

        function deleteFoodCartItem(userId, itemId) {
            var deferred = $q.defer();
            $http.delete("/api/project/user/foodcart/" + userId + "/" + itemId)
                .success(function (user) {
                    deferred.resolve(user);
                })
            return deferred.promise;
        }
    }
})();