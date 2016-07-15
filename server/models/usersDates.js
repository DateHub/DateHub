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
      field: 'rating'
    },
    notes: {
      type: db.Sequelize.STRING,
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

  //example to create dummy data
  // var d = new Date("October 13, 2014 11:13:00")

  // Users.create({
  //   name:'yang',
  //   dob:d,
  //   description:"yang",
  //   lastUpdated:1234,
  //   imageUrl:"1234"
  // })

  UsersDates.sync();
  return UsersDates;
})();