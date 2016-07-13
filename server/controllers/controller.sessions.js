var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var TinderHelper = require('../utils/tinderHelper.js');
var Sessions = require('../models/sessions.js');


module.exports = (function() {
  var sessionController = template.clone({
    path: '/api/sessions'
  });
  var router = sessionController.router;

  router.get('/', function(request, response) {
    
  });

  router.post('/', function(request, response) {

  });

  return sessionController;
})();
