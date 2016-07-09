module.exports = (function() {
  var session = {
    secret: 'ENTER ANY RANDOM STRING HERE'
  };

  return {
    SESSION_SECRET: session
  };
})();