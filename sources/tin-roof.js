var cheerio = require('cheerio')
  , request = require('request')
  , url = 'https://www.reverbnation.com/venue/load_schedule/1008205?page=1'
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

tinroof = function(done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.show_nugget').each(function(i, elem) { 
      var $$ = cheerio.load(elem)
      var date = $$('.shows_date_').text().split('@')[0].trim()
      var year = $$('meta[itemprop="startDate"]')[0].attribs.content.split('-')[0]
      date = normalizeDate(date, year)
      var show = {
        venue: 'Tin Roof',
        venueUrl: 'http://www.charlestontinroof.com/',
        title: $$('meta[itemprop="description"]')[0].attribs.content,
        url: $$('meta[itemprop="url"]')[0].attribs.content,
        date: date,
        time: $$('.shows_date_').text().split('@')[1].trim(),
        age: $$('.shows_disclaimer_').text().trim()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = tinroof

function normalizeDate(date, year) {
  var newDate = []
  var day 
  var month = date.split(' ')[1]
  if(date.split(' ')[2] != '') day = date.split(' ')[2]
  else day = date.split(' ')[3]
  month = (months.indexOf(month)+1).toString()
  if(month.length<2) month = '0'+month
  if(day.length<2) day = '0'+day
  newDate.push(year)
  newDate.push(month)
  newDate.push(day)
  return newDate.join('-')
}