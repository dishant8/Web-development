(function () {
    'use strict';
    angular
        .module("FoodOrderApp")
        .controller("UserCookController", UserCookController)
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


    function UserCookController(UserService, $rootScope, $location, $http) {
        var model = this;
        model.addLocation = addLocation;
        var userInScope = $rootScope.user;
        var usersLat;
        var usersLng;
        var myLocationLat = model.lat;
        var myLocationLong = model.lng;
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
            model.$apply();
        }

        function showPosition(position) {
            //            console.log("position" + position)
            model.lat = position.coords.latitude;
            model.lng = position.coords.longitude;

            model.where = model.lat + "," + model.lng;
        }

        //$scope.place = "";

        function addLocation() {
            if (model.searchQuery != "") {
                $http.get('http://maps.google.com/maps/api/geocode/json?address=' + model.searchQuery).success(function (mapData) {
                    if (mapData.results.length != 0) {
                        //                        console.log(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng);
                        // showPosition(mapData.results[0].geometry.location.lat, mapData.results[0].geometry.location.lng);
                        model.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
                        //                        console.log($scope.where);

                        usersLat = mapData.results[0].geometry.location.lat;
                        usersLng = mapData.results[0].geometry.location.lng;

                        UserService.findUserById(userInScope._id)
                            .then(function (user) {
                                var location = {
                                    "lat": usersLat,
                                    "lng": usersLng
                                }
                                user.location = location;
                                UserService.updateUser(userInScope._id, user)
                                    .then(function (user) {
                                        console.log("USERS LOCATION" + user.location.lat);
                                        console.log("USERS LOCATION" + user.location.lng);
                                    })
                            })
                    }
                    else {
                        model.error = "Could not find entered location";
                        model.showErr = true;
                    }
                    //                    $scope.show();
                }).error(function (error) {
                    model.error = "Could not find entered location";
                    model.showErr = true;
                });
            }
            else {
                model.where = model.lat + "," + model.lng;
                //               $scope.show();
            }

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
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        //        findUsersUsingLocation();
    }

})();