(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);


    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.login = function () {

            UserService.findUserByUsernameAndPassword($scope.userName, $scope.passowrd, function (user) {
                if (user != null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });
        }
    }

})();