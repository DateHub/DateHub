var facebookAuth = require('./facebook.js');
var session = require('express-session');
var config;
try {
  config = require('../env/config.js').SESSION_SECRET;
} catch(error) {
  config = process.env;
}

module.exports = function(app, passport) {
  var auths, router;
  
  app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  var storage = {};

  // serialize and deserialize
  passport.serializeUser(function(user, done) {
    storage[user.id] = user;
    done(null, user.id);
  });
  passport.deserializeUser(function(userId, done) {
    done(null, storage[userId]);
  });

  auths = [
    facebookAuth.createAuth(passport)
  ];
  router = {};
  auths.forEach(function(auth) {
    router[auth.path] = auth.methods;
    router[auth.callback] = auth.callbackMethods;
  });
  return router; 
};