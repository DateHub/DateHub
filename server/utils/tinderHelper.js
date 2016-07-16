var syncRequest = require('sync-request');
var _ = require('lodash');

// EX: 
// app.get('/example', function(request, response) {
//   response.send(tinderHelper.getMatches(request.session.token, "2016-07-08T11:29:57.379Z"));
// });

module.exports = (function() {
  var headers = {
    'platform': 'android',
    'User-Agent': 'Tinder Android Version 5.2.0',
    'os-version': '23',
    'Facebook-ID': '464891386855067',
    'Accept-Language': 'en',
    'app-version': '1546',
    'Content-Type': 'application/json',
    'Connection': 'Keep-Alive'
  };
  var url = 'https://api.gotinder.com/updates';

  function getMatches(accessToken, fromDate) {
    headers['X-Auth-Token'] = accessToken; 
    var result = syncRequest('POST', url, {
      headers: headers,
      json: { 
        last_activity_date: fromDate
      }
    });
    var matches = JSON.parse(result.getBody('utf8')).matches;
    matches = removeInternalTinderUsers(matches);
    return _.map(matches, function(match) {
      return {
        matchId: match.id,
        person: parsePersonData(match.person)
      };
    });
  }

  function removeInternalTinderUsers(matches) {
    return _.filter(matches, function(match) {
      if(match.person === undefined) {
        return true;
      }
      if(match.person.photos[0] === undefined) {
        return true;
      }
      return match.person.photos[0].url.indexOf('__internal_user__') === -1;
    });
  }

  function parsePersonData(person) {
    if(!person) {
      return;
    }
    return {
      id: person._id,
      name: person.name,
      dob: person.birth_date,
      imageUrl: person.photos[0] &&
        buildImageUrl(person._id, person.photos[0].fileName)
    };
  }

  function buildImageUrl(userId, imgFileName) {
    return 'http://images.gotinder.com/' + userId + '/' + imgFileName;
  }

  return {
    getMatches: getMatches,
    parsePersonData: parsePersonData
  };
})();