var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.musicfarm.com/all-shows/'
  , shows = []

function musicfarm (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.list-view-item').each(function(i, elem) {
      var $$ = cheerio.load(elem)
      var date = $$('.dates').text().trim()
      date = normalizeDate(date)
      var show = {
        venue: 'Music Farm',
        venueUrl: 'http://www.musicfarm.com/venues/music-farm-charleston/upcoming-shows/',
        title: $$('.headliners').text().trim(),
        url: 'http://www.musicfarm.com'+$$('.headliners').children().attr('href'),
        date: date,
        age: $$('.age-restriction').text().trim()
      }
      shows.push(show)
    })
    console.log(shows)
    done(null, shows)
  })
}

musicfarm(function(){})

function normalizeDate(date) {
  date = date.split(',').join('')
  date = date.split(' ')
  date = date.slice(1)
  switch(date[0]) {
    case 'January': date[0] = '01' 
      break;
    case 'February': date[0] = '02' 
      break;
    case 'March': date[0] = '03' 
      break;
    case 'April': date[0] = '04' 
      break;
    case 'May': date[0] = '05' 
      break;
    case 'June': date[0] = '06' 
      break;
    case 'July': date[0] = '07' 
      break;
    case 'August': date[0] = '08' 
      break;
    case 'September': date[0] = '09' 
      break;
    case 'October': date[0] = '10' 
      break;
    case 'November': date[0] = '11' 
      break;
    case 'December': date[0] = '12' 
      break;
    default: date[0] = '13' 
      break;
  }
  if(date[1].length < 2) {
    date[1] = '0'+date[1]
  }
  var year = date.pop()
  var day = date.pop()
  var month = date.pop()
  date.push(year)
  date.push(month)
  date.push(day)
  return date.join('-')
}

module.exports = musicfarm