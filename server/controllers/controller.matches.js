var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var TinderHelper = require('../utils/tinderHelper.js');
var Matches = require('../model/matches.js');

module.exports = (function() {
  var matchController = template.clone({
    path: '/api/matches'
  });
  var router = matchController.router;

  router.get('/', function(request, response) {

  });

  router.post('/', function(request, response) {

  });

  return matchController;
})();
