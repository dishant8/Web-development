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
		    templateUrl: "home/home.view.html"
		})
         .when("/home2", {
            templateUrl: "home/home2.view.html"
        })
		.when("/login", {
		    templateUrl: "login/login.view.html",

		})
		.when("/register", {
		    templateUrl: "register/register.view.html",

		})
            		.when("/orderHistory", {
            		    templateUrl: "orderHistory/orderHistory.view.html",

            		})
            .when("/userHome", {
                templateUrl: "userHome/userHome.view.html",

            })
                        .when("/supplier1", {
                            templateUrl: "supplier/supplier1.view.html",

                        })
                        .when("/supplier2", {
                            templateUrl: "supplier/supplier2.html",

                        })
             .when("/cook", {
                 templateUrl: "userCook/userCook.view.html",

             })
            		.when("/menu", {
            		    templateUrl: "menu/menu.view.html",

            		})
                        		.when("/reciepe", {
                        		    templateUrl: "reciepe/reciepe.view.html",

                        		})
		.when("/foodCart", {
		    templateUrl: "foodCart/foodCart.view.html",
		})
         .otherwise({
             redirectTo: "/"
         })
    };
})();