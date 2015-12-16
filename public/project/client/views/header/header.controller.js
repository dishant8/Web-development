(function () {
    'use strict';

    angular
    .module("FoodOrderApp")
    .controller("HeaderController", HeaderController)

    function HeaderController($scope, $location, $rootScope) {
        //        $scope.user = "notPresent";

        $scope.userInScope = $rootScope.user;
        $scope.$location = $location;


        $scope.logout = function () {
            $rootScope.user = null;
            $location.path("/home");
        };

        if ($(window).width < 768) {
            $scope.dynamicHeight = 20;
        }
        else {
            $scope.dynamicHeight = 40;
        }
        
    }


})()