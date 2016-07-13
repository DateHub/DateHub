var Sequelize = require('sequelize');

module.exports = (function() {
  var db = new Sequelize('LycheeXD', null, null, {
    host: 'localhost',
    dialect: "postgres"
  });
  return db; 
})();
