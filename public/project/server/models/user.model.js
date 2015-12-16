var q = require("q");
var mongoose = require("mongoose");
module.exports = function (db) {

    var UserSchema = require("./user.project.schema.js");

    var UserModelProject = mongoose.model("UserModelProject", UserSchema)

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
    }

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModelProject.findOne({ "userName": credentials.userName, "password": credentials.password }, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(userName) {
        var deferred = q.defer();
        UserModelProject.findOne({ "userName": userName }, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModelProject.findById(id, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function createUser(userObject) {
        var deferred = q.defer();
        UserModelProject.create(userObject, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModelProject.find(function (err, users) {
            //            console.log("USERS IN MODEL" + users);
            deferred.resolve(users);
        });
        return deferred.promise;
    }


    function updateUser(userId, updatedUser) {
        var deferred = q.defer();

        UserModelProject.findById(userId, function (err, user) {
            for (var prop in user) {
                if (!(typeof updatedUser[prop] == 'undefined')) {
                    user[prop] = updatedUser[prop];
                }
            }
            user.save(function (error) {
                console.log("UPDATED USER" + user.buyer)
                deferred.resolve(user);
            });

        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModelProject.remove({ _id: userId }, function (err) {
            findAllUsers().then(function (users) {
                deferred.resolve(users);
            })
        });
        return deferred.promise;
    }
}