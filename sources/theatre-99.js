var cheerio = require('cheerio')
  , request = require('request')
  , moment = require('moment')
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
  , date

theatre99 = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.caldays').each(function(i, elem) {
      if(i===0) {}
      else {
        var $$ = cheerio.load(elem)
        $$('tr').each(function(r, row) {
          var $$$ = cheerio.load(row)
          $$$('td').each(function(c, cell) {
            var $$$$ = cheerio.load(cell)
            if($$$$('div.caldate').first().text().trim() === 'TODAY') date = moment().format('MMM D')
            else date = $$$$('div.caldate').first().text().trim() +' '+ $$$$('div.showdetails').text().trim().split(' - ')[0]
            var year = $('.calbg h1').text().split(' ')[1].trim()
            date = normalizeDate(date.trim(), year)
            var show = {
              venue: 'Theatre 99',
              title: $$$$('div.calshowtitle').first().text().trim(),
              url: 'http://www.theatre99.com/'+$$$$('div.calshowtitle').children().attr('href'),
              date: date,
              price: $$$$('div.showdetails').first().text().trim().split(' - ')[1]
            }
            if(show.title) shows.push(show)
          })
        })
      }
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