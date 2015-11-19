(function () {
    'use strict';

    angular
        .module("SearchEngine")
        .controller("MiniHeaderController", MiniHeaderController);

    function MiniHeaderController($scope, $location) {
        $scope.location = $location;
    }
})();