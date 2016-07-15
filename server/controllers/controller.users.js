var dbHelper = require('../utils/dbHelper.js');
var Users = require('../models/users.js');
var template = require('./controller.template.js');

module.exports = (function(){
  var userController = template.clone({
    path: '/api/users'
  });

  var router = userController.router;

  router.get('/', function(request, response) {
    dbHelper.getAllOfField(request, response, table, field);
  });

  router.get('/:id', function(request, response) {
    var id = request.params.id;
    Users.findOne({ where: {id: id} })
      .then(function(user) {
        response.send(user);
      })
  });

  //adding users into the database
  //if the id does not exist in DB
  //add the info into DB
  router.post('/:id', function(request, response) {
    var id = request.params.id;

    //check if the id exist
    dbHelper.isIdExist(Users, id).then(exist => {
      // if id exist
      if (exist) {
        respond.status(200).send("the id already exist");
      }

      //if id does not exist
      var newUser = {
        id         : request.body.id,
        name       : request.body.name,
        age        : request.body.age,
        description: request.body.description,
        images     : request.body.images
      }
      //insert the user info into the User table
      dbHelper.insertData(request, response, Users, newUser);
    })
  });

  // existing user info update
  router.put('/:id', function(request, response) {
    var id = request.params.id;
    if (!exist) {
      respond.status(404).send("the id does not exist");
    }

    //updated user
    var newUser = {
        id         : id,
        name       : request.body.name,
        age        : request.body.age,
        description: request.body.description,
        images     : request.body.images
      }
    //insert the user info into the User table
    dbHelper.update(request, response, Users, newUser, id);

  });

  router.delete('/:id', function(request, response) {
    var id = request.params.id;
    //check if the id exist
    if (!exist) {
      respond.status(404).send("the id does not exist");
    }

    dbHelper.deleteData(request, response, Users, id);
  });

  return userController;

})();