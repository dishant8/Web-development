(function () {
    angular
        .module("FoodOrderApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {
        var api = {
            createNewReview: createNewReview,
            deleteReview: deleteReview,
        }
        return api;

        function createNewReview(userId, newReview) {
            var deferred = $q.defer();

            $http.post("/api/project/review/" + userId, newReview)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReview(userId, reviewId) {
            var deferred = $q.defer();
            $http.delete("/api/project/review/delete/" + userId + "/" + reviewId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
})();