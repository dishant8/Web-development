(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService, $rootScope) {
        $scope.user = $rootScope.user;

        $scope.login = function () {
            UserService.findUserByUsernameAndPassword($scope.userName, $scope.password)
                .then(function (user) {
                    if (user != null) {
                        $rootScope.user = user;
                        $location.path("/profile");
                    } else {
                        alert("UserName/Password do not exist");
                    }
                })
        }
    }

})();