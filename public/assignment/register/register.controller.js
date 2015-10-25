(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($scope, UserService, $rootScope, $location) {

        $scope.courses = UserService.getAllCourses();

        $scope.register = function () {

            var userObject = {
                userName: $scope.userName,
                password: $scope.password,
                email: $scope.email
            }
            UserService.createUser(userObject, function (user) {

                $rootScope.user = user;
                console.log(UserService.currentUsers);
                $location.path("/profile");
            });

        }
    }

})();