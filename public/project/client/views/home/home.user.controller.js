(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("HomeUserController", HomeUserController);


    function HomeUserController($scope, UserService, $rootScope, $location) {
        var model = this;

        function init() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
                model.error = "Geolocation is not supported by this browser.";
            }
        }
        init();
        findUsersUsingLocation();

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    model.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    model.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    model.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    model.error = "An unknown error occurred."
                    break;
            }
            model.$apply();
        }

        function showPosition(position) {
            //            console.log("position" + position)
            model.lat = position.coords.latitude;
            model.lng = position.coords.longitude;
            model.where = model.lat + "," + model.lng;
        }

        function findUsersUsingLocation() {
            UserService.findAllUsers()
                .then(function (users) {
                    var usersNearMe = [];
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].location != undefined) {
                            var location = users[i].location;
                            console.log("LOCATION--" + location.lat);

                            console.log("LOCATION--" + users[i].userName);
                            console.log("LOCATION LAT--" + model.lat);
                            console.log("LOCATION LNG--" + model.lng);

                            var distance = getDistanceFromLatLonInKm(model.lat, model.lng, location.lat, location.lng);
                            console.log("DISTANCE--" + distance);
                            console.log("THIS IS DISTANCE" + model.distance);
                            var distanceForSearch;
                            if (model.distance == undefined) {
                                distanceForSearch = 10;
                            } else {
                                distanceForSearch = model.distance;
                            }
                            if (distance < distanceForSearch) {
                                console.log("YES DISTANCE IS LESS")
                                usersNearMe.push(users[i]);
                            }

                        }
                    }
                    console.log(usersNearMe);
                    $scope.users = usersNearMe;
                })
        }

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