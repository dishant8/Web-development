(function () {
    angular
        .module("FoodOrderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
        };

        return service;

        function findUserByUsernameAndPassword(p1, p2) {
            var deferred = $q.defer();

            $http.get("/api/project/user/" + p1 + "/" + p2)
                .success(function (user) {
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function (users) {

                    deferred.resolve(users);
                })
            return deferred.promise;
        }

        function findUserByUsername(userName) {
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userName)
                .success(function (user) {
                    deferred.resolve(user)
                })
            return deferred.promise;
        }
        function findUserById(userId) {
            var deferred = $q.defer();

            $http.get("/api/project/userById/" + userId)
                .success(function (user) {
                    deferred.resolve(user);
                })
            return deferred.promise;
        }

        function createUser(userObject) {
            var deferred = $q.defer();
            
            $http.post("/api/project/user", userObject)
            .success(function (user) {
                deferred.resolve(user);
            })
            return deferred.promise;
        }

        function updateUser(userId, userObject) {
            var deferred = $q.defer();

            $http.put("/api/project/user/" + userId, userObject)
                .success(function (user) {
                    deferred.resolve(user);
                })
            return deferred.promise;
        }

        function deleteUserById(userId) {

            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userId)
                .success(function (users) {
                    deferred.resolve(users)
                })
            return deferred.promise;
        }
    }

})()