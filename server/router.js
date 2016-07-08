var httpHelper = require('./utils/httpHelper.js');

module.exports = function(requestHandlers) {
  return function(request, response, next) {
    var requestHandler = requestHandlers[request.baseUrl];
    var httpMethod;
    try {
      if(!requestHandler) {
        return httpHelper.send404(response, 'Invalid pathname');
      }
      httpMethod = requestHandler[request.method.toLowerCase()];
      if(!httpMethod) {
        return httpHelper.send404(response, 'Unsupported method');
      }
      httpMethod(request, response, next);
    } finally {
      next();
    }
  };
};