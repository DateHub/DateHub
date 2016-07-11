var template = require('./controller.template.js');

module.exports = (function() {
  var dateControllers = Object.create(template);

  dateControllers.path = '/api/dates';

  dateControllers.methods.get = function(request, response) {

  };

  dateControllers.methods.post = function(request, response) {

  };

  return dateControllers;
})();