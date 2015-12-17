(function () {
    angular
        .module("PageEditorApp")
        .controller("PageListController", PageListController)

    function PageListController(PageService, $scope) {
        var model = this;

        model.addPage = addPage;

        function init() {
            PageService.getAllPages()
                .then(function (pages) {
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


'use strict';
(function () {
    angular
        .module("SocialApp")
        .controller("MyProfileController", MyProfileController);

    function MyProfileController(PostService, $rootScope) {
        var model = this;
        model.removePost = removePost;

        $rootScope.$on('auth', function (user) {
            init();
        });

        function init() {
            if ($rootScope.user) {
                model.user = $rootScope.user;
                model.name = $rootScope.user.firstName + " " + $rootScope.user.lastName;
                var currUser = $rootScope.user._id;
                PostService.getAllPosts(currUser)
                    .then(function (posts) {
                        model.posts = posts;
                    });
            };
        };

        init();

        function removePost(index) {
            var currUser = $rootScope.user._id;
            var index = model.posts.length - index - 1;
            PostService.removePost(currUser, model.posts[index]._id)
                .then(function (posts) {
                    model.posts = posts;
                });
        };
    };
})();