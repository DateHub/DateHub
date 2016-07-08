var db = require('../db.js');
var Users = require('./users.js');
var Dates = require('./dates.js');

module.export = (function() {
  var Review = db.define('reviews', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: Sequelize.INTEGER,
      field: 'rating'
    },
    notes: {
      type: Sequelize.STRING,
      field: 'notes'
    },
    roundTwo: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      field: 'round_two'
    }
  });

  Users.hasMany(Reviews, {foreignKey: 'id'});
  Dates.hasOne(Reviews, {foreignKey: 'id'});

  Review.sync();
  return Review;
})();