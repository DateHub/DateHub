var tinder = require('./tinder.js');
module.exports = (function() {
  var auths = [
    tinder
  ];
  var router = {};
  auths.forEach(function(auth) {
    router[auth.path] = auth.methods;
    if(auth.callback && auth.callback.length > 0) {
      router[auth.callback] = auth.callbackMethods;
    }
  });
  return router; 
})();