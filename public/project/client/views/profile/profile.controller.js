(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($location, UserService, $rootScope) {
        var model = this;

        model.update = update;

        var currentUser = $rootScope.user;
        console.log("first time" + currentUser);

        $rootScope.$on('auth', function (user) {
            currentUser = model.user = $rootScope.user;
            console.log("INSIDE REFRESH" + currentUser._id);
            getData();
        });

        function getData() {
            //            if (currentUser != undefined) {
            UserService.findUserById(currentUser._id)
                .then(function (user) {
                    model.userName = user.userName;
                    model.password = user.password;
                    model.firstName = user.firstName;
                    model.lastName = user.lastName;
                    model.email = user.email;
                })
            //          }
        }
        if (currentUser != undefined) {
            getData();
        }

        function update() {

            var newDataOfUser = {
                "userName": model.userName,
                "password": model.password,
                "firstName": model.firstName,
                "lastName": model.lastName,
                "email": model.email
            }
            //          console.log(currentUser._id);
            UserService.updateUser(currentUser._id, newDataOfUser)
                .then(function (userAfterUpdate) {
                    UserService.findUserById(currentUser._id)
                        .then(function (user) {
                            model.userName = userAfterUpdate.userName;
                            model.password = userAfterUpdate.password;
                            model.firstName = userAfterUpdate.firstName;
                            model.lastName = userAfterUpdate.lastName;
                            model.email = userAfterUpdate.email;
                        })
                })
            alert("Profile Updated");
        }
    }

})();