var mock = require("./user.mock.json");

var q = require("q");
module.exports = function (app) {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    }

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.deferred;

        user = null;

        for (i = 0; i < mock.length; i++) {
            if ((mock[i].userName == credentials.username)
                && (mock[i].password == credentials.password)) {
                user = mock[i];
            }
        }
        return user;
    }

    function findUserByUsername(username) {


    }
}