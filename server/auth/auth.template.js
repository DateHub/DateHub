var express = require('express');

module.exports = (function() {
  return {
    clone: function(attributes) {
      return {
        path: attributes.path || '',
        router: express.Router(),
        callback: attributes.callback || '',
        callbackRouter: express.Router()
      };
    }
  };
})();