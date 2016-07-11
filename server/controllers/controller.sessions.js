var template = require('./controller.template.js');

module.exports = (function() {
  var sessionControllers = Object.create(template);

  sessionControllers.path = '/api/sessions';

  sessionControllers.methods.get = function(request, response) {

  };

  sessionControllers.methods.post = function(request, response) {

  };

  return sessionControllers;
})();