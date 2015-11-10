(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($scope, UserService, $rootScope, $location) {

        $scope.courses = UserService.getAllCourses();

        $scope.register = function () {

            var userObject = {
                userName: $scope.userName,
                password: $scope.password,
                email: $scope.email
            }
            console.log(userObject);
            UserService.createUser(userObject, function (user) {

                $rootScope.user = user;
                console.log(UserService.currentUsers);
                $location.path("/userHome");
            });

        }
    }

})();