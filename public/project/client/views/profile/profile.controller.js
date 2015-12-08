(function () {
    'use strict';

    angular
        .module("FoodOrderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($location, UserService, $rootScope) {
        var model = this;

        model.update = update;
        var currentUser = $rootScope.user;
        function getData() {
            console.log("AYA")
            UserService.findUserById(currentUser._id)
                .then(function (user) {
                    model.userName = user.userName;
                    model.password = user.password;
                    model.firstName = user.firstName;
                    model.lastName = user.lastName;
                    model.email = user.email;
                })
        }
        getData();

        function update() {

            var newDataOfUser = {
                "userName": model.userName,
                "password": model.password,
                "firstName": model.firstName,
                "lastName": model.lastName,
                "email": model.email
            }
            console.log(currentUser._id);
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