(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("UserbuyController", UserbuyController);


    function UserbuyController($scope, UserService, $rootScope, $location) {

        $scope.courses = UserService.getAllCourses();

        $scope.findSeller = function () {

            console.log(userObject);
            UserService.createUser(userObject, function (user) {

                $rootScope.user = user;
                console.log(UserService.currentUsers);
                $location.path("/userHome");
            });

        }
    }

})();