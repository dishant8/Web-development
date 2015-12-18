(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope, AuthService) {
        var model = this;
        model.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(model.userName, model.password)
                .then(function (user) {
                    if (user != null) {
                        $rootScope.user = user;
                        AuthService.setUser(user._id);
                        $rootScope.$broadcast('auth', user);
                        model.user = $rootScope.user;
                        $location.path("/userHome");
                    } else {
                        alert("UserName/Password do not exist");
                    }
                })
        }

        var findAllUsers = function () {

            UserService.findAllUsers()
                .then(function (users) {

                    model.users = users;
                })
        }
        //findAllUsers();

    }

})();