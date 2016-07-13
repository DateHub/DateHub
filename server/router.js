var httpHelper = require('./utils/httpHelper.js');

module.exports = function(app, routes) {
  return {
    init: function() {
      for(var path in routes) {
        app.use(path, routes[path]);
      }
    }
  };
};