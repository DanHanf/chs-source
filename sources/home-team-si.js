var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://hometeambbq.com/music-and-special-events/calendar/category/sullivans-island/'
  , shows = []

function hometeamsi(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)

    $('#eventList').find('li').each(function(i, elem) {
      var year = $(elem).parent().parent().attr('id').split('-')[1]
      var month = $(elem).parent().parent().attr('id').split('-')[0]
      var day = getDay($(elem).find('h3').text().split(':')[0].trim().split('. ')[1])
      var show = {
        venue: "Home Team Sullivan's Island",
        venueUrl: 'http://hometeambbq.com/about/sullivans-island/',
        title: $(elem).find('h3').text().split(':')[1].trim(),
        date: year + '-' + month + '-' + day,
        price: $(elem).find('h4.price').text(),
        time: $(elem).find('h5 span').text()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

function getDay(str) {
  var day = str.toString()
  if(day.length === 1) day = '0' + day
  return day
}

module.exports = hometeamsi