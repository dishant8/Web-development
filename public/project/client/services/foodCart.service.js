(function () {
    angular
        .module("FoodOrderApp")
        .factory("FoodCartService", FoodCartService);

    function FoodCartService($http, $q) {
        var api = {
            deleteFoodCartItem: deleteFoodCartItem,
        }

        return api;

        function deleteFoodCartItem() {

        }
    }
})();