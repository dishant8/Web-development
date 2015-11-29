(function () {
    angular
        .module("PageEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {

        $routeProvider
            .when("/page", {
                templateUrl: "page/page.list.view.html",
                controller: "PageListController",
                controllerAs: "model"

            })
            .when("/page/:pageId/details", {
                templateUrl: "page/page.details.view.html",
                controller: "DetailsPageController",
                controllerAs: "model"

            })
        .otherwise({
            redirectTo: "/page"
        });
    }
}
)()