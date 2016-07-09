var db = require('../db.js');

module.exports = (function() {
  var User = db.define('users', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: db.Sequelize.STRING,
      field: 'first_name'
    },
    lastName: {
      type: db.Sequelize.STRING,
      field: 'last_name'
    },
    age: {
      type: db.Sequelize.INTEGER,
      field: 'age'
    },
    description: {
      type: db.Sequelize.STRING,
      field: 'description'
    },
    lastUpdated: {
      type: db.Sequelize.DATE,
      field: 'last_updated'
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.BLOB),
      field: 'image'
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.sync();
  return User;
})();