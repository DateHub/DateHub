var express = require('express');
var app = express();

var httpHelper = require('./utils/httpHelper.js');
var router = require('./router.js');
var controllers = require('./controllers/indexAPI.js');
var auths = require('./auth/indexAPI.js');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../client'));

app.use('/api/*', httpHelper.ensureAuthentication, router(controllers));
app.use('/auth/*', router(auths));

module.exports = app;