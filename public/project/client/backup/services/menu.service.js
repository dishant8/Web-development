(function () {
    angular
        .module("FoodOrderApp")
        .factory("MenuService", MenuService);

    function MenuService($http, $q) {
        var api = {
            createNewMenu: createNewMenu,
            deleteMenu: deleteMenu,
            updateMenu: updateMenu
        }
        return api;

        function createNewMenu(userId, newMenu) {
            var deferred = $q.defer();

            $http.post("/api/project/menu/" + userId, newMenu)
                .success(function (response) {

                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteMenu(userId, menuId) {
            var deferred = $q.defer();
            $http.delete("/api/project/menu/delete/" + userId + "/" + menuId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateMenu(userId, menu) {
            var deferred = $q.defer();
            $http.put("/api/project/menu/update/" + userId, menu)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();