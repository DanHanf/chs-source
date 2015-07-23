var levelup = require('levelup')
var db = levelup('./db')

module.exports = function(shows) {
  getShows(function(shows) {
    console.log(shows)
  })
}

function getShows(done) {
  var today = new Date.toISOString().slice(0,10)
  db.createReadStream({gte: '2015-08', lt:'2015-09'})
  .on('data', function(data) {
    done(data.key, '=', data.value)
  })
}