var dbHelper = require('../utils/dbHelper.js');
var Users = require('../model/users.js');
var template = require('./controller.template.js');

module.exports = (function(){
  var userController = template.clone({
    path: '/api/users'
  });
  var router = userController.router;

  router.get('/', function(request, response) {
      Users.findAll()
      .then(function(users) {
        response.send(users);
      });
  });

  router.get('/:id', function(request, response) {
      var id = request.params.id;
      Users.findOne({ where: {id: id} })
      .then(function(user) {
        response.send(user);
      })
  });

  router.post('/', function(request, response) {
    // var newUser = {
    //   id         : req.body.id,
    //   name       : req.body.name,
    //   age        : req.body.age,
    //   description: req.body.description,
    //   images     : req.body.images
    // }
  });

  router.put('/', function(request, response) {

  });

  router.delete('/', function(request, response) {
    
  });

  return userController;

})();