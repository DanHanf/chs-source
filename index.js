var fs = require('fs')
var queue = require('queue-async')
var cronJob = require('cron').CronJob
var show = require('./show.js')
var generateHTML = require('./generateHTML.js')

// Scrapers run / DB updated every 30 minutes
new cronJob('*/30 * * * *', function(){
  console.log('click')
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
      console.log(shows)
      show.addShows(shows)
    })
  })
}, function(){console.log('written')}, true)


show.getShows(function(result) {
  generateHTML(result, function(tonight, thisWeek) {
    //console.log(tonight, thisWeek.join(' '))
    // returns html for tonight and array of html for each venue this week
  })
})
