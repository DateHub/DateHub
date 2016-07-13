// -> require controllers here
// checkout controller.example.js for example
// var example = require('./controller.example.js');
var userController = require('./controller.users.js');
var dateController = require('./controller.dates.js');
var usersDatesController = require('./controller.usersDates.js');
var sessionController = require('./controller.sessions.js');
var matchController = require('./controller.matches.js');

module.exports = (function(){
  var controllers = [
    userController,
    usersDatesController,
    dateController,
    sessionController,
    matchController
  ];
  var router = {};
  controllers.forEach(function(controller) {
    router[controller.path] = controller.router;
  });
  return router; 
})();