var express = require('express');
var app = express();

var router = require('./router.js');

app.use(express.static(__dirname + '/server/public'));
app.use(express.static(__dirname + '/../client'));

app.use('/api/*', router);






















module.exports = app;