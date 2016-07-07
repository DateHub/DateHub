var template = require('./auth.template.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var config;
try {
  config = require('../env/config.js').FACEBOOK_KEYS;
} catch(error) {
  config = process.env;
}

module.exports = (function() {
  return {
    createAuth: function(passport) {
      passport.use(new FacebookStrategy({
          clientID: config.clientID,
          clientSecret: config.clientSecret,
          callbackURL: config.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
          profile.accessToken = accessToken;
          process.nextTick(function () {
            return done(null, profile);
          });
        }
      ));

      var facebook = Object.create(template);
      facebook.path = '/auth/facebook';
      facebook.callback = '/auth/facebook/callback';

      facebook.methods.get = function(request, response, next) {
        var method = passport.authenticate('facebook');
        return method(request, response, next);
      };

      facebook.callbackMethods.get = function(request, response, next) {
        var method = passport.authenticate('facebook', { 
          failureRedirect: '/login',
          successRedirect: '/' 
        });
        return method(request, response, next);
      };
      return facebook;
    }
  };
})();