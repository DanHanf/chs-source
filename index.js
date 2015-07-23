var fs = require('fs')
var queue = require('queue-async')
var manageDB = require('./manageDB.js')

fs.readdir(__dirname+'/sources', function(err, dirs){
  var q = queue(5)
  dirs.forEach(function(dir){
    var fn = require(__dirname + '/sources/' + dir)
    q.defer(fn)
  })
  q.awaitAll(function(errs, results){
    var shows = []
    results.forEach(function(venue){
      shows = shows.concat(venue)
    })
    manageDB.getShows(shows)
    //console.log(JSON.stringify(shows))
  })
})