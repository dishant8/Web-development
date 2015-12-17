'use strict';
(function () {
    angular
        .module("FoodOrderApp")
        .service("AuthService", ['$cookies', '$cookieStore', AuthService]);

    function AuthService($cookies, $cookieStore) {

        var authService = {
            isAuth: isAuth,
            getUser: getUser,
            setUser: setUser
        };

        return authService;

        function isAuth() {
            if (authService.token == null) {
                authService.token = $cookieStore.get('token');
            }
            return (authService.token != null);
        }

        function getUser() {
            return authService.token;
        }

        function setUser(token) {
            authService.token = token;
            if (!authService.token) {
                authService.token = $cookieStore.remove("token");
            } else {
                $cookieStore.put('token', authService.token);
            }
        }
    }
})();