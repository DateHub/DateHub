var controllers = require('./controllers/indexAPI.js');
var httpHelper = require('./utils/httpHelper.js');

module.exports = (function(){
  return function(request, response, next) {
    var controller = controllers[request.baseUrl];
    var requestHandler;
    try {
      if(!controller) {
        return httpHelper.send404(response, 'Invalid pathname');
      }
      requestHandler = controller[request.method.toLowerCase()];
      if(!requestHandler) {
        return httpHelper.send404(response, 'Unsupported method');
      }
      requestHandler(request, response);
    } finally {
      next();
    }
  };
})();