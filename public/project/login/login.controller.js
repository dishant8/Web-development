(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("LoginController", LoginController);


    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.user = $rootScope.user;

        $scope.login = function () {
            UserService.findUserByUsernameAndPassword($scope.userName, $scope.password, function (user) {

                if (user != null) {
                    $rootScope.user = user;
                    $location.path("/home2");
                } else {
                    alert("UserName/Password do not exist");
                }
            });
        }
    }

})();