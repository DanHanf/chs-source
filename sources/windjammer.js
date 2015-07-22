var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.the-windjammer.com/wp/events/'
  , shows = []
  , months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

windjammer = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event-archive').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var date = $$('.event-arc-day').text().trim() + ' ' + $$('.event-arc-month').text().trim()
      var eventUrl = $$('.event-arc-title').children().attr('href')
      request(eventUrl, function(er, resp, eventBody) {
        var $$$ = cheerio.load(eventBody)
        var year = $$$('.event-single-year').text()
        date = normalizeDate(date, year)
        var show = {
          venue: 'The Windjammer',
          title: $$('.event-arc-title').children().text(),
          url: eventUrl,
          time: $$('.event-arc-time').text().split('\r').join('').split('\n').join('').trim(),
          price: $$('.event-cancel-out').children().text(),
          date: date
        }
        shows.push(show)
      })
    })
    done(null, shows)
  })
}

module.exports = windjammer

function normalizeDate(date, year) {
  var newDate = []
  date = date.split(' ')
  var month = date.pop()
  var day = date.pop()
  month = (months.indexOf(month)+1).toString()
  if(month.length<2) month = '0'+month
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-')
}