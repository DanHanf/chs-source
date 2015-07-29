var fs = require('fs')
var queue = require('queue-async')
var childProcess = require('child_process')
var show = require('./show.js')
var generateHTML = require('./generateHTML.js')
var makePage = require('./makePage.js')

// Scrapers run / DB updated every 30 minutes
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
    show.addShows(shows)
  })
})


show.getShows(function(result) {
  generateHTML(result, function(tonight, thisWeek) {
    // returns html for tonight and array of html for each venue this week
    makePage(tonight, thisWeek.join(' '), function() {
      childProcess.execSync('git commit -m "refresh"; git push origin gh-pages;')
    })
  })
})
