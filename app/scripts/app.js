var userUID;

//The magic algorithm woah...
function rating(vertical,acres,snowfall){
  return Math.round(((2000 + vertical + acres)/500)*(1+snowfall));
};

//determine which quote to display
function quote(rating,month){
  //variables for each quote as string
  var needGo = "Call In Sick And Grab Your Boots";
  var betterGo = "I Doubt Your Boss Will Mind";
  var shouldGo = "It Better Be The Weekend Already";
  var maybeGo = "At Least Nobody Else Will Be There";
  var noGo = "If You Are Desperate But Then Again Spring Conditions";
  var summer = "Let's Go Surfing Instead"
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
      return needGo
    }
  }
  else{
      return summer;
  }
};

//Allow CRUD privileges when logged in as super user
//gives user these commands as click handlers
function CRUDPRIV(){
  $('#create_crud').on('click', function(){
    var c_json = getCRUDData()
    createResortAjax(c_json);
    loadResortsAjax();
  });
  $('#read_crud_ID').on('click', function(){
    c_json = getCRUDData()
    var path = (resort_show + $('#ID_crud').val())
    showResortAjax(path,"admin")
  });
  $('#read_crud_name').on('click', function(){
    c_json = getCRUDData()
    var path = resort_name + c_json.resort.name
    showResortAjax(path,"admin")
  });
  $('#update_crud').on('click', function(){
    var id = $('#ID_crud').val()
    c_json = getCRUDData()
    var updateAPI = resort_show + id
    updateResortAjax(updateAPI,c_json);
    loadResortsAjax();
  });
  $('#destroy_crud_id').on('click', function(){
    c_json = getCRUDData()
    var deleteAPI = (resort_show + $('#ID_crud').val())
    deleteResortAjax(deleteAPI);
    loadResortsAjax();
  });
  $('#destroy_crud_name').on('click', function(){
    c_json = getCRUDData()
    var deleteAPI = resort_name + c_json.resort.name
    deleteResortAjax(deleteAPI);
    loadResortsAjax();
  });
}

//retrieve CRUD data form info and return a json with it
function getCRUDData(){
  var c_name = $('#name_crud').val();
  var c_vertical = $('#vertical_crud').val()
  c_vertical = Number(c_vertical)
  var c_acres = $('#acres_crud').val()
  c_acres = Number(c_acres)
  var c_location = $('#location_crud').val()
  c_location = "pws:" + c_location
  var c_json = {"resort":{"name":c_name,"vertical":c_vertical, "acres":c_acres,"location":c_location}}
  return c_json;
}

//
//render AJAX responses
//
//render response for normal user
function renderShowResort(data,weather){
  var date = new Date();
  $('#resort_info').html("<h2 id=" + "favorite" +data.id + ">" + data.name + "</h2>" + "<h4 id='vertical'>Vertical Feet: " + data.vertical + "</h4>" +   "<h4 id='acres'>Skiable Acres: " + data.acres + "</h4>" + "<h4 id='current_temp_f'>Temp: " + weather.current_observation.temp_f + " ℉ </h4>");
  $('#favorite_button').show();
  $('#wunderground').show();
  $('#rating').html("Powder Index: " + (rating(data.vertical,data.acres,0)));
  $('#quote').html(quote(rating(data.vertical,data.acres),parseInt(date.getMonth()),0));
}

//render response on superuser page
function renderShowResortAdmin(data,weather){
  $('#resorts_info_admin').html("<h3>"+ "ID: " +data.id+ " name: "+ data.name + " vertical: " + data.vertical +" acres: "+ data.acres + " location: " + data.location + "</h3>");
}

//render response to resort list
function appendResortList(resort){
  var name = resort.name.replace(/ /g,"%20");
  $('#full_list').append("<h3 class='resort' id=" + "resort" + name + ">" + resort.name + "</h3>");
}

//new user sign up
function createUser(){
  var info = getUserInfo();
  if (info.user.name === "" || info.user.username === ""){
    alert("Must enter a Name, Username and Password")
  }else{
  createUserAjax(info);
  }
}

//get user input for signing up
function getUserInfo(){
  var f_name = $('#new_fname').val();
  var u_name = $('#new_username').val();
  var password = $('#new_password').val();
  var info = {"user":{"name":f_name,"username":u_name, "password":password ,"privileges":"none"}}
  return info;
}

function isUserGod(data){
  if (data.privileges === "god"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    console.log("loged in as God");
    $('#super_div').toggle()
    $('#resort_info').toggle()
    $('#pow_factor').toggle()
    userUID = data.id
    CRUDPRIV();
  }
}
function isUserAdmin(data){
  if (data.privileges === "admin"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    userUID = data.id
  }
}
function isUser(data){
  if (data.privileges === "none"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    userUID = data.id
    showFavoriteOfUser(userUID);
  }
}


function createFavorite(resortID,userUID){
  var data = {"favorite":{"user":userUID,"resort":resortID}}
  createFavoriteAjax(data);
}

function showFavoriteOfUser(userID){
  var path = (favorite_show + userID)
  showFavoriteOfUserAjax(path)
}

function callFavorite(data){
  var path = resort_show + data.resort
  showResortAjax(path,"favorite")
}

function renderFavorite(data){
  var name = data.name.replace(/ /g,"%20");
  $('#favorite_list').append("<h3 class='resort' id=" + "favorite" + name + ">" + data.name + "</h3>");
}





//
//RUN TIME
//
//AND
//
//CLICK HANDLERS
//


$(document).ready(function() {
  //poulate full_list div
  loadResortsAjax();

  //resort list click to show resort
  $('#full_list').on('click', '.resort', function(event){
    var path = (resort_name + event.target.id.substring(6));
    console.log(path);
    showResortAjax(path,"none");
  });

  //search bar on search_utton click
  $('#search_button').on('click', function(){
    var path = (resort_name + $('#search_box').val())
    console.log(path);
    showResortAjax(path,"none");
    return false;
  });

  //about_button on click
  $('#about_button').on('click', function(){
    console.log("about click");
    //slide onto div row main a short about_page for the app and how/why
    //make so clicking anything else hides the about_page
  });

  //Click wunderground logo takes you to wunderground site
  $('#wunderground').on('click',function(){
    window.open("http://www.wunderground.com/?apiref=390cac5ce90ab221");
  });

  //favorite resort button
  $('#favorite_button').on('click',function(){
    var resortID = $('#resort_info h2').attr('id');
    resortID = resortID.substring(8)
    var userID = userUID;
    createFavorite(resortID,userID)
  })

  $('#favorite_list_button').on('click',function(){
    $('#full_list').hide()
    $('#favorite_list').show()
  });

  $('#resort_list_button').on('click',function(){
    $('#favorite_list').hide()
    $('#full_list').show()
  });;

  $('#favorite_list').on('click', '.resort', function(event){
    var path = (resort_name + event.target.id.substring(8));
    console.log(path);
    showResortAjax(path,"none");
  });

  //login button on click with hard coded admin used info to CRUD
  $('#login_button').on('click', function(){
    var username = $('#usn').val()
    var password = $('#psw').val()
    var path = (user_name + username)
    //var data = {"user":{"username":username,"password":password}}
    //replace true in the if statement with the authenticator
    if(true){
      showUserAjax(path);
      console.log("logging in")
    }else{
      alert("username or password incorrect");
    }
    return false;
  });

  //sign up click to sign up
  $('#signUp_button').on('click',function(){
    $('#loggin').hide();
    $('#signUp').show();
    return false;
  });

  //sign up submit
  $('#new_signup').on('click', function(){
    createUser();
  });

  //logout button
  $('#logout_button').on('click',function(){
    console.log("logging out");
    location.reload();
  });
});


