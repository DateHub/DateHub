var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var Dates = require('../model/dates.js');
var UsersDates = require('../model/usersDates.js');


module.exports = (function() {
  var dateController = Object.create(template);

  dateController.path = '/api/dates';

  dateController.methods.get = function(request, response) {
    // request.session.user is an object
    
    DbHelper.getAllOfField(request, response, UsersDates, {user_id: request.___})
      .then(function(data) {
        DbHelper.getRecordById(request, response, Dates, data.id) /* ??? */
      });
  };

  dateController.methods.post = function(request, response) {
    DbHelper.insertData(request, response, Dates, {
      location: request.___,
      time: request.___,
      date: request.___
    });

  };

  return dateController;
})();
