(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $location, UserService, $rootScope) {
        if ($rootScope.user != null) {
            $scope.user = $rootScope.user;

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
                        newUser = null;
                        $location.path("/home");
                        alert("Profile Updated");
                    }
                });
                $scope.userName = newUser.userName;
                $scope.password = newUser.password;
                $scope.email = newUser.email;
                $scope.firstName = newUser.firstName;
                $scope.lastName = newUser.lastName;
            }
        }
    }

})();