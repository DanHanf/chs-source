var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.theatre99.com/schedule.php'
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

theatre99 = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.caldaybgpassed').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var date = $$('div.caldate').first().text().trim() +' '+ $$('div.showdetails').text().trim().split(' - ')[0]
      var year = $('.calbg h1').text().split(' ')[1].trim()
      date = normalizeDate(date.trim(), year)
      var show = {
        venue: 'Theatre 99',
        title: $$('div.calshowtitle').first().text().trim(),
        url: 'http://www.theatre99.com/'+$$('div.calshowtitle').children().attr('href'),
        date: date,
        price: $$('div.showdetails').first().text().trim().split(' - ')[1]
      }
      if(show.title) shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = theatre99

function normalizeDate(date, year) {
  var newDate = []
  var month = date.split(' ')[0]
  var day = date.split(' ')[1]
  month = (months.indexOf(month)+1).toString()
  if(month.length<2) month = '0'+month
  if(day.length<2) day = '0'+day
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-')
}