
import js2py
from js2py import require

original_code = """

let levelup = require('levelup')
let queue = require('queue-async')
let moment = require('moment')
let db = levelup('./db')

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

// if there is a date on the command line, use that. else use current moment(
// command line argument should be of format YYYY-MM-DD
exports.referenceDate = function()
{
  let result = moment()

  if( process.argv.length === 3 )
  { result = moment( process.argv[2] ) }

  return result;
}

function getShows(done) {
  let showsThisWeek = []
  let date = exports.referenceDate();

  let today = date.toISOString().slice(0,10)
  let nextWeek = date.add(7, 'days').toISOString().slice(0,10)
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
  let q = queue(1)
  shows.forEach(function (show) {
    q.defer(function (cb) {
      db.put(show.date + '!' + show.venue + '!' + show.title, JSON.stringify(show), function (err) {
        cb(null, null)
      })
    })
  })
  q.awaitAll(function () {
    console.log('putting')
  })
}
"""
result = js2py.eval_js(original_code)

print(result)