// var Sequelize = require('sequelize');

// module.exports = (function() {
//   var db = new Sequelize('LycheeXD', null, null, {
//     host: 'localhost',
//     dialect: "postgres"
//   });
//   return db; 
// })();
//------------------------------------ just for the test from this line------------------------------------
var db = require('sequelize');

module.exports = (function(){
var Sequelize = new db('postgres://admin:GGMJXMLEQKCGRJDG@aws-us-east-1-portal.12.dblayer.com:10859/compose');
Sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
  return Sequelize
})();