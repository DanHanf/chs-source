var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.gaillardcenter.com/buy-tickets/'
  , shows = []

gaillard = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-promo').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      title = $$('div.name').text().trim()
      var date = $$('div.date').text().trim().split('Multiple Dates').join('').split('.').join('/')
      date = normalizeDate(title, date)
      var show = {
        venue: 'Gaillard Center',
        title: title,
        url: 'http://www.gaillardcenter.com'+$$('div.overlay').children().attr('href'),
        date: date 
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

normalizeDate = function(title, date) {
  date = date.split('/')
  var month = date.shift()
  var day = date.shift()
  date.push(month)
  date.push(day)
  return date.join('-') + '!Gaillard!' + title.trim()
}

module.exports = gaillard
