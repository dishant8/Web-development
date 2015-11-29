
var q = require("q");
var mongoose = require("mongoose");
module.exports = function (db) {

    var UserSchema = require("./user.schema.js");

    var UserModel = mongoose.model("UserModel", UserSchema)

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
        UserModel.findOne({ "userName": credentials.userName, "password": credentials.password }, function (err, user) {
            console.log("USER" + user);
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({ "userName": credentials.userName }, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function createUser(userObject) {
        var deferred = q.defer();
        UserModel.create(userObject, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }


    function updateUser(userId, updatedUser) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            for (var prop in user) {
                if (!(typeof updatedUser[prop] == 'undefined')) {
                    user[prop] = updatedUser[prop];
                }
            }
            user.save(function (error) {
                deferred.resolve(user);

            });

        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({ _id: userId }, function (err) {
            findAllUsers().then(function (users) {
                deferred.resolve(users);
            })
        });
        return deferred.promise;
    }


}