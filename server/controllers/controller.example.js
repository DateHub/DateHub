var template = require('./controller.template.js');

module.exports = (function() {
  var example = template.clone({
    path: '/api/examples'
  })
  var router = example.router;
  // specify http methods here
  // router.post('/', function(request, response) {
  //   response.send('what?');   
  // });
  //
  router.get('/', function(request, response) {
    response.send('hello');
  });

  router.get('/:id', function(request, response) {
    var id = request.params.id || '';
    response.send(id);
  });
  return example;
})();