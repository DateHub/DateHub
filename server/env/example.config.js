module.exports = (function() {
  var session = {
    secret: 'ENTER ANY RANDOM STRING HERE'
  };

  var postgres = {
    databaseName: 'ENTER DATABASE NAME',    // datehub
    userName: 'ENTER USERNAME',             // coolguy
    password: 'ENTER PASSWORD',             // coolguypassword
    host: 'ENTER HOSTNAME',                 // ex: localhost
    port: 'ENTER PORT',                     // ex: 1234
    dialect: 'postgres'
  };

  return {
    SESSION_SECRET: session,
    POSTGRES: postgres
  };
})();