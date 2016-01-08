var moment = require("moment")
var show = require('./show.js')
var gaillard = [], hometeamsi = [], hometeamwa = [], musicfarm = [], musichall = [], pourhouse = [], royalamerican = []
  , sparrow = [], theatre99 = [], tinroof = [], windjammer = [], tonight = [], thisWeek = [], woolfe =[]

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
  thisWeek.push(generateHTML(woolfe, 'Woolfe Street'))
  thisWeek.push(["</body></html>"])
  done(tonightList, thisWeek)
}

function sortShows(shows) {
  var today = show.referenceDate().format('YYYY-MM-DD')
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
    else if(venue === 'Woolfe Street') {woolfe.push(show)}
    if(show.date === today) {tonight.push(show)}
  })
}

function tonightHTML(shows) {
  var today = moment().format("MMMM Do YYYY")
  // generate all the boilerplate stuff
  var html = "<!DOCTYPE html><html><head><title>chs-tonight</title><link rel='stylesheet' type='text/css' href='./public/css/style.css' />"
  html += "<link href='http://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet' type='text/css'>"
  // google analytics
  html += "<script>"
  html += "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"
  html += "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"
  html += "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"
  html += "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"
  html += "ga('create', 'UA-72197750-1', 'auto');"
  html += "ga('send', 'pageview');"
  html += "</script></head><body>"
  // now here's the meat
  html += "<div id='nav'><a href='./about.html'>about</a></div>"
  html += "<span id='date'><h2>"+today+"</h2></span>"
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
    var newDate = []
    var date = show.date.split('-')
    var year = date[0]
    var month = date[1]
    var day = date[2]
    newDate.push(month)
    newDate.push(day)
    newDate.push(year)
    html += "<div class='showItem'><li>"
    if(show.url) {html+="<h3><a target='_blank' href='"+show.url+"'>"+show.title+"</a></h3>"}
    else {html+= "<h3>"+show.title+"</h3>"}
    html += "<span>Date: "+newDate.join('-')+"</span><br />"
    if(show.time) {html += "<span>Time: "+show.time+"</span><br />"}
    if(show.price) {html += "<span>Price: "+show.price+"</span><br />"}
    if(show.details) {html += "<span>Details: "+show.details+"</span><br />"}
    if(show.age) {html += "<span>Age: "+show.age+"</span><br />"}
    html += "</li></div><span class='spacer'> </span>"
  })
  html += "</ul>"
  return html
}

