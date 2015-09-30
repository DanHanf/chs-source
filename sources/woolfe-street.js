/**
 * Created by johnhethcox on 9/15/15.
 */
var cheerio = require('cheerio')
    , request = require('request')
    , sprintf = require("sprintf-js").sprintf
    , url = 'http://woolfestreetplayhouse.tix.com/Schedule.aspx?OrgNum=1687&Tooltip=N'
    , eventUrlPrefix = 'http://woolfestreetplayhouse.tix.com/'
    , shows = [];

woolfe = function(done) {
    request(url, function(err, response, body) {
        var $ = cheerio.load(body)
        var table = $("#MasterContent_TixInnerContent_ctl00_gvSchedule");
        if( table === null ) { return }

        table.find( 'tr.TixClass4' ).each(function(i, el) {

            var date = parseDate( el.children[1].children[0].data );

            var time = el.children[1].children[2].data;
            time = time.replace( "at ", "" );

            var title = $(el.children[3]).find( "a" )[0].children[0].data;
            var href = $(el.children[3]).find( "a" ).attr( 'href');
            //fix relative URL
            href = eventUrlPrefix + href;

            var show = {
                venue: 'Woolfe Street',
                venueUrl: 'http://www.woolfestreetplayhouse.com',
                title: title,
                url: href,
                date: date,
                time: time
            }
            //console.log( show )
            shows.push(show)
        } )

        done(null, shows)
    })
}

function parseDate( date )
{
    var mdyString = date.split( /\s/ )[1];
    var tokens = mdyString.split( /\// );

    if( tokens.length !== 3 ) return "";

    var result = sprintf( "%s-%02d-%02d",  tokens[2], tokens[0], tokens[1] )

    return result;
}

module.exports = woolfe
