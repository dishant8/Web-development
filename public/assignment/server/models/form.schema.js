var mongoose = require('mongoose');

objectId = mongoose.Schema.Types.ObjectId,

module.exports = mongoose.Schema({
    "title": {
        type: String
    },

    "idForUser": {
        type: String
    },

    "fields": [{
        "id": {
            type: objectId
        },

        "label": {
            type: String
        },

        "type": {
            type: String
        },

        "options": [{
            "label": String,
            "value": String,
        }],

        "palceholder": {
            type: String
        }
    }

    ]
}, { collection: 'cs5610.assignment.user' });