var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://charlestonmusichall.com/events/'
  , shows = []

function musicfarm (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event_wrap').each(function(i, elem) {
      var $$ = cheerio.load(elem)

      var show = {
        venue: 'Charleston Music Hall',
        title: $$('.event_title').text().trim(),
        url: $$('.event_title').children().attr('href'),
        date: ($$('.month').text().trim() +' '+ $$('.day').text().trim() +' '+ $$('.weekday').text().trim() +' ' + $$('.venue_notes').text().trim()).split('\n').join(' ').split('\r').join(' ')
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = musicfarm