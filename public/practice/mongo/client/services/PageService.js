(function () {
    angular
        .module("PageEditorApp")
        .factory("PageService", PageService);

    function PageService($http, $q) {
        var api = {
            getAllPages: getAllPages,
            addPage: addPage,
            getPageById: getPageById,
            addContent: addContent,
            removeContent: removeContent
        }
        return api;

        function addPage(page) {
            var deferred = $q.defer();
            $http.post("/api/practice/mongo/page", page)
                .success(function (pages) {
                    deferred.resolve(pages);
                });
            return deferred.promise;
        }

        function getAllPages() {
            var deferred = $q.defer();
            $http.get("/api/practice/mongo/page")
                .success(function (pages) {
                    deferred.resolve(pages);
                });
            return deferred.promise;
        }

        function getPageById(id) {
            var deferred = $q.defer();

            $http.get("/api/practice/mongo/page/" + id)
                .success(function (page) {
                    deferred.resolve(page);
                });
            return deferred.promise;
        }

        function removeContent(id, index) {
            $http.delete("/api/practice/mongo/page/" + id)
        }
        function addContent(pageId, contentType) {
            var deferred = $q.defer();
            $http.post("/api/practice/mongo/page/" + pageId + "/content/" + contentType)
                .success(function (page) {
                    console.log("PAGE FROM SERVICE" + page);
                    deferred.resolve(page)
                })

            return deferred.promise;
        }
    }
}
)()