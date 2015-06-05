var localAPI = "http://localhost:5000"
var herokuAPI = "https://weinberg-powder.herokuapp.com"
var currentAPI;
if (true){
  currentAPI = localAPI;
}else{
  currentAPI = herokuAPI;
}

//
//START Resort section
//

//VARIABLES for resorts api calls
var resort_index = currentAPI + "/resorts"
var resort_show = currentAPI + "/resorts/"
var resort_name = currentAPI + "/resortsname?name="

// headers: {Authorization: 'Token token=' + token}
//AJAX FUNCTIONS for resorts

//create resort ajax call
function createResortAjax(c_json){
  $.ajax({
    url: resort_index,
    type: 'POST',
    dataType: 'json',
    data: c_json,
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("Created");
    loadResortsAjax();
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
    data: c_json,
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("Updated");
    loadResortsAjax();
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
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("Deleted");
    loadResortsAjax();
  })
  .fail(function() {
    console.log("error");
  })
}

//Ajax GET request

// get index of resort list and populate resort_list div
function loadResortsAjax(){
  // $('#full_list').html('<h2> Resorts</h2>');
  sortlist = [];
  $('#closest_list').html("")
  $.ajax({
    url: resort_index,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    //render data as HTML
    data.forEach(function(resort){
      sortResortList(resort);
    });
    var sort = numSorter(sortlist)
    sort.forEach(function(resort){
      appendClosestList(resort)
    })
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
    dataType: 'json',
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function(data) {
    if (user === "none"){
      renderShowResort(data.resort,data.powRating,data.temp);
    }else if (user==="admin"){
      renderShowResortAdmin(data.resort,data.stats);
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
var user_index = currentAPI + "/users"
var user_show = currentAPI + "/users/"
var user_name = currentAPI + "/useremail?email="
var user_register = currentAPI + "/register"

//get user on login by username
function loginUserAjax(path){
  $.ajax({
    url: path,
    contentType: 'application/json',
    processData: false,
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
        credentials: {
          email: $('#usn').val(),
          password: $('#psw').val()
        }
      })
  })
  .done(function(data) {
    token = data.token;
    isUserGod(data);
    isUserAdmin(data);
    isUser(data);
  })
  .fail(function() {
    alert("username or password incorrect");
  })
}

//createnew user
function createUserAjax(info){
  $.ajax({
      url: user_register,
      type: 'POST',
      dataType: 'json',
      data: info
    })
    .done(function() {
      $('#signUp').hide();
      $('#loggin').show();
    })
    .fail(function() {
      console.log("error");
    })
}

function updateUserAjax(path,c_json){
  $.ajax({
    url: path,
    type: 'PATCH',
    dataType: 'json',
    data: c_json,
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("Updated");
  })
  .fail(function() {
    console.log("error");
  })
}

function destroyUserAjax(path){
  $.ajax({
    url: path,
    type: 'DELETE',
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("successful delete user");
  })
  .fail(function() {
    console.log("error");
  })

}

function showUserAjax(path){
  $.ajax({
    url: path,
    type: 'GET',
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function(data) {
    renderShowUserAdmin(data)
  })
  .fail(function() {
    console.log("error");
  })

}

//
//END User section
//

//
//START favorite section
//

var favorite_index = currentAPI + "/favorites"
var favorite_show = currentAPI + "/favorites/"

function createFavoriteAjax(data){
  $.ajax({
    url: favorite_index,
    type: 'POST',
    dataType: 'json',
    data: data,
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("Created Favorite");
  })
  .fail(function() {
    console.log("error");
  })
}

function showFavoriteOfUserAjax(path){
  $.ajax({
    url: path,
    type: 'GET',
    dataType: 'json',
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function(data) {
    data.forEach(function(resort){
      renderFavorite(resort)
    });
  })
  .fail(function() {
    console.log("error");
  })
}

function destroyFavoriteAjax(path){
  $.ajax({
    url: path,
    type: 'DELETE',
    headers: { Authorization: 'Token token=' + token}
  })
  .done(function() {
    console.log("successful delete");
  })
  .fail(function() {
    console.log("error");
  })

}
//
//END favorite section
//
