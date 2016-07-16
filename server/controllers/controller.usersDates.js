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
  router.get('/:userId', function(request, response) {
    var id = request.params.userId;
    UsersDates.findAll({where:{user_id:id}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(data);
      });
  });

  //gets all (two) records for a date_id
  router.get('/:dateId') {
    var id = request.params.dateId;
    UsersDates.findAll({where:{date_id:id}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(data);
      });
  }

  router.post('/:id', function(request, response) {
    var id = request.params.dateId;
    dbHelper.insertData(request, response, UsersDates, newData);

  });

  // add new record
  router.post(){}

  //update note: need to know userId and dateId
  router.put('/:id/:dateId/:note', function(request, response) {
    var userId = request.params.id;
    var dateId = request.params.id;
    var note = request.body.note;
    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(){
        UsersDates.updateAttributes({note:note});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  //update rating
  router.put('/:id/:dates/:rating', function(request, response) {
    var userId = request.params.id;
    var dateId = request.params.id;
    var rating = request.body.rating;
    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(){
        UsersDates.updateAttributes({rating:rating});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });


  //update dateAgain
  router.put('/:id/:dates/:review', function(request, response) {
    var userId = request.params.id;
    var dateId = request.params.id;
    var review = request.body.review;
    UsersDates.find({where:{user_id:userId, date_id:dateId}})
      .then(function(){
        UsersDates.updateAttributes({review:review});
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  });

  return usersDatesController;

})();