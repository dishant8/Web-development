(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location) {
        $scope.$location = $location;
     
    }

})();