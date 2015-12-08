(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("HomeCheckController", HomeCheckController)

    function HomeCheckController($scope, UserService, $location, $http, NgMap) {

        //        var myLocationLat = $scope.lat;
        //        var myLocationLong = $scope.lng;
        //        var userInScope = $rootScope.user;
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
            //            console.log("position" + position)
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            console.log("-----------------" + $scope.lat);
            $scope.where = $scope.lat + "," + $scope.lng;
        }

        //NgMap.getMap()
        //    .then(function (map) {
        //        //console.log('map', map);
        //        $scope.map = map;
        //    });

        $scope.clickEventInfo = function (event, e) {
            //alert("here"+JSON.stringify(e));
            $scope.mapEvent = e;
            $scope.map.showInfoWindow('map-event');
        };

        $scope.hideDetail = function () {
            $scope.map.hideInfoWindow('map-event');
        };


        function findUsersUsingLocation() {
            UserService.findAllUsers()
                .then(function (users) {
                    var usersNearMe = [];
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].location != undefined) {
                            var location = users[i].location;
                            console.log("LOCATION LAT" + $scope.lat);
                            var distance = getDistanceFromLatLonInKm($scope.lat, $scope.lng, location.lat, location.lng);
                            var distanceForSearch;
                            if ($scope.distance == undefined) {
                                distanceForSearch = 5;
                            } else {
                                distanceForSearch = $scope.distance;
                            }
                            if (distance < distanceForSearch) {
                                usersNearMe.push(users[i]);
                            }
                        }
                    }
                    console.log(usersNearMe);
                    $scope.users = usersNearMe;
                })
        }
        findUsersUsingLocation();

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            console.log("distanceInKM" + d);
            var distanceInMiles = d * 0.621371;
            console.log(distanceInMiles);
            return distanceInMiles;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

    }

})();