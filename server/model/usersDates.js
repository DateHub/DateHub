var db = require('../db.js');
var Users = require('./users.js');
var Dates = require('./dates.js');

module.exports = (function(){
  UsersDates = db.define('usersDates', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: db.Sequelize.INTEGER,
      field: 'rating'
    },
    notes: {
      type: db.Sequelize.STRING,
      field: 'notes'
    },
    dateAgain: {
      type: db.Sequelize.BOOLEAN,
      defaultValue: true,
      field: 'date_again'
    }, {
    tableName: 'usersDates',
    timestamps: false
  });

  Users.belongsToMany(Dates, {through: UsersDates, foreignKey: 'userId'});
  Dates.belongsToMany(Users, {through: UsersDates, foreignKey: 'dateId'});

  UsersDates.sync();
  return UsersDates;
})();