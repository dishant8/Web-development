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
        "lat": {
            type: String,
        },
        "lng": {
            type: String,
        }
    },

    "totalBill": {
        type: Number
    },

    "buyer": [{
        "id": {
            type: objectId
        },

        "item": {
            type: String
        },

        "nameOfSeller": {
            type: String
        },

        "userProviding": {
            type: String
        },

        "quantity": {
            type: Number
        },

        "costPerItem": {
            type: Number
        },
        "total": {
            type: Number
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
        "reciepes": [{
            "reciepeName": {
                type: String
            },
            "reciepeDescription": {
                type: String
            }
        }],

        "reviews": [{
            "reviewMadeById": {
                type: String
            },
            "reviewMadeByName": {
                type: String
            },

            "reviewDescription": {
                type: String
            }
        }],

        "orders": {
            type: String
        }


    },

    "reviewsByMe": [{
        "reviewMadeOn": {
            type: String
        },
        "review": {
            type: String
        }

    }]

}, { collection: 'cs5610.project.user' });
