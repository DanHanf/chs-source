var cheerio = require('cheerio')
  , request = require('request')
  , url = 'https://www.reverbnation.com/venue/load_schedule/1186603?page=1'
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

sparrow = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.show_nugget').each(function(i, elem) { 
      var $$ = cheerio.load(elem)
      var date = $$('.details_time').text().split('@')[0].split('  ').join(' ').trim()
      date = normalizeDate(date)
      var show = {
        venue: 'The Sparrow',
        title: $$('meta[itemprop="description"]')[0].attribs.content.split('at')[0].split('At')[0].trim(),
        url: $$('meta[itemprop="url"]')[0].attribs.content,
        date: date,
        time: $$('.details_time').text().split('@')[1].trim(),
        age: '21+'
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = sparrow

function normalizeDate(date) {
  var newDate=[]
  date = date.split(' ')
  var year = date.pop()
  var day = date.pop()
  if(day.length<3) day = '0'+day
  var month = date.pop()
  month = (months.indexOf(month)+1).toString()
  if(month.length<2) month = '0'+month
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-').split(',').join('')
}