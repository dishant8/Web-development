(function () {
    'use strict';
    angular
        .module("SearchEngine")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location) {
        $scope.$location = $location;
     
    }

})();