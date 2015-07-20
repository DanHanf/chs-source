var cheerio = require('cheerio')
  , request = require('request')
  , url = 'https://www.reverbnation.com/venue/load_schedule/1186603?page=1'
  , shows = []

sparrow = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.show_nugget').each(function(i, elem) { 
      var $$ = cheerio.load(elem)
      var show = {
        venue: 'The Sparrow',
        description: $$('meta[itemprop="description"]')[0].attribs.content.split('at')[0].split('At')[0].trim(),
        url: $$('meta[itemprop="url"]')[0].attribs.content,
        date: $$('.details_time').text().split('@')[0].trim(),
        time: $$('.details_time').text().split('@')[1].trim(),
        age: '21+'
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = tinRoof