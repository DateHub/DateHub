var template = require('./controller.template.js');
var DbHelper = require('../utils/dbHelper.js');
var tinderHelper = require('../utils/tinderHelper.js');
var Match = require('../models/matches.js');
var User = require('../models/users.js');
var _ = require('lodash');
var db = require('../db.js');

module.exports = (function() {
  var matchController = template.clone({
    path: '/api/matches'
  });
  var router = matchController.router;

  router.get('/new', function(request, response) {
    var userId = request.session.user.id;
    var newPeople = [];
    User.findOne({
      where: {
        id: userId
      },
      attributes: ['lastUpdated']
    }).then(function(result) {
      return result.dataValues.lastUpdated;
    }).then(function(lastUpdated) {
      return User.findOne({
        where: {
          id: userId
        }
      }).then(function(user) {
        return user.updateAttributes({lastUpdated: Date().now()});
      }).then(function(user) {
        return lastUpdated;
      }).catch(function(error) {
        console.log(error);
      });
    }).then(function(lastUpdated) {
      var newMatches = tinderHelper.getMatches(request.session.token, lastUpdated);
      var newPeoplePromies = _.map(newMatches, function(match) {
        newPeople.push(match.person);
        return new Promise(function(resolve, reject) {
          return User.findOrCreate({
            where: {
              id: match.person.id
            },
            defaults: match.person})
            .then(resolve)
            .catch(reject);
        });
      });
      return Promise.all(newPeople).then(function(values) {
        return newMatches;
      });
    }).then(function(newMatches) {
      return _.map(newMatches, function(match) {
        return {
          matchId: match.matchId,
          userId1: userId,
          userId2: match.person.id
        };
      });
    }).then(function(newMatches) {
      var matches = _.map(newMatches, function(match) {
        return new Promise(function(resolve, reject) {
          return Match.findOrCreate({
            where: {
              matchId: match.matchId
            },
            defaults: match})
            .then(resolve)
            .catch(reject);
        });
      });
      return Promise.all(matches).then(function(values) {
        return values;
      });
    }).then(function(results) {
      response.send(newPeople);
    }).catch(function(error) {
      response.status(500).send(error);
    });
  });

  return matchController;
})();
