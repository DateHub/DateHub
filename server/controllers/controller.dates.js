var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var Dates = require('../models/dates.js');
var UsersDates = require('../models/usersDates.js');

var db = require('../db.js');

module.exports = (function() {
  var dateController = template.clone({
    path: '/api/dates'
  });
  var router = dateController.router;

  router.get('/:userid', function(request, response) {
    var userId = request.params.userid;
    var dates = [];
    var results = [];
    
    UsersDates.findAll({where: { user_id: userId }})  // returns array of object
    .then(function(data) {
      // console.log(data);
      data.forEach(function(date) {
        dates.push(date.id);
      });
      return dates;
    })
    .then(function(dates) {
      dates.forEach(function(dateId) {
        Dates.findAll({where: { id: dateId }})
        .then(function(data) {
          results.push(data);
        });
      });
      return results;
    })
    .then(function(result) {
      response.status(200).send(result);
    })
    .catch(function() {
      response.status(500).send(err.message);
    });
  });

  router.get('/month/:month/year/:year', function(request, response) {

    var dates = [];
    var results = [];

    UsersDates.findAll({where: { user_id: userId }})  // returns array of object
    .then(function(data) {
      // console.log(data);
      data.forEach(function(date) {
        dates.push(date.id);
      });
      return dates;
    })
    .then(function(dates) {
      dates.forEach(function(dateId) {
        Dates.findAll({where: { id: dateId }})
        .then(function(data) {
          results.push(data);
        });
      });
      return results;
    })
    .then(function(result) {
      response.status(200).send(result);
    })
    .catch(function() {
      response.status(500).send(err.message);
    });

    // DbHelper.getAllOfField(request, response, UsersDates, {user_id: request.___})
    //   .then(function(data) {
    //     DbHelper.getRecordById(request, response, Dates, data.id) /* ??? */
    //   });
  });

  router.post('/', function(request, response) {

    var userId = request.session.user.id;
    // JSON object
    // console.log("REQUEST HERE!!!! ", request.body);

    var newDate = {
      location: request.body.location,
      date: request.body.date
    };

    Dates.create(newDate)
    .then(function(date) {  // trying to set foreign keys here...
      UsersDates.create({
        user_id: userId,
        date_id: date.dataValues.id
      });
    })
    .then(function(date) {
      response.status(200).send('success');
    })
    .catch(function() {
      response.status(500).send(err.message);
    });


    // DbHelper.insertData(request, response, Dates, {
    //   location: request.___,
    //   time: request.___,
    //   date: request.___
    // });

  });

  return dateController;
})();
