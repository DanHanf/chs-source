var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.the-windjammer.com/wp/events/'
  , shows = []

windjammer = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-archive').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var show = {
        venue: 'The Windjammer',
        title: $$('.event-arc-title').children().text(),
        url: $$('.event-arc-title').children().attr('href'),
        time: $$('.event-arc-time').text().split('\r').join('').split('\n').join('').trim(),
        price: $$('.event-cancel-out').children().text(),
        date: $$('.event-arc-day').text().trim() + ' ' + $$('.event-arc-month').text().trim()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = windjammer