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
        return user.updateAttributes({lastUpdated: Date.now()});
      }).then(function(user) {
        return lastUpdated;
      }).catch(function(error) {
        console.log(error);
      });
    }).then(function(lastUpdated) {
      var newMatches = tinderHelper.getMatches(request.session.token, lastUpdated);
      var newPeoplePromises = _.map(newMatches, function(match) {
        console.log(match.person)
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
      return Promise.all(newPeoplePromises).then(function(values) {
        return newMatches;
      }).catch(function(error) {
        console.log(error);
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

  router.get('/dateless', function(request, response) {
    var userId = request.session.user.id;
    Match.findAll({
      where: db.Sequelize.and({ 
          status: 'DATE_NOT_SET' 
        }, db.Sequelize.or({
          userId1: userId
        }, {
          userId2: userId
        })
      )
    }).then(function(results) {
      return _.map(results, function(result) {
        return {
          id: (result.dataValues.userId1 !== userId)
            ? result.dataValues.userId1
            : result.dataValues.userId2
        };
      });
    }).then(function(unsetDateIds) {
      return User.findAll({
        where: db.Sequelize.or.apply(db.Sequelize, unsetDateIds)
      }).then(function(users) {
        response.send(users);
      })
    }).catch(function(error) {
      response.status(500).send(error);
    });
  });

  return matchController;
})();
