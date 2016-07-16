var Users = require('./users.js');
var Dates = require('./dates.js');
var UsersDates = require('./usersDates.js');

module.exports = (function(){
  var dob_example = new Date("April 11, 1987");
  var date_example = new Date("July 4, 2016");

  //USER TABLE
  Users.create({
    id: '1',
    name: 'yang',
    dob: dob_example,
    description: 'kkk',
    lastUpdated: date_example,
    imageUrl: 'url',
  });

  Users.create({
    id: '2',
    name: 'yang',
    dob: dob_example,
    description: 'kkk',
    lastUpdated: date_example,
    imageUrl: 'url',
  });

  Users.create({
    id: '3',
    name: 'yang',
    dob: dob_example,
    description: 'kkk',
    lastUpdated: date_example,
    imageUrl: 'url',
  });

  //DATE TABLE
  Dates.create({
    id: 01,
    location: "a",
    time: 7,
    date:date_example
  });

  Dates.create({
    id: 02,
    location: "b",
    time: 8,
    date:date_example
  });

  Dates.create({
    id: 03,
    location: "c",
    time: 9,
    date:date_example
  });

  Dates.create({
    id: 04,
    location: "d",
    time: 10,
    date:date_example
  });

  UsersDates.create({
    rating: "boy1",
    notes: "boy1 note",
    user_id: "1",
    date_id: 01,
  });

  UsersDates.create({
    rating: 'boy2',
    notes: "boy2 note",
    user_id: "2",
    date_id: 02,
  });

  UsersDates.create({
    rating: 'girl1',
    notes: dob_example,
    user_id: "3",
    date_id: 01,
  });

  UsersDates.create({
    rating: 'girl2',
    notes: dob_example,
    user_id: "4",
    date_id: 02,
  });


})();



