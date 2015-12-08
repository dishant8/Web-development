(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController(UserService, $rootScope, $location) {
        var model = this;
        model.register = register;

        function register() {
            if (model.firstName && model.lastName && model.password && model.verifyPassword) {
                if (model.password == model.verifyPassword) {
                    var userObject = {
                        firstName: model.firstName,
                        lastName: model.lastName,
                        userName: model.userName,
                        password: model.password,
                        email: model.email
                    }
                    console.log(userObject);

                    UserService.createUser(userObject)
                        .then(function (user) {
                            $rootScope.user = user;
                            $location.path("/home2");
                        });
                }
                else {
                    model.dontMatch = "Password do not match";
                }
            } else {
                model.dontMatch = "Enter Required Fields"
            }
        }
    }

})();