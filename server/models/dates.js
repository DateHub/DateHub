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
    start_date: {
      type: db.Sequelize.DATE,
      field: 'start_date'
    },
    end_date: {
      type: db.Sequelize.DATE,
      field: 'end_date'
    },
    date_name: {
      type: db.Sequelize.TEXT,
      field: 'date_name'
    },
    title: {
      type: db.Sequelize.TEXT,
      field: 'title'
    }
  }, {
    timestamps : true
  });

  Dates.sync();
  return Dates;
})();