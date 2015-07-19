var cheerio = require('cheerio')
  , request = require('request')
  , url = 'https://www.reverbnation.com/venue/load_schedule/1008205?page=1'
  , shows = []

tinRoof = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.show_nugget').each(function(i, elem) { 
      var $$ = cheerio.load(elem)
      var show = {
        name: 'Tin Roof',
        description: $$('meta[itemprop="description"]')[0].attribs.content,
        url: $$('meta[itemprop="url"]')[0].attribs.content,
        date: $$('.shows_date_').text(),
        age: $$('.shows_disclaimer_').text().trim()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = tinRoof