var levelup = require('levelup')
var db = levelup('./db')
var queue = require('queue-async')

module.exports = function(shows) {
  addShows(shows)
}

function addShows(shows) {
  var q = queue(1)
  shows.forEach(function(show) {
    q.defer(function(cb) {
      db.put(show.date+'!'+show.venue+'!'+show.title, JSON.stringify(show), function(err) {
      cb(null, null)
      })
    })
  })
  q.awaitAll(function(){
    console.log('done')
  })
}