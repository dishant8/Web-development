(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);


    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.user = $rootScope.user;

        $scope.login = function () {
            console.log("aya");
            UserService.findUserByUsernameAndPassword($scope.userName, $scope.password, function (user) {

                if (user != null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                } else {
                    alert("UserName/Password do not exist");
                }
            });
        }
    }

})();