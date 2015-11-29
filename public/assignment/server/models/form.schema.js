var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    "title": {
        type: String
    },

    "idForUser": {
        type: String
    },

    "fields": [{
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
}, { collection: 'test.forms3' });