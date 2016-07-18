var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var Dates = require('../models/dates.js');
var UsersDates = require('../models/usersDates.js');
var _ = require('lodash');

var db = require('../db.js');

module.exports = (function() {
  var dateController = template.clone({
    path: '/api/dates'
  });
  var router = dateController.router;

  router.get('/', function(request, response) {
    var userId = request.session.user.id;
    var dates = [];
    var results = [];
    
    UsersDates.findAll({where: { user_id: userId }})  // returns array of object
    .then(function(data) {
      data.forEach(function(date) {
        dates.push(date.date_id);
      });
      return dates;
    })
    .then(function(dates) {
      return Promise.all(_.map(dates, function(dateId) {
        return Dates.findAll({where: { id: dateId }});
      }))
      .then(function(values) {
        var temp = [];
        values.forEach(function(value) {
          temp.push(value[0]);
        });
        return temp;
      });
    })
    .then(function(result) {
      response.status(200).send(result);
    })
    .catch(function(err) {
      response.status(500).send(err.message);
    });
  });

  router.get('/month/:month/year/:year', function(request, response) {
    var userId = request.session.user.id;
    var month = request.params.month;
    var year = request.params.year;
    var dates = [];
    var results = [];

    UsersDates.findAll({where: { user_id: userId }})  // returns array of object
    .then(function(data) {
      // console.log(data);
      data.forEach(function(date) {
        dates.push(date.date_id);
      });
      return dates;
    })
    .then(function(dates) {
      return Promise.all(_.map(dates, function(dateId) {
        return Dates.findAll({where: { id: dateId }});
      }))
      .then(function(values) {
        var temp = [];
        values.forEach(function(value) {
          temp.push(value[0]);
        });
        return temp;
      });
    })
    .then(function(dateList) {
      var monthStr = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      };
      dateList = dateList.filter(function(date) {
        var strungDate = date.start.toString();

        return strungDate.slice(4, 7) === monthStr[month] && strungDate.slice(11, 15) === year;
      });
      return dateList;
    })
    .then(function(result) {
      response.status(200).send(result);
    })
    .catch(function(err) {
      response.status(500).send(err.message);
    });
  });

  router.post('/', function(request, response) {

    // JSON object
    // console.log("REQUEST HERE!!!! ", request.body);
    var newDate = {
      location: request.body.location,
      start: request.body.start,
      end: request.body.end,
      name: request.body.name,
      notes: request.body.notes,
      title: "Date with " + request.body.name
    };

    var userId = request.session.user.id;

    Dates.create(newDate)
    .then(function(date) {
      UsersDates.create({
        user_id: userId,
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
      title: "Date with " + request.body.name,
      name: request.body.name,
      location: request.body.location,
      start: request.body.start,
      end: request.body.end,
      notes: request.body.notes
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
