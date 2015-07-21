var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://theroyalamerican.com/schedule/'
  , shows = []

function royalamerican (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.gig').each(function(i, elem) {
      var $$ = cheerio.load(elem)

      var title = $$('.title').text().trim()
      if($$('.with').text().trim()) title += $$('.with').text().trim()

      var show = {
        venue: 'The Royal American',
        title: title,
        url: $$('.details').first().find('a').attr('href'),
        date: $$('.date').text().trim()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = royalamerican