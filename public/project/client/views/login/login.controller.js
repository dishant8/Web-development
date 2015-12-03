(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("LoginController", LoginController);



    function LoginController($scope, $location, UserService, $rootScope) {
        $scope.user = $rootScope.user;

        $scope.login = function () {
            UserService.findUserByUsernameAndPassword($scope.userName, $scope.password)
                .then(function (user) {
                    if (user != null) {
                        $rootScope.user = user;
                        $location.path("/home2");
                    } else {
                        alert("UserName/Password do not exist");
                    }
                })
        }

        var findAllUsers = function () {

            UserService.findAllUsers()
                .then(function (users) {

                    $scope.users = users;
                })
        }
        //findAllUsers();

        $scope.check = function () {
            var id = $scope.test;
            UserService.findUserByUsername(id)
            .then(function (user) {
                $scope.data = user;
            })
        }

        $scope.deleteUserById = function (user) {
            var userId = user.id;
            console.log(userId);
            UserService.deleteUserById(userId)
            .then(function (users) {
                $scope.users = users;
            })
        }
    }

})();