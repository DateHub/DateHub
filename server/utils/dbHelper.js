var db = require('../db.js');
var Users = require('../model/users.js');
var Dates = require('../model/dates.js');

module.exports = (function(){

  /**********         CREATE (POST)       **********/
  /********** inserting data into a table **********/
  // in process
  var insertData = function(req, res, table, newData){
    console.log(newData)
    table.create(newData)
      .then(function(){

      })
      .catch(function(){

      });
  };

  /**********           READ (GET)        **********/
  /********** get data into a table **********/

  //get all data from a column
  //table: all type of tables
  var getAllOfField = function(req, res, table, field) {
    table.findAll({where:{field}})
      .then(function(data){
        res.status(200).send(data);
      })
      .catch(function(err){
        res.status(500).send(err.message)
      })
  };

  // get a data of a row (one record)
  //table: all type of tables
  var getRecordById = function(req, res, table, id){
    table.findById(id)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(500).send(err.message);
    })
  };

  //getByAge
  //table: users

  /********** UPDATE (PUT) **********/

  /********** DELETE (DELETE) **********/

  



})();