(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("HomeViewController", HomeViewController)

    function HomeViewController($scope, UserService) {
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
        }

        function showPosition(position) {
            model.lat = position.coords.latitude;
            model.lng = position.coords.longitude;
            model.where = model.lat + "," + model.lng;
            findUsersUsingLocation();
        }

        function findUsersUsingLocation() {

            UserService.findAllUsers()
                .then(function (users) {
                    var usersNearMe = [];
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].location != undefined) {
                            var location = users[i].location;
                            var distance = getDistanceFromLatLonInKm(model.lat, model.lng, location.lat, location.lng);
                            var distanceForSearch;
                            if (model.distance == undefined) {
                                distanceForSearch = 5;
                            } else {
                                distanceForSearch = model.distance;
                            }
                            if (distance < distanceForSearch) {
                                usersNearMe.push(users[i]);
                            }

                        }
                    }
                    model.users = usersNearMe;
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
            var distanceInMiles = d * 0.621371;
            return distanceInMiles;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }
    }
})();