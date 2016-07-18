var request = require('request');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var db = require('../db.js');
var uuid = require('uuid');
var Session = require('../models/sessions.js');

module.exports = (function(){
  return {
    send404: function(response, message) {
      response.status(404).send(message);
    },
    ensureAuthentication: function(request, response, next) {
      if(request.session && request.session.token) {
        return next();
      }
      response.redirect('/login');
    },
    createSession: function(sessionSecret) {
      var expirationTime = 60 * 60 * 1000;    // 1 hour
      return session({
        genid: function() {
          return uuid.v4();
        },
        name: 'sid',
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: expirationTime,
          expires: new Date(Date.now() + expirationTime)  // 1 hour
        },
        store: new SequelizeStore({
          db: db,
          table: 'sessions',
          checkExpirationInterval: 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
          expiration: expirationTime,        // The maximum age (in milliseconds) of a valid session.
          extendDefaultFields: function(defaults, session) {
            return {
              data: defaults.data,
              expires: defaults.expires,
              userId: session.user.id
            };
          }
        })
      });
    }
  };
})();