(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($scope, UserService, $rootScope, $location) {

        $scope.register = function () {
            if ($scope.password == $scope.verifyPassword) {
                var userObject = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    userName: $scope.userName,
                    password: $scope.password,
                    email: $scope.email
                }
                console.log(userObject);

                UserService.createUser(userObject)
                    .then(function (user) {
                        $rootScope.user = user;
                        $location.path("/home2");
                    });
            }
            else {
                $scope.dontMatch = "Password do not match";
            }
        }
    }

})();