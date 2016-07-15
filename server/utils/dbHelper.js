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
    });
  };

  // reference: http://stackoverflow.com/questions/36480587/sequelize-how-to-check-if-entry-exists-in-database
  var isIdExist = function(table, id){
    db.table.count({where: {id: id}})
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
      });
  };

  //PUT
  var updateData = function(request, response, table, updatedData ,id){
    db.table.update(updatedData, {where:{id:id}})
      .then(function(result){
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };

  //DELETE
  var deleteData = function(request, response, table, id){
    db.table.findById(id)
    .then(function(id){
      id.destroy();
      response.status(200).send("the id " + id + " is successfully delete.")
    })
    .catch(function(err){
        response.status(500).send(err.message);
    });
  };
  

  return {
    insertData: insertData,
    getAllOfField: getAllOfField,
    getRecordById: getRecordById
  };

})();