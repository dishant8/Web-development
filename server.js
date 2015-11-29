var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var q = require('q');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610fall2015exmpl1')
var db = mongoose.connection;

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



require("./public/assignment/server/app.js")(app,mongoose,db);
require("./public/practice/mongo/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);
