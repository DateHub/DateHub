var request = require('request');

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
    request.post({
      url: 'https://api.gotinder.com/auth',
      headers: headers,
      form: {
        'facebook_token': facebookToken,
        'facebook_id': '464891386855067',
        'locale': 'en'
      }
    }, function(err, response, body) {
      console.log(body);
      //TODO handle login
    });
  };

  return tinder;
})();