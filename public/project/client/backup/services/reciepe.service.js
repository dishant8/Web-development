(function () {
    angular
        .module("FoodOrderApp")
        .factory("ReciepeService", ReciepeService);

    function ReciepeService($http, $q) {
        var api = {
            createNewReciepe: createNewReciepe,
            deleteReciepe: deleteReciepe,
            updateReciepe: updateReciepe
        }
        return api;

        function createNewReciepe(userId, newReciepe) {
            var deferred = $q.defer();

            $http.post("/api/project/reciepe/" + userId, newReciepe)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReciepe(userId, reciepeId) {
            var deferred = $q.defer();
            $http.delete("/api/project/reciepe/delete/" + userId + "/" + reciepeId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateReciepe(userId, reciepe) {
            var deferred = $q.defer();
            $http.put("/api/project/reciepe/update/" + userId, reciepe)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();