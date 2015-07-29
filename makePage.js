var fs = require('fs')

module.exports = function(tonight, thisWeek, done) {
  var data = tonight
  data += thisWeek
  fs.writeFile('index.html', data, function(){
    done()
  })
}