var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var TinderHelper = require('../utils/tinderHelper.js');
var Sessions = require('../model/sessions.js');


module.exports = (function() {
  var sessionController = Object.create(template);

  sessionController.path = '/api/sessions';

  sessionController.methods.get = function(request, response) {
    
  };

  sessionController.methods.post = function(request, response) {

  };

  return sessionController;
})();
