var Sequelize = require('sequelize');
var config = require('./env/config.js').POSTGRES;

module.exports = (function() {
  var db = new Sequelize(
    config.databaseName, 
    config.userName, 
    config.password, {
      host: config.host,
      port: config.port,
      dialect: config.dialect
  });
  return db;
})();