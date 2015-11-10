(function () {
    angular
        .module("FoodOrderApp", ["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.html"
            })
    };

})();