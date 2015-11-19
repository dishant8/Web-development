(function () {
    'use strict';

    angular
        .module("SearchEngine")
        .controller("HomeController", HomeController);


    function HomeController($scope, $location, UserService) {

        $scope.search = function (type1, type2) {
            var query = $scope.searchQuery;
            console.log(query);
            UserService.search(query, type1, type2)
                .then(function (results) {
                    $scope.notify = "value";
                    console.log("kbjladv" + results);
                    $scope.results = results;
                })
        }

    }

})();