// -> require controllers here
// checkout controller.example.js for example
// var example = require('./controller.example.js');
var userController = require('./controller.users.js');
var dateController = require('./controller.dates.js');
var sessionController = require('./controller.sessions.js');
var matchController = require('./controller.matches.js');
var usersDatesController = require('./controller.usersDates.js');

module.exports = (function(){
  var controllers = [
    userController,
    dateController,
    sessionController,
    matchController,
    usersDatesController
  ];
  var router = {};
  controllers.forEach(function(controller) {
    router[controller.path] = controller.router;
  });
  return router;
})();