var template = require('./controller.template.js');

module.exports = (function(){
  var usersDatesController = template.clone({
    path: '/api/usersDates'
  });

  var router = usersDatesController.router;

  router.get('/', function(request, response) {

  });

  router.post('/', function(request, response) {
    
  });

  router.put('/', function(request, response) {
    
  });

  router.delete('/', function(request, response) {
    
  });

  return usersDatesController;

})();