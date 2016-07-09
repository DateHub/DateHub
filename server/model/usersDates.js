var db = require('../db.js');
var Users = require('./users.js');
var Dates = require('./dates.js');

module.exports = (function(){

  UsersDates = db.define('usersDates');

  Users.belongsToMany(Dates, {through: UsersDates, foreignKey: 'userId'});
  Dates.belongsToMany(Users, {through: UsersDates, foreignKey: 'dateId'});

  UsersDates.sync();
  return UsersDates;
})();