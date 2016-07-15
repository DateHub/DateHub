var db = require('../db.js');

module.exports = (function() {
  var User = db.define('users', {
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
    rating: {
      type: db.Sequelize.INTEGER,
      field: 'rating'
    }
  }, {
    timestamps: true
  });

  User.sync();
  return User;
})();