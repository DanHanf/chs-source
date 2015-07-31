var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://charlestonmusichall.com/events/'
  , shows = []

function musicfarm (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.event_wrap').each(function(i, elem) {
      var show = {
        venue: 'Charleston Music Hall',
        venueUrl: 'http://charlestonmusichall.com/',
        title: $(elem).find('.event_title').text().trim(),
        url: $(elem).find('.event_title').children().attr('href'),
        date: $(elem).find('img .photo').attr('href'),
        date: $(elem).find('img').attr('src').split('/')[$(elem).find('img').attr('src').split('/').indexOf('files')+1].trim() + '-' +
          getMonth($(elem).find('.month').text().trim()) + '-' + 
          getDay($(elem).find('.day').text().trim()),
        details: ($(elem).find('.venue_notes').text().trim()).split('\n').join(' ').split('\r').join(' ')
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

function getMonth(str) {
  var months = [
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
  var month = (months.indexOf(str) + 1).toString()
  if(month.length === 1) month = '0' + month
  return month
}

function getDay(str) {
  var day = str.toString()
  if(day.length === 1) day = '0' + day
  return day
}

module.exports = musicfarm