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
    }
  }, {
    timestamp: true
  }); 

  Users.belongsToMany(Matches, {through: Matches, foreignKey: 'user_id', as: 'user1_id'});
  Users.belongsToMany(Matches, {through: Matches, foreignKey: 'user_id', as: 'user2_id'});   

  Matches.sync();
  return Matches;
})();