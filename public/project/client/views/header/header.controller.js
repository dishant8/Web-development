
(function () {
    'use strict';

    angular
    .module("FoodOrderApp")
    .controller("HeaderController", HeaderController)

    function HeaderController($scope, $location, $rootScope, AuthService, UserService) {
        $scope.$location = $location;

        var init = function () {
            if (AuthService.isAuth()) {
                var userId = AuthService.getUser();
                if (userId) {
                    UserService.findUserById(userId)
                    .then(function (user) {
                        $rootScope.user = user;
                        $rootScope.$broadcast('auth', user);
                    });
                };
            };
        };
        init();

        $scope.logout = function () {
            $rootScope.user = null;
            AuthService.setUser(null);
            $location.path("/home");
        };

    }

})()


