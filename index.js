var fs = require('fs')
var queue = require('queue-async')
var show = require('./show.js')
var generateHTML = require('./generateHTML.js')

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
    show.getShows(function(result) {
      generateHTML(result, function(tonight, thisWeek) {
        console.log(tonight, thisWeek.join(' '))
        // returns html for tonight and array of html for each venue this week
      })
    })
    //console.log(JSON.stringify(shows))
  })
})