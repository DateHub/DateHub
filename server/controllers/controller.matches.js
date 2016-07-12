var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var TinderHelper = require('../utils/tinderHelper.js');
var Matches = require('../model/matches.js');

module.exports = (function() {
  var matchController = Object.create(template);

  matchController.path = '/api/matches';

  

  matchController.methods.get = function(request, response) {

  };

  matchController.methods.post = function(request, response) {

  };

  return matchController;
})();
