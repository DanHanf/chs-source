var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://hometeambbq.com/music-and-special-events/calendar/category/sullivans-island/'
  , shows = []

function hometeamsi(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('#eventList').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var details = $$('h3').text()
      var show = {
        name: "Home Team Sullivan's Island",
        description: details.split(':')[1],
        date: details.split(':')[0],
        price: $$('li .price').html(),
        time: $$('li h5 span').html()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = hometeamsi