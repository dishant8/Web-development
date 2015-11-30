var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "userName": {
        type: String
    },

    "password": {
        type: String
    },

    "firstName": {
        type: String,
    },

    "lastName": {
        type: String,
    },

    "email": {
        type: String,
    }

}, { collection: 'cs5610.assignment.user' });
