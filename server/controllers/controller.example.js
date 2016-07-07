var template = require('./controller.template.js');

module.exports = (function() {
  var example = Object.create(template);
  example.path = '/api/hello';
  // specify http methods here
  // example.methods.post = function(request, response) {
  //   response.send('what?');   
  // };
  //
  example.methods.get = function(request, response) {
    response.send('hello');
  };
  return example;
})();