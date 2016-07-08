var db = require('../db.js');

module.exports = (function(){

  //create dates table
  var Dates = db.define('dates', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      type: Sequelize.TEXT,
      field: 'location'
    },
    time: {
      type: Sequelize.TIME,
      field: 'time'
    },
    date: {
      type: Sequelize.DATE,
      field: 'date'
    }
  });

  var getAllDates = function(){
    return Dates.findAll({where:{}});
  }

  var getOneDayDates = function(date){
    return Dates.findById(dateId, {where:{date:date}});
  }

  var setDate = function(location, time, date){
    db.sync().then(function(){
      Dates.create({
        location:location, time:time, date:date
      });
    });
  }

  Dates.sync();
  return Dates;

})();