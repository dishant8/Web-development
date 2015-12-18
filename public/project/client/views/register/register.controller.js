(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController(UserService, $rootScope, $location, AuthService) {
        var model = this;
        model.register = register;
        model.user = $rootScope.user;

        function register() {
            console.log("ENTERED");
            if (model.firstName && model.lastName && model.userName && model.password && model.verifyPassword && model.email) {

                UserService.findAllUsers()
                    .then(function (users) {
                        console.log(users);
                        for (var i = 0; i < users.length; i++) {
                            if (users[i].userName == model.userName) {
                                console.log("MATCHED");
                                model.dontMatch = "UserName already exist!!!";
                                return;
                            }
                        }

                        checkForPassword();
                    })
                console.log("ENTERED HERE");
            } else {
                model.dontMatch = "Enter Required Fields"
            }
        }

        function checkForPassword() {
            if (model.password == model.verifyPassword) {
                var userObject = {
                    firstName: model.firstName,
                    lastName: model.lastName,
                    userName: model.userName,
                    password: model.password,
                    email: model.email
                }
                UserService.createUser(userObject)
                    .then(function (user) {
                        $rootScope.user = user;
                        AuthService.setUser(user._id);
                        $rootScope.$broadcast('auth', user);
                        $location.path("/userHome");
                    });
            }
            else {
                model.dontMatch = "Password do not match";
            }
        }
    }

})();