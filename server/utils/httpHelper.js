module.exports = (function(){
  return {
    send404: function(response, message) {
      response.status(404).send(message);
    }
  };
})();