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
      field: 'name',
      allowNull: false
    },
    dob: {
      type: db.Sequelize.DATE,
      field: 'dob',
      allowNull: false
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

  // to reset the table, uncomment line 40 and comment line 41
  // User.sync({force:true});
  User.sync();
  return User;
})();