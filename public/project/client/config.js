(function () {
    angular
	.module("FoodOrderApp")
	.config(MyAppFunction)

    function MyAppFunction($routeProvider) {
        $routeProvider
		.when("/", {
		    redirectTo: "/home"
		})
		.when("/home", {
		    templateUrl: "views/home/home.view.html",
		    controller: "HomeViewController",
		    controllerAs: "model"
		})
         .when("/homeView", {
             templateUrl: "views/home/home.user.view.html",
             controller: "HomeUserController",
             controllerAs: "model"
         })
         .when("/profile", {
             templateUrl: "views/profile/profile.view.html",
             controller: "ProfileController",
             controllerAs: "model"
         })
         .when("/login", {
             templateUrl: "views/login/login.view.html",
             controller: "LoginController",
             controllerAs: "model"
         })
         .when("/register", {
             templateUrl: "views/register/register.view.html",
             controller: "RegisterController",
             controllerAs: "model"
         })
        .when("/userHome", {
            templateUrl: "views/userHome/userHome.view.html",
            controller: "UserbuyController",

        })
        .when("/seller/:sellerId", {
            templateUrl: "views/seller/seller.view.html",
            controller: "SellerController",
            controllerAs: "model"
        })
        .when("/cook", {
            templateUrl: "views/userCook/userCook.view.html",
            controller: "UserCookController",
            controllerAs: "model"
        })
        .when("/userAsCook/menu", {
            templateUrl: "views/menu/menu.view.profile.html",
        })

        .when("/userAsCook/reciepe", {
            templateUrl: "views/reciepe/reciepe.profile.view.html",
            controller: "ReciepeProfileController",
            controllerAs: "model"
        })
        .when("/seller/menu/:sellerId", {
            templateUrl: "views/menu/menu.view.html",
            controller: "MenuController",
            controllerAs: "model"
        })
        .when("/seller/reciepe/:sellerId", {
            templateUrl: "views/reciepe/reciepe.view.html",
            controller: "ReciepeController",
            controllerAs: "model"
        })
        .when("/foodCart", {
            templateUrl: "views/foodCart/foodCart.view.html",
            controller: "FoodCartController",
            controllerAs: "model"
        })
         .otherwise({
             redirectTo: "/"
         })
    };
})();