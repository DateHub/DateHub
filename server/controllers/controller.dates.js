var template = require('./controller.template.js');

module.exports = (function() {
  var dateController = Object.create(template);

  dateController.path = '/api/dates';

  dateController.methods.get = function(request, response) {

  };

  dateController.methods.post = function(request, response) {

  };

  return dateController;
})();
