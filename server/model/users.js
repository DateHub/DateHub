var db = require('../db.js');

module.exports = (function() {
  var User = db.define('users', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: db.Sequelize.STRING,
      field: 'name'
    },
    dob: {
      type: db.Sequelize.DATE,
      field: 'dob'
    },
    description: {
      type: db.Sequelize.STRING,
      field: 'description'
    },
    lastUpdated: {
      type: db.Sequelize.DATE,
      field: 'last_updated'
    },
    imageUrl: {
      type: db.Sequelize.STRING,
      field: 'image_url'
    },
    matchId: {
      type: db.Sequelize.STRING,
      field: 'match_id'
    }
  }, {
    timestamps: true
  });

  User.sync();
  return User;
})();