var db = require('../db.js');
var Users = require('./users.js');

module.exports = (function() {
  var Matches = db.define('matches', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    matchId: {
      type: db.Sequelize.STRING,
      field: 'match_id'
    },
    userId1: {
      type: db.Sequelize.STRING,
      field: 'user_id_1'
    },
    userId2: {
      type: db.Sequelize.STRING,
      field: 'user_id_2'
    },
    status: {
      type: db.Sequelize.STRING,
      field: 'status',
      defaultValue: 'DATE_NOT_SET' 
    }
  }, {
    timestamp: true
  }); 

  Matches.sync();
  return Matches;
})();