var mock = require("./user.mock.json");

var q = require("q");
module.exports = function (app) {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        searchData: searchData,
        createUser: createUser,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        guid: guid
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
        for (i = 0; i < mock.length; i++) {
            if (mock[i].userName == username) {
                user = mock[i];
            }
        }
        return user;
    }

    function findUserById(id) {
        for (i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                user = mock[i];
            }
        }
        return user;
    }

    function searchData(query, type1, type2) {
        var results = [
            {
                title: "Boston Redevelopment Authority: Home",
                url: "www.bostonredevelopmentauthority.org/",
                snippet: "Boston Redevelopment Authority The BRA is the urban planning and economic development agency for the City of Boston."
            },
                    {
                        title: "Boston Redevelopment Authority - Wikipedia, the free ...",
                        url: "https://en.wikipedia.org/wiki/Boston_Redevelopment_Authority",
                        snippet: "The Boston Redevelopment Authority (BRA) is the municipal planning and development agency for Boston, working on both housing and commercial ..."
                    },
                    {
                        title: "Boston Redevelopment Authority: Walsh nominates 2 to ...",
                        url: "https://www.bostonglobe.com/business/.../story.html",
                        snippet: "The Boston Globe Jul 20, 2015 - Mayor Martin J. Walsh is continuing to re-make the Boston Redevelopment Authority, announcing Monday that he will replace two longtime ..."
                    }
        ]
        return results;

    }

    function createUser(userObject) {
        userObject.id = guid();
        mock.push(userObject);
        return userObject;
    }

    function findAllUsers() {
        var users = mock;
        return users;
    }

    function updateUser(id, user) {
        for (i = 0; i < mock.length; i++) {
            console.log(mock[i].id);
            if (mock[i].id == id) {
                mock[i].userName = user.userName;
                mock[i].password = user.password;
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].email == user.email;
                newUser = mock[i];
                return newUser;
            }
        }
    }

    function deleteUserById(id) {

        for (i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                mock.splice(i, 1);
            }
        }
        return mock;
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