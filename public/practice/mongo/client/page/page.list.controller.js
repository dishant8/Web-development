(function () {
    angular
        .module("PageEditorApp")
        .controller("PageListController", PageListController)

    function PageListController(PageService, $scope) {
        var model = this;

        model.addPage = addPage;

        function init() {
            PageService.getAllPages().then(function (pages) {
                model.pages = pages;
            })
        }
        init();

        function addPage(page) {
            PageService.addPage(page)
                .then(function (pages) {
                    model.pages = pages;
                })
        }
    }
})();