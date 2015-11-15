(function () {
    angular
        .module("FormBuilderApp")
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
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            guid: guid

        };

        return service;

        function getAllCourses() {
            return courses;
        }

        function findUserByUsernameAndPassword(p1, p2) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/"+p1+"/"+p2)
                .success(function (user) {
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(userObject, callback) {

            userObject.id = guid();
            currentUsers.push(userObject);
            console.log(currentUsers);
            callback(userObject);
        }

        function deleteUserById(userId, callback) {
            for (i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].userName == userId) {
                    currentUsers.splice(i, 1);
                }
            }
            callback(currentUsers);
        }

        function updateUser(userId, userObject, callback) {
            user = null;

            for (i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].userName == userId) {

                    currentUsers[i].userName = userObject.userName;
                    currentUsers[i].password = userObject.password;
                    currentUsers[i].firstName = userObject.firstName;
                    currentUsers[i].lastName = userObject.lastName;
                    currentUsers[i].email == userObject.email;
                    user = currentUsers[i];
                }
            }
            callback(user);
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

    }

})()