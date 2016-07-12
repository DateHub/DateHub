var template = require('./controller.template.js');
var dbHelper = require('../utils/dbHelper.js');
var User = require('../model/users.js')


module.exports = (function(){
  var userController = Object.create(template);

<<<<<<< HEAD
  userController.path = '/api/users/';
=======
  userController.path = '/api/users';
>>>>>>> a38e35765f4f8d96a36faca60b31b2eee40af265

  userController.methods.get = function(request, response) {
    dbHelper.getAll(request, response, User);
  };

  userController.methods.post = function(request, response) {
    var newUser = {
      id         : request.body.id,
      name       : request.body.name,
      age        : request.body.age,
      description: request.body.description,
      images     : request.body.images
    }
    dbHelper.insertData(request, response, User, newUser);
  };

  userController.methods.put = function(request, response) {
    
  };

  userController.methods.delete = function(request, response) {
    
  };

  return userController;

})();