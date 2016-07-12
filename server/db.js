var Sequelize = require('sequelize');

var db = new Sequelize('LycheeXD', null, null, {
  host: 'localhost',
  dialect: "postgres"
});

// instantiate the database:
