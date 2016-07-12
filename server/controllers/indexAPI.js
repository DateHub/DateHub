// -> require controllers here
// checkout controller.example.js for example
// var example = require('./controller.example.js');
var usersController = require('./controller.users.js');
var datesController = require('./controller.dates.js');
var usersDatesController = require('./controller.usersDates.js');
var sessionsController = require('./controller.sessions.js');

module.exports = (function(){
  var controllers = [
    usersController,
    usersDatesController
  ];
  var router = {};
  controllers.forEach(function(controller) {
    router[controller.path] = controller.methods;
  });
  return router; 
})();