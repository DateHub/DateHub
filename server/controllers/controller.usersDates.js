var dbHelper = require('../utils/dbHelper.js');
var UsersDates = require('../models/usersDates.js');
var template = require('./controller.template.js');
var Dates = require('../models/dates.js');
var Users = require('../models/users.js');


module.exports = (function(){
  var usersDatesController = template.clone({
    path: '/api/usersDates'
  });

  var router = usersDatesController.router;

  //gets all the date id first and
  //gets all the records for a user id
  router.get('/user/:userId', function(request, response) {
    var id = request.params.userId;
    UsersDates.findAll({where:{user_id:id}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  // gets all (two) records for a date_id
  router.get('/date/:dateId', function(request, response) {
    var id = request.params.dateId;
    UsersDates.findAll({where:{date_id:id}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  // insert the records into the table
  router.post('/post', function(request, response) {

    var newData = {
      rating: request.body.rating,
      notes: request.body.notes,
      dateAgain: request.body.dateAgain,
      user_id: request.body.user_id,
      date_id: request.body.date_id
    }

    dbHelper.insertData(request, response, UsersDates, newData);
  });

  //update notes: need to know userId and dateId
  router.put('/update/notes/:userId/:dateId', function(request, response) {
    var userId = request.params.userId;
    var dateId = request.params.dateId;

    var newData = request.body.notes;

    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(record){
        record.updateAttributes({notes:newData});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  //update rating
  router.put('/update/rating/:userId/:dateId', function(request, response) {
    var userId = request.params.userId;
    var dateId = request.params.dateId;

    var newData = request.body.rating;

    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(record){
        record.update({rating:newData});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  //update dateAgain
  router.put('/update/dateAgain/:userId/:dateId', function(request, response) {
    var userId = request.params.userId;
    var dateId = request.params.dateId;

    var newData = request.body.dateAgain;

    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(record){
        record.updateAttributes({dateAgain:newData});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  return usersDatesController;

})();