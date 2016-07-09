var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://admin:GGMJXMLEQKCGRJDG@aws-us-east-1-portal.12.dblayer.com:10859/compose');
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

exports.sequelize = sequelize;