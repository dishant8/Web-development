(function () {
    angular
        .module("FoodOrderApp", ["ngRoute", 'ngMap'])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.html"
            })
    };

})();