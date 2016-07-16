var dbHelper = require('../utils/dbHelper.js');
var Users = require('../models/users.js');
var template = require('./controller.template.js');

module.exports = (function(){
  var userController = template.clone({
    path: '/api/users'
  });

  var router = userController.router;

  router.get('/', function(request, response) {
    dbHelper.getAll(request, response, Users);
  });

  router.get('/:id', function(request, response) {
    var id = request.params.id;

    // dbHelper.isIdExist(Users,id);
    // NEED TO FIX THIS PART
    Users.findOne({ where: {id: id} })
      .then(function(user) {
        console.log("SCCESS FOUND!!!!")

        if(user){
          console.log("FOUND")
        }else{
          console.log("NOT FOUND")
        }

        response.status(200).send(user);
      })
      .catch(function(err){
        console.log("ERRRR")
        response.status(500).send(err.message);
      })
  });


  //adding users into the database
  //if the id does not exist in DB
  //add the info into DB
  router.post('/:id', function(request, response) {
    var id = request.params.id;
    //check if the id exist
    dbHelper.isIdExist(Users, id)
      .then(function(exist){
      // if id exist
        if (exist) {
          respond.status(200).send("the id already exist");
        }

        //if id does not exist
        var newUser = {
          id         : id,
          name       : request.body.name,
          dob        : request.body.dob,
          description: request.body.description,
          lastUpdated: request.body.lastUpdated,
          imageUrl   : request.body.imageUrl,
          rating     : request.body.rating
        }
        //insert the user info into the User table
        dbHelper.insertData(request, response, Users, newUser);
      })
    });

  // existing user info update
  router.put('/:id', function(request, response) {
    var id = request.params.id;
    dbHelper.isIdExist(Users, id)
      .then(function(exist){
      // if id exist
      if (!exist) {
        response.status(200).send("the id already exist");
        return;
      }

      //if id does not exist
      var newUser = {
        id         : id,
        name       : request.body.name,
        dob        : request.body.dob,
        description: request.body.description,
        lastUpdated: request.body.lastUpdated,
        imageUrl   : request.body.imageUrl,
        rating     : request.body.rating
      }
      //insert the user info into the User table
      dbHelper.updateData(request, response, Users, newUser, id);
    })
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