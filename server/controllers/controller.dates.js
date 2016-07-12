var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var Dates = require('../model/dates.js');


module.exports = (function() {
  var dateController = Object.create(template);

  dateController.path = '/api/dates';

  dateController.methods.get = function(request, response) {
    // request.session.user is an object
    
    DbHelper.getAllOfField(request, response, Dates, field);
  };

  dateController.methods.post = function(request, response) {

  };

  return dateController;
})();
