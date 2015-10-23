(function () {

    angular.module("WhiteBoardApp", []);

    angular.module("WhiteBoardApp")
    .controller("HelloWorldController", HelloWorldController);

    function HelloWorldController($scope) {
        $scope.removeCourse = function (courseInstance) {
            var index = $scope.courses.indexOf(courseInstance);

            $scope.courses.splice(index, 1);

        }
        $scope.hello = "Hello World";
        $scope.courseName = "Java101";

        $scope.user = {
            fname: "alice",
            lname: "wonderkland"
        };

        var course = { title: "C# 101", seats: 25, starts: new Date() };
        console.log = ("hellowworld!!");

        var courses = [
            course,
            { title: "python", seats: 12, starts: new Date() },
            { title: "python", seats: 12, starts: new Date() },
        ]
        $scope.courses = courses;

    }
})();