var db = require('../db.js');
var Users = require('../models/users.js');
var Dates = require('../models/dates.js');

module.exports = (function(){

  //POST
  //inserting data into a table
  var insertData = function(request, response, table, newData){
    table.create(newData)
      .then(function(){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };

  //GET
  var getAll = function(request, response, table, fields, value) {
    //get all records
    if(!fields && !value) {
      table.findAll()
        .then(function(data){
          response.status(200).send(data);
        })
        .catch(function(err){
          response.status(500).send(err.message);
        });
    } 
    //get all records for specific data
    else {
      table.findAll({where:{field:value},
        attributes: fields})
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
    }
  }

  // get a data of a row (one record)
  var getRecordById = function(request, response, table, id){
    table.findById(id)
      .then(function(data){
        response.status(200).send(data);
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };

  //check if the id exist in a table
  var isIdExist = function(table, id){
    return table.count({where: {id: id}})
      .then(function(count) {
        if (count != 0) {
          return true;
        }
        return false;
      });
  };

  //PUT
  //update a record
  var updateData = function(request, response, table, updatedData ,id){
    table.update(updatedData, {where:{id:id}})
      .then(function(result){
        response.status(200).send("successfully updated");
      })
      .catch(function(err){
        response.status(500).send(err.message);
      });
  };

  //DELETE
  var deleteData = function(request, response, table, id){
    table.findById(id)
      .then(function(id){
        id.destroy();
        response.status(200).send("the id " + id + " is successfully delete.")
      })
      .catch(function(err){
          response.status(500).send(err.message);
      });
  };

  var calculateAge = function(birthDate, otherDate) {
    birthDate = new Date(birthDate);
    otherDate = new Date(otherDate);

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    return years;
  };
  

  return {
    insertData: insertData,
    isIdExist:isIdExist,
    updateData: updateData,
    getAll: getAll,
    getRecordById: getRecordById,
    updateData: updateData,
    calculateAge: calculateAge
  };

})();