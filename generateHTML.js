var moment = require("moment")
var gaillard = [], hometeamsi = [], hometeamwa = [], musicfarm = [], musichall = [], pourhouse = [], royalamerican = []
  , sparrow = [], theatre99 = [], tinroof = [], windjammer = [], tonight = []

module.exports = function(shows) {
  sortShows(shows)
  var tonightList = tonightHTML(tonight)
}

function sortShows(shows) {
  var today = moment().toISOString().slice(0,10)
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
    else {console.log('nope')}
    if(show.date === today) {tonight.push(show)}
  })
}

function tonightHTML(shows) {
  var html = "<h1>TONIGHT</h1><ul>"
  shows.forEach(function(show) {
    html += "<li><h2>"+show.venue+"</h2>"
    if(show.url) {html+="<h4><a href='"+show.url+"'>"+show.title+"</a></h4>"}
    else {html+= "<h4>"+show.title+"</h4>"}
    if(show.time) {html += "<span>Time: "+show.time+"</span><br />"}
    if(show.price) {html += "<span>Price: "+show.price+"</span><br />"}
    if(show.details) {html += "<span>Details: "+show.details+"</span><br />"}
    html += "</li>"
  })
  html += "</ul>"
  return html
}