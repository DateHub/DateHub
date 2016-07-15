var db = require('../db.js');

module.exports = (function(){
  var Session = db.define('sessions', {
    sid: {
      type: db.Sequelize.STRING,
      primaryKey: true
    },
    userId: {
      type: db.Sequelize.STRING
    },
    expires: {
      type: db.Sequelize.DATE
    },
    data: {
      type: db.Sequelize.STRING(50000)
    }
  }, {
    timestamps: true
  });

  Session.sync();
  return Session;
})();