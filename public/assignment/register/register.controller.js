(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);


    function RegisterController($scope, $location, UserService, $rootScope) {

        $scope.register = function () {

            var userObject = {
                userName: $scope.userName,
                password: $scope.password,
                email: $scope.user
          
            }

            UserService.createUser(userObject, function (user) {
                    $rootScope.user = user;
                    $location.path("/profile");
            });
        }
    }

})();