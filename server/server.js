var express = require('express');
var app = express();
var passport = require('passport');

var httpHelper = require('./utils/httpHelper.js');
var router = require('./router.js');
var controllers = require('./controllers/indexAPI.js');
var oAuths = require('./auth/indexAPI.js')(app, passport);

app.use(express.static(__dirname + '/server/public'));
app.use(express.static(__dirname + '/../client'));

app.use('/api/*', httpHelper.ensureAuthentication, router(controllers));
app.use('/auth/*', router(oAuths), function(request, response) {});

module.exports = app;