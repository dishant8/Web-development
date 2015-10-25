(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);


    function ProfileController($scope, $location, UserService, $rootScope) {

        var currentUser = $rootScope.user;

        $scope.update = function () {

            var newDataOfUser = {
                userName: $scope.userName,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email

            }

            console.log(newDataOfUser);

            UserService.updateUser(currentUser.userName, newDataOfUser, function (user) {



                if (user != null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });
        }
    }

})();