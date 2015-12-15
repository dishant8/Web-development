﻿(function () {
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


    function UserCookController($scope, UserService, MenuService, $rootScope, $location, $http) {
        var model = this;
        var user = $rootScope.user;

        model.addLocation = addLocation;

        model.addToMenu = addToMenu;
        model.selectMenu = selectMenu;
        model.updateMenu = updateMenu;
        model.deleteMenu = deleteMenu;

        model.addToReciepe = addToReciepe;
        model.updateReciepe = updateReciepe;
        model.selectReciepe = selectReciepe;
        model.deleteReciepe = deleteReciepe;


        var userInScope = $rootScope.user;
        var usersLat;
        var usersLng;
        var myLocationLat = model.lat;
        var myLocationLong = model.lng;


        var reciepeForUpdate;


        function displayMenu() {
//            debugger;
            UserService.findUserById(user._id)
                .then(function (user) {
                    console.log("PRINTTT" + user.seller.menu)
                    model.allMenu = user.seller.menu;
                })
        }

        displayMenu();


        function displayReciepe() {
            UserService.findUserById(user._id).then(function (user) {

                model.allReciepes = user.seller.reciepes;
            });
        }

        displayReciepe();

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



        function addToMenu() {
            console.log("AYAYAYAYAYYA")
            $('#addMenu').modal('show');
            var itemName = model.itemName;
            var costPerItem = model.costPerItem;
            var menu = {
                "item": itemName,
                "costPerItem": costPerItem
            }
            MenuService.createNewMenu(user._id, menu)
                .then(function (user) {
                    model.itemName = "";
                    model.costPerItem = "";
                    model.allMenu = user.seller.menu;
                })
        }

        function deleteMenu(menuId) {
            MenuService.deleteMenu(user._id, menuId)
                .then(function (user) {
                    var check = user.seller.menu;
                    for (var i = 0; i < check.length; i++) {
                        //                        console.log("DELETED" + check[i].item);
                    }
                    model.allMenu = user.seller.menu;

                })
        }

        var menuForUpdate;
        function selectMenu(menuId, itemName, costPerItem) {
            menuForUpdate = menuId;
            model.itemName = itemName;
            model.costPerItem = costPerItem;
            model.isAddMenuItem = false;
            var menuAfterSelect = [];
            var menu = user.seller.menu;

            UserService.findUserById(user._id)
                .then(function (user) {
                    menu = user.seller.menu;
                    for (var i = 0; i < menu.length; i++) {
                        if (menu[i]._id != menuId) {
                            menuAfterSelect.push(menu[i]);
                        }
                    }
                    model.allMenu = menuAfterSelect;
                })


        }

        function updateMenu() {
            var menuId = menuForUpdate;
            var menu = {
                "_id": menuId,
                "item": model.itemName,
                "costPerItem": model.costPerItem
            }

            if (model.itemName) {
                MenuService.updateMenu(user._id, menu)
                    .then(function (user) {
                        model.allMenu = user.seller.menu;
                        model.itemName = "";
                        model.costPerItem = "";
                    })
            }
            else {
                alert("Select Item to Edit");
            }
        }


        //------------------------------------------------------------------------------------------------------------

        function addToReciepe() {
            if (model.reciepeName && model.reciepeDescription) {
                var reciepeName = model.reciepeName;
                var reciepeDescription = model.reciepeDescription;
                var reciepe = {
                    "reciepeName": reciepeName,
                    "reciepeDescription": reciepeDescription
                }
                ReciepeService.createNewReciepe(user._id, reciepe)
                    .then(function (user) {
                        model.reciepeName = "";
                        model.reciepeDescription = "";
                        model.allReciepes = user.seller.reciepes;
                    })
            }
            else {
                alert("Provide name and description for reciepe")
            }
        }

        function deleteReciepe(reciepeId) {
            console.log("AYAAAA");
            ReciepeService.deleteReciepe(user._id, reciepeId)
                .then(function (user) {
                    var check = user.seller.menu;
                    for (var i = 0; i < check.length; i++) {
                        //                        console.log("DELETED" + check[i].item);
                    }
                    model.allReciepes = user.seller.reciepes;

                })
        }

        function selectReciepe(reciepeId, reciepeName, reciepeDescription) {
            console.log("RECIPE NAME" + reciepeName);
            console.log("AYAAAA");
            reciepeForUpdate = reciepeId;
            model.reciepeName = reciepeName;
            model.reciepeDescription = reciepeDescription;
            var reciepeAfterSelect = [];
            //var reciepes = user.seller.reciepes;

            UserService.findUserById(user._id)
                .then(function (user) {
                    reciepes = user.seller.reciepes;
                    for (var i = 0; i < reciepes.length; i++) {
                        if (reciepes[i]._id != reciepeId) {
                            reciepeAfterSelect.push(reciepes[i]);
                        }
                    }
                    model.allReciepes = reciepeAfterSelect;
                })
        }

        function updateReciepe() {
            var reciepeId = reciepeForUpdate;
            var reciepe = {
                "_id": reciepeId,
                "reciepeName": model.reciepeName,
                "reciepeDescription": model.reciepeDescription
            }

            if (model.reciepeName) {
                ReciepeService.updateReciepe(user._id, reciepe)
                    .then(function (user) {
                        model.allReciepes = user.seller.reciepes;
                        model.reciepeName = "";
                        model.reciepeDescription = "";
                    })
            }
            else {
                alert("Select Reciepe to Edit");
            }
        }
    }

})();