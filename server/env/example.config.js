module.exports = (function() {
  var session = {
    secret: 'ENTER ANY RANDOM STRING HERE'
  };
  var facebook = {
    clientID: 'ENTER CLIENT KEY HERE',
    clientSecret: 'ENTER CLIENT SECRET HERE',
    callbackURL: "/auth/facebook/callback"
  };

  return {
    FACEBOOK_KEYS: facebook,
    SESSION_SECRET: session
  };
})();