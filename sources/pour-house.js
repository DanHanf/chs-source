var cheerio = require('cheerio')
  , request = require('request')
  , options = {
    url: 'http://www.charlestonpourhouse.com/schedule/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us)' +
      ' AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7'
    }
  }
  , shows = []

function pourHouse(done) {
  request(options, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-info-container').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      
      $$('.eventinfo').each(function(t, cell) {
        var $$$ = cheerio.load(cell)
        console.log($$$('td'))
        console.log('\n\n\n\n::::::::')
      })
      show = {
        description: $$('.eventtitle').text(),
        url: $$('eventtitle').children().attr('href')
      }
    })
  })
}

module.exports = pourHouse()