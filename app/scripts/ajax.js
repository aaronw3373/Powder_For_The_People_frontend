var resort_index = "http://localhost:5000/resorts"
var resort_show = "http://localhost:5000/resorts/"
var wsp1 = "http://api.wunderground.com/api/"
var wsp2 =  "/conditions/q/"
var wsp3 = ".json"
var key = "00000fakekey00000"
function loadResorts(){
  new $.ajax({
    url: resort_index,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    data.forEach(function(resort){
      $('#resort_list').append("<h3 class='resort' id=" + "resort" +resort.id + ">" + resort.name + "</h3>");
    });
  })
  .fail(function() {
    console.log("error");
  })
}
loadResorts();


function CRUDPRIV(){
  console.log("been clicked");
  $('#create_crud').on('click', function(){

    var c_name = $('#name_crud').val()
    c_name = c_name
    var c_vertical = $('#vertical_crud').val()
    c_vertical = Number(c_vertical)
    var c_acres = $('#acres_crud').val()
    c_acres = Number(c_acres)
    var c_state = $('#state_crud').val()
    c_state = c_state.toUpperCase()
    var c_location = $('#location_crud').val()
    c_location = c_location.replace(/ /g,"_");
    var c_json = {"resorts":{"name":c_name,"vertical":c_vertical, "acres":c_acres,"state":c_state,"location":c_location}}
    console.log(c_json);
    new $.ajax({
      url: resort_index,
      type: 'POST',
      dataType: 'json',
      data: c_json,
    })
    .done(function() {
      console.log("Created");
    })
    .fail(function() {
      console.log("error");
    })
  });
}

$(document).ready(function() {

  //start resort on click
  $('.resort').on('click',function(event){
    var dbID = parseInt(event.target.id.substring(6));
    new $.ajax({
      url: (resort_show + dbID),
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      var date = new Date();
      $('#resort_name').html(data.name);
      $('#vertical').html("Vertical Feet: " + data.vertical);
      $('#acres').html("Skiable Acres: " + data.acres);
      $('#rating').html("Powder Rating: " + (rating(data.vertical,data.acres,0)));
      $('#quote').html(quote(rating(data.vertical,data.acres),parseInt(date.getMonth()),0));
      new $.ajax({
        url: wsp1 + key + wsp2 + data.state + "/" + data.location + wsp3,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data) {
        $('#current_temp_f').html("Current Temp: " + data.current_observation.temp_f + " ℉");
      })
      .fail(function() {
        console.log("error");
      })
    })
    .fail(function() {
      console.log("error");
    })
  });
  //end resort on click



});
