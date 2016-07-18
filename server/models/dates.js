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
    start: {
      type: db.Sequelize.DATE,
      field: 'start'
    },
    end: {
      type: db.Sequelize.DATE,
      field: 'end'
    },
    name: {
      type: db.Sequelize.TEXT,
      field: 'name'
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