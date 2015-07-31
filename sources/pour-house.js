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
  , date = ''
  , shows = []
  , months = ['January', 
              'February', 
              'March', 
              'April', 
              'May', 
              'June', 
              'July', 
              'August', 
              'September', 
              'October', 
              'November', 
              'December']

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
        date = $$('.eventdate').text().trim()
        date = normalizeDate(date)
      })
      show = {
        venue: 'Pour House',
        venueUrl: 'http://www.charlestonpourhouse.com/',
        title: $$('.eventtitle').text().trim().split('\r').join('').split('\t').join('').split('\n').join(''),
        url: $$('.eventtitle').children().attr('href'),
        date: date,
        price: price,
        time: time
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = pourHouse

function normalizeDate(date) {
  var newDate = []
  date = date.split(' ')
  var month = (months.indexOf(date[1])+1).toString()
  if(month.length <2) month = '0'+month
  var day = date[2]
  var year = date[3]
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-').split(',').join('')
}
