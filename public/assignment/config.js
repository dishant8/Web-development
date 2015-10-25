(function () {
    angular
	.module("FormBuilderApp")
	.config(MyAppFunction)

    function MyAppFunction($routeProvider) {
        $routeProvider
		.when("/", {
		    /*templateUrl : "/assignment/home/home.view.html" */
		    redirectTo: "/home"
		})
		.when("/home", {
		    templateUrl: "home.html"
		})
		.when("/login", {
		    templateUrl: "login/login.view.html",
		    controller: "LoginController"
		})
		.when("/register", {
		    templateUrl: "register/register.view.html",
		    controller: "RegisterController"
		})
		.when("/profile", {
		    templateUrl: "profile/profile.view.html",
		    controller: "ProfileController"
		})
		.when("/form", {
		    templateUrl: "form/form.view.html",
		    controller: "FormController"
		})
            .when("/form-fields", {
                templateUrl: "form-fields.html",
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