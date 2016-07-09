var db = require('../db.js');
var Users = require('./users.js');

module.exports = (function(){
  var Sessions = db.define('sessions', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: db.Sequelize.TEXT,
      field: 'session_id'
    }, {
    tableName: 'sessions',
    timestamps: false
  });

  Sessions.hasOne(Users);

  Sessions.sync();
  return Sessions;
})();