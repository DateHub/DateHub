var template = require('./controller.template.js');
var dbHelper = require('../utils/dbHelper.js');
var User = require('../model/users.js')


module.exports = (function(){
  var userController = Object.create(template);

  userController.path = '/api/users';

  userController.methods.GET = function(request, response) {

  };

  userController.methods.post = function(request, response) {
    var newUser = {
      id         : req.body.id,
      name       : req.body.name,
      age        : req.body.age,
      description: req.body.description,
      images     : req.body.images
    }
    dbHelper.insertData(request, response, User, newUser);
  };

  userController.methods.put = function(request, response) {
    
  };

  userController.methods.delete = function(request, response) {
    
  };

  return userController;

})();