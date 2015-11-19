(function () {
    angular
        .module("SearchEngine", ["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl : "home.html"
            })
            .when("/profile", {
                templateUrl : "profile.html"
            }).when("/admin", {
                templateUrl: "admin.html"
            }).when("/register", {
                templateUrl : "register.html"
            }).when("/login", {
                templateUrl : "login.html"
            }).when("/forms", {
                templateUrl : "forms.html"
            }).when("/form-fields", {
                templateUrl : "form-fields.html"
            }).otherwise({
                redirectTo: "/home"

            })

    };

})();