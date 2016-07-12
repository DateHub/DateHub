var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

var config;
try {
  config = require('./env/config.js').SESSION_SECRET;
} catch(error) {
  config = process.env;
}
var httpHelper = require('./utils/httpHelper.js');
var router = require('./router.js');
var controllers = require('./controllers/indexAPI.js');
var auths = require('./auth/indexAPI.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../client'));

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));

app.use('/api/*', httpHelper.ensureAuthentication, router(controllers));
app.use('/auth/*', router(auths));

app.use('/*', function(request, response) {
  response.status(404).send('404 error. Page not found.');
});

module.exports = app;