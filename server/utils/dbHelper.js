var db = require('../db.js');
var Users = require('../models/users.js');
var Dates = require('../models/dates.js');

module.exports = (function(){

  //POST
  //inserting data into a table
  var insertData = function(request, response, table, newData){
    console.log(newData)
    table.create(newData)
      .then(function(){
        response.status(200).send(data);
      })
      .catch(function(){
        response.status(500).send(err.message);
      });
  };

  //GET
  //get all data from a column
  var getAllOfField = function(request, response, table, field) {
    table.findAll({where:{field}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };

  // get a data of a row (one record)
  var getRecordById = function(request, response, table, id){
    table.findById(id)
    .then(function(data){
      response.status(200).send(data);
    })
    .catch(function(err){
      response.status(500).send(err.message);
    })
  };

  //PUT

  //DELETE

  

  return {
    insertData: insertData,
    getAllOfField: getAllOfField,
    getRecordById: getRecordById
  };

})();