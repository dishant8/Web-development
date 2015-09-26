var express = require('express');
var app = express();

<<<<<<< HEAD
app.use(express.static(__dirname + '/public/WebDevWorkspace/Assignment1/WebContent'));
=======
app.use(express.static(__dirname + '\WebDevWorkspace\Assignment1\WebContent'));
>>>>>>> 8d2ee59a95e7d15a7afdc57e171a219a5d5f88be

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);