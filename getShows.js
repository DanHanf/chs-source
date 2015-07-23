var levelup = require('levelup')
var moment = require('moment')
var db = levelup('./db')

module.exports = function(shows) {
  if(db.isOpen()) {
    db.close(function(){})
  }
  getShows(function(shows) {
    console.log('yo')
    console.log(shows)
  })
}

function getShows(done) {
  var date = moment()
  var today = date.toISOString().slice(0,10)
  var nextWeek = date.add(7, 'days').toISOString().slice(0,10)
  db.createReadStream({gte: date, lt: nextWeek})
  .on('data', function(data) {
    db.close(function(){})
    done(data.key, '=', data.value)
  })
}