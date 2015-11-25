(function () {
    angular
	.module("SearchEngine")
	.config(MyAppFunction)

    function MyAppFunction($routeProvider) {
        $routeProvider
		.when("/", {
		    redirectTo: "/home"
		})
		.when("/home", {
		    templateUrl: "views/home/home.view.html"
		})
		.when("/login", {
		    templateUrl: "views/login/login.view.html",
		    controller: "LoginController"
		})
		.when("/register", {
		    templateUrl: "views/register/register.view.html",
		    controller: "RegisterController"
		})
		.when("/profile", {
		    templateUrl: "views/profile/profile.view.html",
		    controller: "ProfileController"
		})
        .otherwise({
            redirectTo: "/"
        })
    };
})();