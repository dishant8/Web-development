(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService, $rootScope) {
        //$scope.user = $rootScope.user;
        var model = this;
        model.login = login;
        model.deleteUserById = deleteUserById;

        function login() {
            UserService.findUserByUsernameAndPassword(model.userName, model.password)
                .then(function (user) {
                    if (user != null) {
                        $rootScope.user = user;
                        console.log(user.userName);
                        model.user = $rootScope.user;
                        $location.path("/userHome");
                    } else {
                        alert("UserName/Password do not exist");
                    }
                })
        }

        var findAllUsers = function () {

            UserService.findAllUsers()
                .then(function (users) {

                    model.users = users;
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

        function deleteUserById(user) {
            var userId = user.id;
            UserService.deleteUserById(userId)
            .then(function (users) {
                model.users = users;
            })
        }
    }

})();