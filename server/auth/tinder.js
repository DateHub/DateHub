var httpHelper = require('../utils/httpHelper.js');
var syncRequest = require('sync-request');

module.exports = (function() {
  var headers = {
    'platform': 'android',
    'User-Agent': 'Tinder Android Version 5.2.0',
    'os-version': '23',
    'Facebook-ID': '464891386855067',
    'Accept-Language': 'en',
    'app-version': '1546',
    'Content-Type': 'application/json; charset=utf-8',
    'Connection': 'Keep-Alive'
  };

  var tinder = Object.create(require('./auth.template.js'));
  tinder.path = '/auth/tinder';
  tinder.methods.post = function(request, response) {
    var facebookToken = request.body.access_token;
    var res = syncRequest('POST', 'https://api.gotinder.com/auth', {
      json: { 
        facebook_token: facebookToken,
        facebook_id: '464891386855067',
        locale: 'en' 
      }
    });
    var data = JSON.parse(res.getBody('utf8'));
    //TODO: set session, send data, redirect. figure it out.
    response.send('replace me with data');
  };

  return tinder;
})();