var db = require('../db.js');

module.exports = (function(){
  var Dates = db.define('dates', {
    id: {
      type: db.Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      type: db.Sequelize.TEXT,
      field: 'location'
    },
    time: {
      type: db.Sequelize.TIME,
      field: 'time'
    },
    date: {
      type: db.Sequelize.DATE,
      field: 'date'
    }
  });

  Dates.sync();
  return Dates;

})();