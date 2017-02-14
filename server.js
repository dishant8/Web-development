var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var q = require('q');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cs5610fall2015exmpl1');
//mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610')
//var db = mongoose.connection;

 var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';
//var connectionString = 'mongodb://heroku_pccrdld6:nch7ja4rkpq6bd2csrntrmeefm@ds139949.mlab.com:39949/heroku_pccrdld6';

if (process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var db = mongoose.connect(connectionString);

//var ipaddress = process.env.MLAB_HOST || '127.0.0.1'
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/project/client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db);
require("./public/practice/mongo/server/app.js")(app, mongoose, db);

app.listen(port);
