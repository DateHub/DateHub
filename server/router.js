var httpHelper = require('./utils/httpHelper.js');

module.exports = function(requestHandlers) {
  function findRequestHandler(url, requestHandlers) {
    var urlParts = url.split('/');
    var path = urlParts[0];
    var requestHandler = requestHandlers[path];
    for(var i = 1; i < urlParts.length; ++i) {
      path += '/' + urlParts[i];
      requestHandler = requestHandlers[path];
      if(requestHandler) {
        break;
      }
    }
    return requestHandler;
  }
  
  return function(request, response, next) {
    try {
      var requestHandler = findRequestHandler(request.baseUrl, requestHandlers);
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