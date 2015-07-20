var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.gaillardcenter.com/buy-tickets/'
  , shows = []

gaillard = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-promo').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var show = {
        venue: 'Gaillard Center',
        description: $$('div.name').text().trim(),
        url: 'http://www.gaillardcenter.com'+$$('div.overlay').children().attr('href'),
        date: $$('div.date').text().trim().split('Multiple Dates').join('').split('.').join('/')
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = gaillard