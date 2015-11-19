(function () {
    angular
        .module("SearchEngine")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var currentUsers = [{
            id: "123",
            userName: "asdf",
            password: "asdf",
            firstName: "dishant",
            lastName: "shah",
            email: "dishant@sh.com"
        }
        ];
        var courses = [
            { title: "java", seats: 25 },
            { title: "web", seats: 2 },
            { title: "c", seats: 223 }

        ]

        var service = {
            getAllCourses: getAllCourses,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            search: searchData,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
        };

        return service;

        function getAllCourses() {
            return courses;
        }

        function findUserByUsernameAndPassword(p1, p2) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + p1 + "/" + p2)
                .success(function (user) {
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function (users) {
                    deferred.resolve(users);
                })
            return deferred.promise;
        }

        function findUserByUsername(userName) {
            var deferred = $q.defer();
            $http.get("/api/search/user/" + userName)
                .success(function (user) {
                    deferred.resolve(user)
                })
            return deferred.promise;
        }
        function findUserById(id) {
            var deferred = $q.defer();
            $http.get("/api/search/user/" + id)
                .success(function (user) {
                    deferred.resolve(user);
                })
            return deferred.promise;
        }

        function searchData(query, type1, type2) {
            var deferred = $q.defer();
            $http.get("/api/search/" + query + "/" + type1 + "/" + type2)
            .success(function (results) {
                console.log(results);
                deferred.resolve(results);
            })
            return deferred.promise;
        }

        function createUser(userObject) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", userObject)
            .success(function (user) {
                deferred.resolve(user);
            })
            return deferred.promise;
        }

        function updateUser(id, userObject) {
            var deferred = $q.defer();

            $http.put("/api/assignment/user/" + id, userObject)
                .success(function (user) {

                    deferred.resolve(user);
                })
            return deferred.promise;
        }

        function deleteUserById(userId) {

            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userId)
                .success(function (users) {
                    deferred.resolve(users)
                })
            return deferred.promise;
        }
    }

})()