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
		    templateUrl: "views/home/home.view.html"
		})
         .when("/home2", {
             templateUrl: "views/home/home2.view.html"
         })
		.when("/login", {
		    templateUrl: "views/login/login.view.html",

		})
		.when("/register", {
		    templateUrl: "views/register/register.view.html",

		})
        .when("/orderHistory", {
            templateUrl: "views/orderHistory/orderHistory.view.html",

        })
        .when("/userHome", {
            templateUrl: "views/userHome/userHome.view.html",

        })
        .when("/seller/:sellerId", {
            templateUrl: "views/seller/seller.view.html",
        })
        .when("/cook", {
            templateUrl: "views/userCook/userCook.view.html",
        })
        .when("/userAsCook/menu", {
            templateUrl: "views/menu/menu.view.profile.html",
        })
        .when("/seller/menu/:sellerId", {
            templateUrl: "views/menu/menu.view.html",
            controller: "MenuController",
            controllerAs: "model"
        })
        .when("/reciepe", {
            templateUrl: "views/reciepe/reciepe.view.html",

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