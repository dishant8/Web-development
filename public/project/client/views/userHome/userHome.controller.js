(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("UserbuyController", UserbuyController)
        .directive('googleplace', function () {
            return {

                require: 'ngModel',
                link: function (scope, element, attrs, model) {
                    var options = {
                        types: [],
                        componentRestrictions: {}
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                    google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                        scope.$apply(function () {
                            model.$setViewValue(element.val());
                        });
                    });
                }
            };
        });


    function UserbuyController($scope, UserService, $rootScope, $location, $http) {

        function init() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }
        init();

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }

        function showPosition(position) {
            console.log("position" + position)
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.where = $scope.lat + "," + $scope.lng;
        }

        //$scope.place = "";

        $scope.findSeller = function () {
            if ($scope.searchQuery != "") {
                console.log($scope.searchQuery);
                $http.get('http://maps.google.com/maps/api/geocode/json?address=' + $scope.searchQuery).success(function (mapData) {
                    if (mapData.results.length != 0) {
                        console.log(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng);
                        // showPosition(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng);
                        $scope.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
                        console.log($scope.where);
                    }
                    else {
                        $scope.error = "Could not find entered location";
                        $scope.showErr = true;
                    }
                    //                    $scope.show();
                }).error(function (error) {
                    $scope.error = "Could not find entered location";
                    $scope.showErr = true;
                });
            }
            else {
                $scope.where = $scope.lat + "," + $scope.lng;
                //               $scope.show();
            }



        }




        function findUsersUsingLocation() {
            UserService.findAllUsers()
                .then(function (users) {
                    $scope.users = users;
                })
        }
        findUsersUsingLocation();
    }

})();