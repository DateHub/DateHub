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
  router.get('/:id', function(request, response) {
    var id = request.params.id;
    dbHelper.getAll(request, response, UsersDates, user_id, id);
  });

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