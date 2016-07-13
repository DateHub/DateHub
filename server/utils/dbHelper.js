var db = require('../db.js');
var Users = require('../models/users.js');
var Dates = require('../models/dates.js');

module.exports = (function(){

  //POST
  //inserting data into a table
  var insertData = function(request, response, table, newData){
    console.log(newData)
    db.table.create(newData)
      .then(function(){
        response.status(200).send(data);
      })
      .catch(function(){
        response.status(500).send(err.message);
      });
  };

  //GET
  //get all
  var getAll = function(request, response, table) {
    db.table.findAll()
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  }

  //get all data from a column
  var getAllOfField = function(request, response, table, field) {
    db.table.findAll({where:{field}})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };



  // get a data of a row (one record)
  var getRecordById = function(request, response, table, id){
    db.table.findById(id)
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