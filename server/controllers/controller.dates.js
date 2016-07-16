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
    // .then filter out array of data object for month that we're looking for
    .then(function(result) {
      response.status(200).send(result);
    })
    .catch(function() {
      response.status(500).send(err.message);
    });
  });

  router.post('/', function(request, response) {

    // JSON object
    // console.log("REQUEST HERE!!!! ", request.body);

    var newDate = {
      location: request.body.location,
      date: request.body.date
    };

    // var userId = request.session.user.id;

    Dates.create(newDate)
    .then(function(date) {
      UsersDates.create({
        // user_id: userId,
        date_id: date.dataValues.id
      });
      console.log("DAAAAAATE: ", date);
      return date;
    })
    .then(function(date) {
      response.status(200).send('success');
    })
    .catch(function(err) {
      response.status(500).send('fail');
    });
  });

  router.put('/:dateid', function(request, response) {
    var dateId = request.params.dateid;
    var updatedDate = {
      location: request.body.location,
      date: request.body.date
    };

    Dates.update(updatedDate, {where: { id: dateId }})
    .then(function() {
      response.status(200).send('update success');
    })
    .catch(function() {
      response.status(500).send('update failed');
    });
  });

  router.delete('/:dateid', function(request, response) {
    var dateId = request.params.dateid;

    Dates.findById(dateId)
    .then(function(row) {
      row.destroy();
      response.status(200).send('delete success');
    })
    .catch(function() {
      response.status(500).send('delete fail');
    });
  });

  return dateController;
})();
