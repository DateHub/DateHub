var db = require('../db.js');

module.export = (function() {
  var User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    age: {
      type: Sequelize.INTEGER,
      field: 'age'
    },
    description: {
      type: Sequelize.STRING,
      field: 'description'
    }
  });

  User.sync();
  return User;
})();