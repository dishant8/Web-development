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
    },

    "location": {
        type: String,
    },

    "buyer": [{
        "id": {
            type: objectId
        },

        "item": {
            type: String
        },

        "userProviding": {
            type: String
        },

        "quantiy": {
            type: String
        },

        "costPerItem": {
            type: String
        },
    }
    ],

    "seller": {
        "menu": [{
            "item": {
                type: String,
            },
            "image": {
                data: Buffer,
                contentType: String
            },
            "costPerItem": {
                type: Number,
            }
        }],
        "recipies": {
            type: String
        },

        "orders": {
            type: String
        }


    }

}, { collection: 'cs5610.project.test_1.user' });
