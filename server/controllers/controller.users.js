var template = require('./controller.template.js');

module.exports = (function(){
  var userController = Object.create(template);
  userController.path = '/api/users'

  userController.methods.get = function(request, response) {
    
  };

  userController.methods.post = function(request, response) {
    
  };

})();