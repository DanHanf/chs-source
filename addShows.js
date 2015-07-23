var levelup = require('levelup')
var queue = require('queue-async')
var db = levelup('./db')

module.exports = function(shows) {
  if(db.isOpen()) {
    db.close(function(){})
  }
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
    db.close(function(){})
    console.log('done')
  })
}