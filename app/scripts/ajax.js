//
//START Resort section
//

//VARIABLES for resorts api calls
var resort_index = "http://localhost:5000/resorts"
var resort_show = "http://localhost:5000/resorts/"
var resort_name = "http://localhost:5000/resortsname?name="


//AJAX FUNCTIONS for resorts

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
//update resort ajax call by id
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
//delete resort ajax call by path
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

//Ajax GET requests

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

//get resort by path
function showResortAjax(path,user){
  $.ajax({
    url: path,
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

//Variables for user calls
var user_index = "http://localhost:5000/users"
var user_show = "http://localhost:5000/users/"
var user_name = "http://localhost:5000/usersname?username="

//createnew user
function createUserAjax(info){
  $.ajax({
      url: user_index,
      type: 'POST',
      dataType: 'json',
      data: info
    })
    .done(function() {
      console.log("Created");
      location.reload();
    })
    .fail(function() {
      console.log("error");
      alert("Username Unavailable")
    })
}

//get user on login by username
function showUserAjax(path){
  $.ajax({
    url: path,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    isUserGod(data);
    isUserAdmin(data);
    isUser(data);
  })
  .fail(function() {
    console.log("Failure");
    location.reload();
  })
}


//
//END User section
//
