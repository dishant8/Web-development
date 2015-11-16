(function () {
    angular
	.module("FormBuilderApp")
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
		.when("/form", {
		    templateUrl: "views/form/form.view.html",
		    controller: "FormController"
		})
            .when("/form-fields", {
                templateUrl: "views/form-fields/form-fields.view.html",
                controller: "FormController"
            })

		.when("/admin", {
		    templateUrl: "admin.html"
		})
        .otherwise({
		    redirectTo: "/"
		})
    };
})();