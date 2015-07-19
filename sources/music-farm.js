var cheerio = require('cheerio')
  , request = require('request')
  , url = 'http://www.musicfarm.com/all-shows/'
  , shows = []

function musicfarm (done) {
  request(url, function(err, response, body) {
    var $ = cheerio.load(body)
    $('.list-view-item').each(function(i, elem) {
      var $$ = cheerio.load(elem)

      var show = {
        description: $$('.headliners').text().trim(),
        url: 'http://www.musicfarm.com'+$$('.headliners').children().attr('href'),
        date: $$('.dates').text().trim() + ' ' + $$('.times').text().trim(),
        age: $$('.age-restriction').text().trim()
      }
      shows.push(show)
    })
    done(null, shows)
  })
}

module.exports = musicfarm