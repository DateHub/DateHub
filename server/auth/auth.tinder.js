var syncRequest = require('sync-request');
var httpHelper = require('../utils/httpHelper.js');
var tinderHelper = require('../utils/tinderHelper.js');
var template = require('./auth.template.js');

var Users = require('../models/users.js');
var Sessions = require('../models/sessions.js');

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

  var tinder = template.clone({
    path: '/auth/tinder'
  });
  tinder.router.post('/', function(request, response) {
    var facebookToken = request.body.access_token;
    var res = syncRequest('POST', 'https://api.gotinder.com/auth', {
      json: { 
        facebook_token: facebookToken,
        facebook_id: '464891386855067',
        locale: 'en' 
      }
    });
    var data = JSON.parse(res.getBody('utf8'));
    request.session.token = data.token;
    request.session.user = tinderHelper.parsePersonData(data.user);
    request.session.user.lastUpdated = data.user.create_date;

    findOrCreateUser(request.session.user)
      .then(function() {
        response.redirect('/');
      });
  });

  function findOrCreateUser(user) {
    return Users.findOrCreate({
      where: { 
        id: user.id
      },
      defaults: {
        id: user.id,
        name: user.name,
        dob: user.dob,
        imageUrl: user.imgUrl,
        lastUpdated: user.lastUpdated
      }
    }).then(function(result) {
      var user = result[0];
      var isNew = result[1];
      var msg = isNew
        ? 'Created new User[' + user.id + ']'
        : 'User[' + user.id + '] already exists';
      console.log(msg);
      return user;
    });
  }

  return tinder;
})();