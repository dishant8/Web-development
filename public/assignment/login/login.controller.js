(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);


    function LoginController($scope, $location, UserService, $rootScope) {


        $scope.login = function () {
            UserService.findUserByUsernameAndPassword($scope.userName, $scope.password, function (user) {

                if (user != null) {
                    $rootScope.user = user;
                    $location.path("/profile");
                }
            });
        }
    }

})();