var template = require('./controller.template.js');

module.exports = (function() {
  var sessionController = Object.create(template);

  sessionController.path = '/api/sessions';

  sessionController.methods.get = function(request, response) {

  };

  sessionController.methods.post = function(request, response) {

  };

  return sessionController;
})();