var levelup = require('levelup')
var queue = require('queue-async')
var moment = require('moment')
var db = levelup('./db')

exports.getShows = function(done) {
  getShows(function(result) {
    done(result)
  })
}

exports.addShows = function(shows) {
  addShows(shows, function() {
    console.log('written')
  })
}

function getShows(done) {
  var showsThisWeek = []
  var date = moment()
  var today = date.toISOString().slice(0,10)
  var nextWeek = date.add(7, 'days').toISOString().slice(0,10)
  db.createReadStream({gte: today, lt: nextWeek})
  .on('data', function(data) {
    showsThisWeek.push(data.value)
  })
  .on('error', function(err) {
    console.log('err::::'+err)
  })
  .on('end', function() {
    done(showsThisWeek)
  })
}

function addShows(shows, done) {
  var q = queue(1)
  shows.forEach(function(show) {
    q.defer(function(cb) {
      db.put(show.date+'!'+show.venue+'!'+show.title, JSON.stringify(show), function(err) {
        cb(null,null)
      })
    })
  })
  q.awaitAll(function(){
    console.log('done writing')
  })
}