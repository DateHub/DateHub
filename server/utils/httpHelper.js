var request = require('request');
module.exports = (function(){
  return {
    send404: function(response, message) {
      response.status(404).send(message);
    },
    ensureAuthentication: function(request, response, next) {
      if(request.isAuthenticated()) {
        return next();
      }
      response.redirect('/login');
    }
  };
})();