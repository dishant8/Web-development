(function () {

    angular
    .module("WhiteBoardApp")
    .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.html"
            })
            .when("/profile",{
                templateUrl: "profile.html"
            }).when("/profile", {
                templateUrl: "profile.html"
            }).when("/register", {
                templateUrl: "register.html"
            }).when("/login", {
                templateUrl: "login.html"
            }).when("/forms", {
                templateUrl: "forms.html"
            }).otherwise({
                redirectTo: "home.html"

            })

    }


})();
