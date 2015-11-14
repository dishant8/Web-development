(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $location, UserService, $rootScope) {
        if ($rootScope.user != null) {

            var currentUser = $rootScope.user;

            console.log(currentUser.userName);
            $scope.userName = currentUser.userName;
            $scope.password = currentUser.password;
            $scope.email = currentUser.email;
            $scope.update = function () {

                var newDataOfUser = {
                    userName: $scope.userName,
                    password: $scope.password,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email

                }
                var newUser = null;
                UserService.updateUser(currentUser.userName, newDataOfUser, function (user) {

                    if (user != null) {
                        $location.path("/home");
                        alert("Profile Updated");
                    }
                });
                $scope.userName = currentUser.userName;
                $scope.password = currentUser.password;
                $scope.email = currentUser.email;
                $scope.firstName = currentUser.firstName;
                $scope.lastName = currentUser.lastName;
            }
        }
    }

})();