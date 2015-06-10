'use strict'
//global var powder_iffe
var powder_iife = (function(){
  var sortlist = [];

  var lat1;
  var lon1;
  var lat2;
  var lon2;

  var localAPI = "http://localhost:5000";
  var herokuAPI = "https://weinberg-powder.herokuapp.com";
  var currentAPI;

  function deployed(){
    return true;
  }
  if (deployed()){
    currentAPI = herokuAPI;
  }else{
    currentAPI = localAPI;
  }

  var resort_index = currentAPI + "/resorts";
  var resort_show = currentAPI + "/resorts/";
  var resort_name = currentAPI + "/resortsname?name=";
  var user_index = currentAPI + "/users";
  var user_show = currentAPI + "/users/";
  var user_name = currentAPI + "/useremail?email=";
  var user_register = currentAPI + "/register";
  var favorite_index = currentAPI + "/favorites";
  var favorite_show = currentAPI + "/favorites/";

  //determine which quote to display
  function quote(rating,month){
    var needGo = "Call In Sick And Grab Your Boots";
    var betterGo = "I Doubt Your Boss Will Mind";
    var shouldGo = "It Better Be The Weekend Already";
    var maybeGo = "At Least Nobody Else Will Be There";
    var noGo = "If You Are Desperate But Then Again Spring Conditions";
    var summer = "Let's Go Surfing Instead";
    if (month < 4 || month > 10){
      if ((rating/20) <= 1) {
        return noGo;
      }
      else if ((rating/20) <= 2){
        return maybeGo;
      }
      else if ((rating/20) <= 3) {
        return shouldGo;
      }
      else if ((rating/20) <= 4) {
        return betterGo;
      }
      else{
        return needGo;
      }
    }
    else{
        return summer;
    }
  }


  var zeta = document.getElementById("Ulocation");
  var delta = document.getElementById("URdistance");

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setPosition);
      } else {
          zeta.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  function setPosition(position) {
      lat1 = position.coords.latitude;
      lon1 = position.coords.longitude;
  }

  function calcDistance(){
    function toRad(num){
      return num * (Math.PI / 180);
    }
    var Eradius = 6371; // kilometers
    var φ1 = toRad(lat1);
    var φ2 = toRad(lat2);
    var Δφ = toRad((lat2-lat1));
    var Δλ = toRad((lon2-lon1));

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = Eradius * c;
    var miles = Math.round(d * 0.621371);
    return miles;
  }

  function showDistance(){
    var dist = calcDistance();
    if (dist) {
    delta.innerHTML = "Miles: " + dist;
    }
  }

  //GOD priviliges
  function GODPRIV(){
    $('#create_crud').on('click', function(){
      var c_json = getCRUDData();
      createResortAjax(c_json);
    });
    $('#read_crud_ID').on('click', function(){
      var c_json = getCRUDData();
      var path = (resort_show + $('#ID_crud').val());
      showResortAjax(path,"admin");
    });
    $('#read_crud_name').on('click', function(){
      var c_json = getCRUDData();
      var path = resort_name + c_json.resort.name;
      showResortAjax(path,"admin");
    });
    $('#update_crud').on('click', function(){
      var id = $('#ID_crud').val();
      var c_json = getCRUDData();
      var updateAPI = resort_show + id;
      updateResortAjax(updateAPI,c_json);
    });
    $('#destroy_crud_id').on('click', function(){
      var c_json = getCRUDData();
      var deleteAPI = (resort_show + $('#ID_crud').val());
      deleteResortAjax(deleteAPI);
    });
    $('#destroy_crud_name').on('click', function(){
      var c_json = getCRUDData();
      var deleteAPI = resort_name + c_json.resort.name;
      deleteResortAjax(deleteAPI);
    });
    //user Crud
    $('#User_destroy_crud_id').on('click', function(){
      var user = $('#User_ID_crud').val();
      var path = user_show + user;
      destroyUserAjax(path);
    });
    $('#User_update_crud').on('click', function(){
      var user = $('#User_ID_crud').val();
      var path = user_show + user;
      var privileges = $('#User_priv_crud').val();
      var c_json = {"user":{"privileges":privileges}};
      updateUserAjax(path,c_json);
    });
    $('#User_read_id').on('click', function(){
      var user = $('#User_ID_crud').val();
      var path = user_show + user;
      showUserAjax(path);
    });
    $('#User_read_name').on('click', function(){
      var user = $('#User_email_crud').val();
      var path = user_name + user;
      showUserAjax(path);
    });
  }

  //ADMIN priviliges
  function ADMINPRIV(){
    $('#create_crud').on('click', function(){
      var c_json = getCRUDData();
      createResortAjax(c_json);
    });
    $('#read_crud_ID').on('click', function(){
      var c_json = getCRUDData();
      var path = (resort_show + $('#ID_crud').val());
      showResortAjax(path,"admin");
    });
    $('#read_crud_name').on('click', function(){
      var c_json = getCRUDData();
      var path = resort_name + c_json.resort.name;
      showResortAjax(path,"admin");
    });
    $('#update_crud').on('click', function(){
      var id = $('#ID_crud').val();
      var c_json = getCRUDData();
      var updateAPI = resort_show + id;
      updateResortAjax(updateAPI,c_json);
    });
    $('#destroy_crud_id').on('click', function(){
      var c_json = getCRUDData();
      var deleteAPI = (resort_show + $('#ID_crud').val());
      deleteResortAjax(deleteAPI);
    });
    $('#destroy_crud_name').on('click', function(){
      var c_json = getCRUDData();
      var deleteAPI = resort_name + c_json.resort.name;
      deleteResortAjax(deleteAPI);
    });
  }

  //retrieve CRUD data form info and return a json with it
  function getCRUDData(){
    var c_name = $('#name_crud').val();
    var c_vertical = $('#vertical_crud').val();
    c_vertical = Number(c_vertical);
    var c_acres = $('#acres_crud').val();
    c_acres = Number(c_acres);
    var c_location = $('#location_crud').val();
    c_location = "pws:" + c_location;
    var c_json = {"resort":{"name":c_name,"vertical":c_vertical, "acres":c_acres,"location":c_location}};
    return c_json;
  }

  //render response for normal user
  function renderShowResort(data,rating,temp){
    var date = new Date();
    $('#resort_info').html("<h2 id=" + "favorite" +data.id + ">" + data.name + "</h2>" + "<h4 id='vertical'>Vertical Feet: " + data.vertical + "</h4>" +   "<h4 id='acres'>Skiable Acres: " + data.acres + "</h4>");
    lat2 = data.latitude;
    lon2 = data.longitude;
    showDistance();
    $('#rating').html("Powder Index: " + rating);
    if (temp){
      $('#resort_info').append("<h4 id='current_temp_f'>Temp: " + temp + " ℉ </h4>");
    }
    $('#wunderground').show();
    $('#quote').html(quote(rating,parseInt(date.getMonth())));
  }

  //render response on superuser resort request
  function renderShowResortAdmin(data,stats){
    $('#resorts_info_admin').html("<h3 id=admin_resort>"+ "ID: " +data.id+ " Name: "+ data.name + " Vertical: " + data.vertical +" Acres: "+ data.acres + " Station: " + data.location + " Users: "+ stats +"</h3>");
  }
  //redner respose to superuser user requert
  function renderShowUserAdmin(data){
    $('#users_info_admin').html("<h3 id=admin_user>"+ "ID: " +data.id+ " Name: "+ data.name + " Email: " + data.email +" Privileges: "+ data.privileges+ "</h3>");
  }

  //render response to resort list

  function sortResortList(resort){
    var name = resort.name.replace(/ /g,"%20");
    var idname = ("closest" + name);
    lat2 = resort.latitude;
    lon2 = resort.longitude;
    var dist = calcDistance();
    sortlist.push({id:idname, distance:dist,name: resort.name});
  }

  function appendClosestList(resort){
    if (resort.distance === 5265 || !resort.distance){
     $('#closest_list').append("<li class='resort' id=" + resort.id + ">" + resort.name + "</li>");
    }else{
        $('#closest_list').append("<li class='resort' id=" + resort.id + ">" + resort.name +  " " + resort.distance + " mi. " + "</li>");
    }
  }

  function numSorter(sortlist){
    sortlist.sort(function (a, b) {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return sortlist;
  }


  //new user sign up
  function createUser(){
    var info = getUserInfo();
    if (info.user.name === "" || info.user.username === "" || info.user.password === ""){
      alert("Must enter a Name, Username and Password");
    }else{
    createUserAjax(info);
    }
  }

  //get user input for signing up
  function getUserInfo(){
    var f_name = $('#new_fname').val();
    var email = $('#new_username').val();
    var password = $('#new_password').val();
    var info = {"user":{"name":f_name,"email":email, "password":password ,"privileges":"none"}};
    return info;
  }

  function isUserGod(data){
    if (data.privileges === "god"){
      $('#loggin').hide();
      $('#logged_in_name').html("Welcome " + data.name);
      $('#logged_in').show(300);
      console.log("logged in as God");
      $('#toggle_privileges_button').show();
      $('#resort_column').hide();
      $('#pow_factor').hide();
      $('#about_page').hide();
      $('#un_favorite_button').hide();
      $('#search_container').show(300);
      $('#super_div').show(300);
      $('#favorite_list_button').show(300);
      $('#favorite_button_div').show(300);
      sessionStorage.setItem('userUID',data.id);
      GODPRIV();
    }
  }

  function isUserAdmin(data){
    if (data.privileges === "admin"){
      $('#loggin').hide();
      $('#logged_in_name').html("Welcome " + data.name);
      $('#logged_in').show(300);
      console.log("logged in as Admin");
      $('#resort_column').hide();
      $('#pow_factor').hide();
      $('#about_page').hide();
      $('#user_crud').hide();
      $('#un_favorite_button').hide();
      $('#search_container').show(300);
      $('#super_div').show(300);
      $('#resort_crud').show(300);
      $('#toggle_privileges_button').show(300);
      $('#favorite_list_button').show(300);
      $('#favorite_button_div').show(300);
      sessionStorage.setItem('userUID',data.id);
      ADMINPRIV();
    }
  }
  function isUser(data){
    if (data.privileges === "none"){
      $('#loggin').hide();
      $('#un_favorite_button').hide();
      $('#search_container').show(300);
      $('#logged_in_name').html("Welcome " + data.name);
      $('#logged_in').show(300);
      $('#favorite_list_button').show(300);
      $('#favorite_button_div').show(300);
      sessionStorage.setItem('userUID',data.id);
    }
  }


  function createFavorite(resortID,userUID,name){
    var data = {"favorite":{"user":userUID,"resort":resortID,"name":name}};
    createFavoriteAjax(data);
    $('#favorite_list').html("");
    setTimeout(function(){showFavoriteOfUser(userUID);}, 200);
  }

  function destroyFavorite(resortID,userUID){
    var path = favorite_show + userUID + "/"+ resortID;
    destroyFavoriteAjax(path);
    $('#favorite_list').html("");
    setTimeout(function(){showFavoriteOfUser(userUID);}, 200);
  }

  function showFavoriteOfUser(userID){
    var path = (favorite_show + userID);
    $('#favorite_list').html("");
    showFavoriteOfUserAjax(path);
  }


  function renderFavorite(data){
    var name = data.name.replace(/ /g,"%20");
    $('#favorite_list').append("<li class='resort' id=" + "favorite" + name + ">" + data.name + "</li>");
  }





  //create resort ajax call
  function createResortAjax(c_json){
    $.ajax({
      url: resort_index,
      type: 'POST',
      dataType: 'json',
      data: c_json,
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("Created");
      loadResortsAjax();
    })
    .fail(function() {
      console.log("error");
    });
  }
  //update resort ajax call by id
  function updateResortAjax(path,c_json){
    $.ajax({
      url: path,
      type: 'PATCH',
      dataType: 'json',
      data: c_json,
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("Updated");
      loadResortsAjax();
    })
    .fail(function() {
      console.log("error");
    });
  }
  //delete resort ajax call by path
  function deleteResortAjax(path){
    $.ajax({
      url: path,
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("Deleted");
      loadResortsAjax();
    })
    .fail(function() {
      console.log("error");
    });
  }

  function loadResortsAjax(){
    // $('#full_list').html('<h2> Resorts</h2>');
    sortlist = [];
    $('#closest_list').html("");
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
      var sort = numSorter(sortlist);
      sort.forEach(function(resort){
        appendClosestList(resort);
      });
    })
    .fail(function() {
      setTimeout(function(){loadResortsAjax();}, 3000);
      console.log("error");
    });
  }

  function showResortAjax(path,user){
    $.ajax({
      url: path,
      type: 'GET',
      dataType: 'json',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
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
    });
  }
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
      // token = data.token;
      sessionStorage.setItem('powder-token',data.token);
      isUserGod(data);
      isUserAdmin(data);
      isUser(data);
    })
    .fail(function() {
      alert("username or password incorrect");
    });
  }
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
      });
  }

  function updateUserAjax(path,c_json){
    $.ajax({
      url: path,
      type: 'PATCH',
      dataType: 'json',
      data: c_json,
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("Updated");
    })
    .fail(function() {
      console.log("error");
    });
  }

  function destroyUserAjax(path){
    $.ajax({
      url: path,
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("successful delete user");
    })
    .fail(function() {
      console.log("error");
    });

  }

  function showUserAjax(path){
    $.ajax({
      url: path,
      type: 'GET',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function(data) {
      renderShowUserAdmin(data);
    })
    .fail(function() {
      console.log("error");
    });

  }


  function createFavoriteAjax(data){
    $.ajax({
      url: favorite_index,
      type: 'POST',
      dataType: 'json',
      data: data,
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("Created Favorite");
    })
    .fail(function() {
      console.log("error");
    });
  }

  function showFavoriteOfUserAjax(path){
    $.ajax({
      url: path,
      type: 'GET',
      dataType: 'json',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function(data) {
      data.forEach(function(resort){
        renderFavorite(resort);
      });
    })
    .fail(function() {
      console.log("error");
    });
  }

  function destroyFavoriteAjax(path){
    $.ajax({
      url: path,
      type: 'DELETE',
      headers: { Authorization: 'Token token=' + sessionStorage.getItem('powder-token')}
    })
    .done(function() {
      console.log("successful delete");
    })
    .fail(function() {
      console.log("error");
    });

  }

  return {
          getLocation: getLocation,
          createFavorite: createFavorite,
          destroyFavorite: destroyFavorite,
          showFavoriteOfUser: showFavoriteOfUser,
          createUser: createUser,
          showResortAjax: showResortAjax,
          loadResortsAjax: loadResortsAjax,
          loginUserAjax: loginUserAjax,
          resort_name: resort_name,
          currentAPI: currentAPI
        };

})();
