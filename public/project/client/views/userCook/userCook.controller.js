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


    function UserCookController($scope, UserService, MenuService, ReciepeService, $rootScope, $location, $http) {
        var model = this;
        model.menuSelect = true;

        model.addLocation = addLocation;

        model.addToMenu = addToMenu;
        model.selectMenu = selectMenu;
        model.updateMenu = updateMenu;
        model.deleteMenu = deleteMenu;
        model.openAddMenuPop = openAddMenuPop;
        model.menuSelected = menuSelected;
        model.recipesSelected = recipesSelected;

        model.addToReciepe = addToReciepe;
        model.updateReciepe = updateReciepe;
        model.selectReciepe = selectReciepe;
        model.deleteReciepe = deleteReciepe;
        model.openAddRecipePop = openAddRecipePop;

        var usersLat;
        var usersLng;
        var myLocationLat = model.lat;
        var myLocationLong = model.lng;

        var user = $rootScope.user;

        displayMenu();
        displayReciepe();

        $rootScope.$on('auth', function (currentUser) {

            user = model.user = $rootScope.user;
            console.log("IN RELOAD" + user);
            displayMenu();
            displayReciepe();
        });
        var reciepeForUpdate;

        function displayMenu() {
            console.log("HERE" + user);
            if (user != undefined) {
                console.log("CALLED FROM TOP");
                UserService.findUserById(user._id)
                    .then(function (user) {
                        //                    console.log("PRINTTT" + user.seller.menu)
                        model.allMenu = user.seller.menu;
                    })
            }
        }

        function displayReciepe() {
            if (user != undefined) {
                UserService.findUserById(user._id).then(function (user) {

                    model.allReciepes = user.seller.reciepes;
                });
            }
        }

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

        function addLocation() {
            if (model.searchQuery == "") {
                model.where = model.lat + "," + model.lng;
            } else if (user != undefined) {
                $http.get('http://maps.google.com/maps/api/geocode/json?address=' + model.searchQuery).success(function (mapData) {
                    if (mapData.results.length != 0) {
                        model.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;

                        usersLat = mapData.results[0].geometry.location.lat;
                        usersLng = mapData.results[0].geometry.location.lng;

                        UserService.findUserById(user._id)
                            .then(function (user) {
                                var location = {
                                    "lat": usersLat,
                                    "lng": usersLng
                                }
                                user.location = location;
                                UserService.updateUser(user._id, user)
                                    .then(function (user) {

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
            if (user != undefined) {
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
                        model.itemName = "";
                        model.costPerItem = "";
                    })
            }
        }

        function deleteMenu(menuId) {
            if (user != undefined) {
                MenuService.deleteMenu(user._id, menuId)
                    .then(function (user) {
                        var check = user.seller.menu;
                        for (var i = 0; i < check.length; i++) {
                            //                        console.log("DELETED" + check[i].item);
                        }
                        model.allMenu = user.seller.menu;

                    })
            }
        }

        var menuForUpdate;
        function selectMenu(menuId, itemName, costPerItem) {
            if (user != undefined) {
                menuForUpdate = menuId;
                model.itemName = itemName;
                model.costPerItem = costPerItem;
                model.isAddMenuItem = false;
                console.log("menu");
                var menuAfterSelect = [];
                var menu = user.seller.menu;
            }
        }

        function updateMenu() {
            if (user != undefined) {
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
        }

        function openAddMenuPop() {
            model.isAddMenuItem = true;
            console.log("true");
        }

        function menuSelected() {
            $rootScope.menuSelectstatus = true;
            console.log("MENU TRUE");
            model.menuSelect = true;
            model.recipeSelect = false;

        }

        function recipesSelected() {
            $rootScope.menuSelectstatus = false;
            console.log("RECIPE SELECTED" + $rootScope.menuSelectstatus);
            model.recipeSelect = true;
            model.menuSelect = false;
        }
        //------------------------------------------------------------------------------------------------------------

        function addToReciepe() {
            if (user != undefined) {
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
                            console.log("USER" + user.seller.reciepes);
                            model.allReciepes = user.seller.reciepes;
                        })
                }
                else {
                    alert("Provide name and description for reciepe")
                }
            }
        }

        function deleteReciepe(reciepeId) {
            if (user != undefined) {
                ReciepeService.deleteReciepe(user._id, reciepeId)
                    .then(function (user) {
                        var check = user.seller.menu;
                        for (var i = 0; i < check.length; i++) {

                        }
                        model.allReciepes = user.seller.reciepes;

                    })
            }
        }

        function selectReciepe(reciepeId, reciepeName, reciepeDescription) {
            reciepeForUpdate = reciepeId;
            model.reciepeName = reciepeName;
            model.reciepeDescription = reciepeDescription;
            var reciepeAfterSelect = [];
        }

        function openAddRecipePop() {
            model.isAddRecepieItem = true;
            console.log("true");
        }

        function updateReciepe() {
            if (user != undefined) {
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
    }

})();