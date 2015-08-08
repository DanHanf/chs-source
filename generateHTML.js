var moment = require("moment")
var gaillard = [], hometeamsi = [], hometeamwa = [], musicfarm = [], musichall = [], pourhouse = [], royalamerican = []
  , sparrow = [], theatre99 = [], tinroof = [], windjammer = [], tonight = [], thisWeek = []

module.exports = function(shows, done) {
  sortShows(shows)
  var tonightList = tonightHTML(tonight)
  thisWeek.push(generateHTML(gaillard, 'Gaillard Center'))
  thisWeek.push(generateHTML(hometeamsi, "Home Team Sullivan's Island"))
  thisWeek.push(generateHTML(hometeamwa, "Home Team West Ashley"))
  thisWeek.push(generateHTML(musicfarm, 'Music Farm'))
  thisWeek.push(generateHTML(musichall, 'Charleston Music Hall'))
  thisWeek.push(generateHTML(pourhouse, 'Pour House'))
  thisWeek.push(generateHTML(royalamerican, 'The Royal American'))
  thisWeek.push(generateHTML(sparrow, 'The Sparrow'))
  thisWeek.push(generateHTML(theatre99, 'Theatre 99'))
  thisWeek.push(generateHTML(tinroof, 'Tin Roof'))
  thisWeek.push(generateHTML(windjammer, 'The Windjammer'))
  thisWeek.push(["</body></html>"])
  done(tonightList, thisWeek)
}

function sortShows(shows) {
  var today = moment().format('YYYY-MM-DD')
  shows.forEach(function(show) {
    show = JSON.parse(show)
    var venue = show.venue
    if(venue === 'Gaillard Center') {gaillard.push(show)}
    else if(venue === "Home Team Sullivan's Island") {hometeamsi.push(show)}
    else if(venue === 'Home Team West Ashley') {hometeamwa.push(show)}
    else if(venue === 'Music Farm') {musicfarm.push(show)}
    else if(venue === 'Charleston Music Hall') {musichall.push(show)}
    else if(venue === 'Pour House') {pourhouse.push(show)}
    else if(venue === 'The Royal American') {royalamerican.push(show)}
    else if(venue === 'The Sparrow') {sparrow.push(show)}
    else if(venue === 'Theatre 99') {theatre99.push(show)}
    else if(venue === 'Tin Roof') {tinroof.push(show)}
    else if(venue === 'The Windjammer') {windjammer.push(show)}
    if(show.date === today) {tonight.push(show)}
  })
}

function tonightHTML(shows) {
  // generate all the boilerplate stuff
  var html = "<!DOCTYPE html><html><head><title>chs-tonight</title><link rel='stylesheet' type='text/css' href='./public/css/style.css' />"
  html += "<link href='http://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet' type='text/css'></head><body>"
  // now here's the meat
  html += "<div id='nav'><a href='./about.html'>about</a></div>"
  html += "<h1><span class='red'>T</span><span class='orange'>O</span><span class='yellow'>N</span>"
  html += "<span class='green'>I</span><span class='blue'>G</span><span class='indigo'>H</span><span class='violet'>T</span></h1>"
  html += "<ul>"
  shows.forEach(function(show) {
    html += "<li><div class='venueName'><h2><a href='"+show.venueUrl+"' target='_blank'>"+show.venue+"</a></h2></div>"
    if(show.url) {html+="<h3><a target='_blank' href='"+show.url+"'>"+show.title+"</a></h3>"}
    else {html+= "<h3>"+show.title+"</h3>"}
    if(show.time) {html += "<span>Time: "+show.time+"</span><br />"}
    if(show.price) {html += "<span>Price: "+show.price+"</span><br />"}
    if(show.details) {html += "<span>Details: "+show.details+"</span><br />"}
    html += "</div></li>"
  })
  html += "</ul>"
  html += "<h1><span class='red'>T</span><span class='orange'>H</span><span class='yellow'>I</span>"
  html += "<span class='green'>S</span> <span class='blue'>W</span><span class='indigo'>E</span>"
  html += "<span class='violet'>E</span><span class='red'>K</span></h1>"
  return html
}

function generateHTML(shows, venue) {
  if(shows.length > 0) {
    var venueUrl = shows[0].venueUrl
    var html = "<div class='venueName'><h2><a href='"+venueUrl+"' target='_blank'>"+venue+"</a></h2></div> <ul>"
  }
  else var html = "<div class='venueName'><h2>"+venue+"</h2></div> <ul>"
  shows.forEach(function(show) {
    html += "<div class='showItem'><li>"
    if(show.url) {html+="<h3><a target='_blank' href='"+show.url+"'>"+show.title+"</a></h3>"}
    else {html+= "<h3>"+show.title+"</h3>"}
    html += "<span>Date: "+show.date+"</span><br />"
    if(show.time) {html += "<span>Time: "+show.time+"</span><br />"}
    if(show.price) {html += "<span>Price: "+show.price+"</span><br />"}
    if(show.details) {html += "<span>Details: "+show.details+"</span><br />"}
    if(show.age) {html += "<span>Age: "+show.age++"</span><br />"}
    html += "</li></div><span class='spacer'> </span>"
  })
  html += "</ul>"
  return html
}