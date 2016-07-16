var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var Dates = require('../models/dates.js');
var UsersDates = require('../models/usersDates.js');


module.exports = (function() {
  var dateController = template.clone({
    path: '/api/dates'
  });
  var router = dateController.router;

  router.get('/', function(request, response) {
    // request.session.user is an object
    
    // DbHelper.getAllOfField(request, response, UsersDates, {user_id: request.___})
    //   .then(function(data) {
    //     DbHelper.getRecordById(request, response, Dates, data.id) /* ??? */
    //   });
  });

  router.post('/', function(request, response) {
    console.log('yup', request.body)
    response.send(request.body);
    // DbHelper.insertData(request, response, Dates, {
    //   location: request.___,
    //   time: request.___,
    //   date: request.___
    // });

  });

  return dateController;
})();
