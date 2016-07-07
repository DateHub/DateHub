// -> require controllers here
// checkout controller.example.js for example
// var example = require('./controller.example.js');

module.exports = (function(){
  var controllers = [
    // -> add controllers here
    // example
  ];
  var router = {};
  controllers.forEach(function(controller) {
    router[controller.path] = controller.methods;
  });
  return router; 
})();