(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $location, UserService, $rootScope) {
        if ($rootScope.user != null) {

            var currentUser = $rootScope.user;
            $scope.userName = currentUser.userName;
            $scope.password = currentUser.password;
            $scope.firstName = currentUser.firstName;
            $scope.lastName = currentUser.lastName;
            $scope.email = currentUser.email;

            $scope.update = function () {

                var newDataOfUser = {
                    userName: $scope.userName,
                    password: $scope.password,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email
                }
                console.log(currentUser._id);
                UserService.updateUser(currentUser._id, newDataOfUser)
                    .then(function (userAfterUpdate) {

                        //                        $location.path("/home");
                        $scope.userName = newDataOfUser.userName;
                        $scope.password = newDataOfUser.password;
                        $scope.email = newDataOfUser.email;
                        $scope.firstName = newDataOfUser.firstName;
                        $scope.lastName = newDataOfUser.lastName;
                        alert("Profile Updated");

                    })
            }
        }
    }

})();