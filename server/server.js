//testfile
var test = require('./models/test.js');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

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
app.use(cookieParser(config.secret));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../client'));

app.use(httpHelper.createSession(config.secret));

router(app, auths).init();
router(app, controllers).initSecured();

module.exports = app;