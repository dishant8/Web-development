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
                    // componentRestrictions: {}
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


    function UserbuyController($scope, UserService, $rootScope, $location, $http, NgMap) {
        var myLocationLat = $scope.lat;
        var myLocationLong = $scope.lng;
        var userInScope = $scope.user = $rootScope.user;

        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 6;

        $rootScope.$on('auth', function (user) {

            userInScope = $scope.user = $rootScope.user;

        });

        function init() {
            if ($rootScope.user) {
                $scope.user = $rootScope.user;
            }
        }

        function findAllOrders() {
            if (userInScope != undefined) {
                UserService.findUserById(userInScope._id)
                .then(function (user) {
                    $scope.orderMade = user.buyer;
                });
            }
        }

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
        }

        function showPosition(position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.where = $scope.lat + "," + $scope.lng;
            $scope.icon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            findUsersUsingLocation();
        }

        NgMap.getMap()
        .then(function (map) {
            $scope.map = map;
        });

        $scope.$on('mapInitialized', function (event, map) {
            $scope.objMapa = map;
        });

        $scope.clickEventInfo = function (event, user, location) {
            var infowindow = new google.maps.InfoWindow();
            var center = new google.maps.LatLng(location.lat, location.lng);
            infowindow.setPosition(center);

            var funcToCall = '<a href = "#/seller/' + user._id + '">' + user.firstName + '</a>';

            infowindow.setContent(funcToCall);

            infowindow.open($scope.objMapa);
        };

        $scope.hideDetail = function () {
            $scope.map.hideInfoWindow('map-event');
        };

        $scope.findForDistance = function () {
            if ($scope.distance) {
                findUsersUsingLocation();
                $scope.enterDistance = "";
            } else {
                $scope.enterDistance = "Enter a distance for Search";
            }
        }

        $scope.findSeller = function () {
            if ($scope.searchQuery != "") {
                $http.get('https://maps.google.com/maps/api/geocode/json?address=' + $scope.searchQuery).success(function (mapData) {
                    if (mapData.results.length != 0) {
                        $scope.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;

                        $scope.location = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
                        $scope.lat = mapData.results[0].geometry.location.lat;
                        $scope.lng = mapData.results[0].geometry.location.lng;
                        findUsersUsingLocation();
                    }
                    else {
                        $scope.error = "Could not find entered location";
                        $scope.showErr = true;
                    }

                }).error(function (error) {
                    $scope.error = "Could not find entered location";
                    $scope.showErr = true;
                });
            }
            else {
                $scope.where = $scope.lat + "," + $scope.lng;
                //               model.show();
            }

        }

        function findAllUsers() {
            if (userInScope != undefined) {
                UserService.findAllUsers()
                .then(function (users) {
                    var sellersList = [];
                    for (var i = 0; i < 2; i++) {
                        if (!users.length < 5) {
                            if (users[i]._id != userInScope._id) {
                                sellersList.push(users[i]);
                            }
                        }
                    }
                    $scope.sellers = sellersList;
                })
            }
        }
        findAllUsers();

        function findUsersUsingLocation() {
            if (userInScope != undefined) {
                UserService.findAllUsers()
                    .then(function (users) {
                        $scope.usersNearMe = [];
                        for (var i = 0; i < users.length; i++) {
                            if (userInScope && users[i]._id != userInScope._id) {

                                if (users[i].location != undefined) {
                                    var location = users[i].location;
                                    var distance = getDistanceFromLatLonInKm($scope.lat, $scope.lng, location.lat, location.lng);

                                    var distanceForSearch;
                                    if ($scope.distance == undefined) {
                                        distanceForSearch = 5;
                                    } else {
                                        distanceForSearch = $scope.distance;
                                    }
                                    if (distance < distanceForSearch) {
                                        $scope.usersNearMe.push(users[i]);
                                    }
                                }
                            }
                        }
                        $scope.users = $scope.usersNearMe;
                        $scope.maxSize = $scope.usersNearMe.length;

                        $scope.$watch('currentPage + numPerPage', function () {

                            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                            var end = begin + $scope.numPerPage;
                            $scope.filteredTodos = $scope.usersNearMe.slice(begin, end);
                        });
                    })
            }
        }

        $scope.controlIncrease = function () {
            if ($scope.currentPage * $scope.numPerPage < $scope.maxSize) {
                $scope.currentPage += 1;
            }
        }

        $scope.controlDecrease = function () {
            if ($scope.currentPage > 1) {

                $scope.currentPage = $scope.currentPage - 1;
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

            var distanceInMiles = d * 0.621371;

            return distanceInMiles;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

    }

})();