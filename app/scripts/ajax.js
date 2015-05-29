
//
//START Resort section
//

//
//VARIABLES for resorts api calls
//

var resort_index = "http://localhost:5000/resorts"
var resort_show = "http://localhost:5000/resorts/"
var resort_name = "http://localhost:5000/resortsname?name="

//
//AJAX FUNCTIONS for resorts
//

//create resort ajax call
function createResortAjax(c_json){
  $.ajax({
    url: resort_index,
    type: 'POST',
    dataType: 'json',
    data: c_json
  })
  .done(function() {
    console.log("Created");
  })
  .fail(function() {
    console.log("error");
  })
}
//update resort ajax call
function updateResortAjax(path,c_json){
  $.ajax({
    url: path,
    type: 'PATCH',
    dataType: 'json',
    data: c_json
  })
  .done(function() {
    console.log("Updated");
  })
  .fail(function() {
    console.log("error");
  })
}
//delete resort ajax call
function deleteResortAjax(path){
  $.ajax({
    url: path,
    type: 'DELETE',
  })
  .done(function() {
    console.log("Deleted");
  })
  .fail(function() {
    console.log("error");
  })
}

//
//Ajax GET requests
//
// get index of resort list and populate resort_list div
function loadResortsAjax(){
  $('#resort_list').html('<h2> Resorts</h2>');
  $.ajax({
    url: resort_index,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    //render data as HTML
    data.forEach(function(resort){
      appendResortList(resort);
    });
  })
  .fail(function() {
    console.log("error");
  })
}

//get resort Ajax call by ID
function showResortAjax(dbID,user){
  $.ajax({
    url: (resort_show + dbID),
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    if (user === "none"){
      renderShowResort(data.resort,data.weather);
    }else if (user==="admin"){
      renderShowResortAdmin(data.resort,data.weather);
    }
  })
  .fail(function() {
    console.log("error");
  })
}

//get ajax call by name
function searchAndShowResort(searchAPI,user){
  $.ajax({
    url: searchAPI,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    if (user === "none"){
      renderShowResort(data.resort,data.weather);
    }else if (user==="admin"){
      renderShowResortAdmin(data.resort,data.weather);
    }
  })
  .fail(function() {
    console.log("error");
  })
}





//
//END Resort section
//
//START User section
//




//
//END User section
//
