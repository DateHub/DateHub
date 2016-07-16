var db = require('../db.js');
var Users = require('./users.js');
var Dates = require('./dates.js');

module.exports = (function(){

  var UsersDates = db.define( 'UsersDates', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: db.Sequelize.INTEGER,
      field: 'rating',
      allowNull: true
    },
    notes: {
      type: db.Sequelize.STRING,
      defaultValue: "",
      field: 'notes'
    },
    dateAgain: {
      type: db.Sequelize.STRING,
      defaultValue: "ask",
      field: 'date_again'
    }
  });

  Users.belongsToMany(Dates, {through: UsersDates, foreignKey: 'user_id'});
  Dates.belongsToMany(Users, {through: UsersDates, foreignKey: 'date_id'});


  // to reset the table, uncomment line 36 and comment line 37
  // UsersDates.sync({force:true});
  UsersDates.sync();
  return UsersDates;
})();