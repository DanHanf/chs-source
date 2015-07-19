var cheerio = require('cheerio')
  , request = require('request')
  , options = {
    url: 'http://www.charlestonpourhouse.com/schedule/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us)' +
      ' AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7'
    }
  }
  , price = ''
  , time = ''
  , shows = []

function pourHouse(done) {
  request(options, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-info-container').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      $$('tr').each(function(t, el) {
        var key = $$(el).find('th').text().trim()
        if(key === 'Cover:') {
          price = $$(el).find('td').text()
        }
        if(key === 'Showtime:') {
          time = $$(el).find('td').text()
        }
      })
      show = {
        description: $$('.eventtitle').text().trim().split('\r').join('').split('\t').join(' '),
        url: $$('.eventtitle').children().attr('href'),
        date: $$('.eventdate').text().trim(),
        price: price,
        time: time
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = pourHouse
