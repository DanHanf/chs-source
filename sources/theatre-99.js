var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.theatre99.com/schedule.php'
  , shows = []

theatre99 = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.caldaybgpassed').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var show = {
        venue: 'Theatre 99',
        description: $$('div.calshowtitle').first().text().trim(),
        url: 'http://www.theatre99.com/'+$$('div.calshowtitle').children().attr('href'),
        date: $$('div.caldate').first().text().trim() +' '+ $$('div.showdetails').text().trim().split(' - ')[0],
        price: $$('div.showdetails').first().text().trim().split(' - ')[1]
      }

      if(show.description) shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = theatre99