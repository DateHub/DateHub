var db = require('../db.js');

module.exports = (function(){

  UsersDates = db.define('usersDates');

  Users.belongsToMany(Dates, {through: UsersDates, foreignkey: 'id'})
  Dates.belongsToMany(Users, {through: UsersDates, foreignkey: 'id'})

  UsersDates.sync();
  return UsersDates;
})();