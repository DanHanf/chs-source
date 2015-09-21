/**
 * Created by johnhethcox on 9/15/15.
 */
var cheerio = require('cheerio')
    , request = require('request')
    , url = 'http://woolfestreetplayhouse.com/shows/'
    , shows = [];

woolfe = function(done) {
    request(url, function(err, response, body) {
        var $ = cheerio.load(body)
        $("h2").children("a").each( function(i, elem) {

        var dates = parseDates( $( elem ).parent().parent().parent().find( "h5" ).text() )
        if( dates == null ) { return }

        dates.forEach( function( date ) {
            var show = {
                venue: 'Woolfe Street',
                venueUrl: 'http://www.woolfestreetplayhouse.com',
                title: $(elem).text(),
                url: $(elem).attr( 'href' ),
                date: date,
            }
            //console.log( show )
            shows.push(show)
        })
    })
        done(null, shows)
    })
}

//return start and end date (if it's only one date, put it in twice)
function parseDates( dateString )
{
    var result = [];
    var dates = dateString.split( /\s-\s|\sand\s|\sto\s|\sthrough\s/ )

    if( dates.length == 1 )
    {
        result.push( parseDate( dates[0].trim() ))
    }

    if( dates.length == 2 )
    {
        result.push( parseDate( dates[0].trim() ))
        result.push( parseDate( dates[1].trim() ))
    }

    return result
}

function parseDate( date )
{
    var tokens = date.split( /\s/ );

    var month = normalizeMonth( tokens[0] )
    if( month == null )
    {
        month = normalizeMonth( tokens[1] )

        if( month == null || tokens[2] == null ) { return "" }

        return buildDate( month, tokens[2] )
    } else
    {
        return buildDate( month, tokens[1] )
    }
}

function buildDate( month, day )
{
    var result = "2015-"; //ick
    result += month
    result += '-'

    //append date but strip out trailing comma, if present
    result += day .replace( /,|st|th/, '' )

    return result
}

function normalizeMonth( token ) {
    switch(token) {
        case 'January': return '01'
            break;
        case 'February': return '02'
            break;
        case 'March': return '03'
            break;
        case 'April': return '04'
            break;
        case 'May': return '05'
            break;
        case 'June': return '06'
            break;
        case 'July': return '07'
            break;
        case 'August': return '08'
            break;
        case 'September': return '09'
            break;
        case 'October': return '10'
            break;
        case 'November': return '11'
            break;
        case 'December': return '12'
            break;
        default: return null
            break;
    }
}

module.exports = woolfe
