var db = require('../db.js');
var Session = require('./sessions.js');

module.exports = (function() {
  var User = db.define('users', {
    id: {
      type: db.Sequelize.STRING,
      field: 'id',
      primaryKey: true
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
    }
  }, {
    timestamps: true
  });

  User.hasOne(Session, {as: 'sessions'});

  User.sync({force:true});
  User.sync();
  return User;
})();