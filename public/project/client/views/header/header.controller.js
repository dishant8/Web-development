(function () {
    'use strict';

    angular
    .module("FoodOrderApp")
    .controller("HeaderController", HeaderController)

    function HeaderController($scope, $location, $rootScope) {
        //        $scope.user = "notPresent";

        $scope.userInScope = $rootScope.user;
        $scope.$location = $location;
        console.log($scope.$location);


        $scope.logout = function () {
            $rootScope.user = null;
            $location.path("/home");
        };
    }


})()