var tinder = require('./auth.tinder.js');
module.exports = (function() {
  var auths = [
    tinder
  ];
  var router = {};
  auths.forEach(function(auth) {
    router[auth.path] = auth.router;
    if(auth.callback && auth.callback.length > 0) {
      router[auth.callback] = auth.callbackRouter;
    }
  });
  return router; 
})();