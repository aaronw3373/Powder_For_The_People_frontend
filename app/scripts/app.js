var sortlist;
var userUID;
var token;
var lat1;
var lon1;
var lat2;
var lon2;


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

var zeta = document.getElementById("Ulocation");
var delta = document.getElementById("URdistance");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        zeta.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat1 = position.coords.latitude
    lon1 = position.coords.longitude
}
getLocation();


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
  var miles = Math.round(d * 0.621371)
  return miles
}

function showDistance(){
  var dist = calcDistance()
  if (dist) {
  delta.innerHTML = "Miles: " + dist
  }
}
//Allow CRUD privileges when logged in as super user
//gives user these commands as click handlers
function ADMINPRIV(){
  $('#create_crud').on('click', function(){
    var c_json = getCRUDData()
    createResortAjax(c_json);
  });
  $('#read_crud_ID').on('click', function(){
    var c_json = getCRUDData()
    var path = (resort_show + $('#ID_crud').val())
    showResortAjax(path,"admin")
  });
  $('#read_crud_name').on('click', function(){
    var c_json = getCRUDData()
    var path = resort_name + c_json.resort.name
    showResortAjax(path,"admin")
  });
  $('#update_crud').on('click', function(){
    var id = $('#ID_crud').val()
    var c_json = getCRUDData()
    var updateAPI = resort_show + id
    updateResortAjax(updateAPI,c_json);
  });
  $('#destroy_crud_id').on('click', function(){
    var c_json = getCRUDData()
    var deleteAPI = (resort_show + $('#ID_crud').val())
    deleteResortAjax(deleteAPI);
  });
  $('#destroy_crud_name').on('click', function(){
    var c_json = getCRUDData()
    var deleteAPI = resort_name + c_json.resort.name
    deleteResortAjax(deleteAPI);
  });
}
function GODPRIV(){
  $('#create_crud').on('click', function(){
    var c_json = getCRUDData()
    createResortAjax(c_json);
  });
  $('#read_crud_ID').on('click', function(){
    var c_json = getCRUDData()
    var path = (resort_show + $('#ID_crud').val())
    showResortAjax(path,"admin")
  });
  $('#read_crud_name').on('click', function(){
    var c_json = getCRUDData()
    var path = resort_name + c_json.resort.name
    showResortAjax(path,"admin")
  });
  $('#update_crud').on('click', function(){
    var id = $('#ID_crud').val()
    var c_json = getCRUDData()
    var updateAPI = resort_show + id
    updateResortAjax(updateAPI,c_json);
  });
  $('#destroy_crud_id').on('click', function(){
    var c_json = getCRUDData()
    var deleteAPI = (resort_show + $('#ID_crud').val())
    deleteResortAjax(deleteAPI);
  });
  $('#destroy_crud_name').on('click', function(){
    var c_json = getCRUDData()
    var deleteAPI = resort_name + c_json.resort.name
    deleteResortAjax(deleteAPI);
  });
  //user Crud
  $('#User_destroy_crud_id').on('click', function(){
    var user = $('#User_ID_crud').val()
    var path = user_show + user
    destroyUserAjax(path);
  });
  $('#User_update_crud').on('click', function(){
    var user = $('#User_ID_crud').val()
    var path = user_show + user
    var privileges = $('#User_priv_crud').val()
    var c_json = {"user":{"privileges":privileges}}
    updateUserAjax(path,c_json);
  })
  $('#User_read_id').on('click', function(){
    var user = $('#User_ID_crud').val()
    var path = user_show + user
    showUserAjax(path);
  })
  $('#User_read_name').on('click', function(){
    var user = $('#User_email_crud').val()
    var path = user_name + user
    showUserAjax(path);
  })
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
function renderShowResort(data,rating,temp){
  var date = new Date();
  $('#resort_info').html("<h2 id=" + "favorite" +data.id + ">" + data.name + "</h2>" + "<h4 id='vertical'>Vertical Feet: " + data.vertical + "</h4>" +   "<h4 id='acres'>Skiable Acres: " + data.acres + "</h4>");
  lat2 = data.latitude
  lon2 = data.longitude
  showDistance()
  $('#rating').html("Powder Index: " + rating);
  if (temp){
    $('#resort_info').append("<h4 id='current_temp_f'>Temp: " + temp + " ℉ </h4>")
  }
  $('#wunderground').show();
  $('#quote').html(quote(rating,parseInt(date.getMonth())));
}

//render response on superuser resort request
function renderShowResortAdmin(data){
  $('#resorts_info_admin').html("<h3 id=admin_resort>"+ "ID: " +data.id+ " Name: "+ data.name + " Vertical: " + data.vertical +" Acres: "+ data.acres + " Station: " + data.location + "</h3>");
}
//redner respose to superuser user requert
function renderShowUserAdmin(data){
  $('#users_info_admin').html("<h3 id=admin_user>"+ "ID: " +data.id+ " Name: "+ data.name + " Email: " + data.email +" Privileges: "+ data.privileges+ "</h3>");
}

//render response to resort list

function sortResortList(resort){
  var name = resort.name.replace(/ /g,"%20");
  var idname = ("closest" + name);
  lat2 = resort.latitude
  lon2 = resort.longitude
  var dist = calcDistance()
  sortlist.push({id:idname, distance:dist,name: resort.name});
}

function appendClosestList(resort){
  console.log(resort.distance)
  if (resort.distance === 5265 || !resort.distance){
   $('#closest_list').append("<h3 class='resort' id=" + resort.id + ">" + resort.name + "</h3>");
  }else{
      $('#closest_list').append("<h3 class='resort' id=" + resort.id + ">" + resort.distance +  " " + resort.name + "</h3>");
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
    alert("Must enter a Name, Username and Password")
  }else{
  createUserAjax(info);
  }
}

//get user input for signing up
function getUserInfo(){
  var f_name = $('#new_fname').val();
  var email = $('#new_username').val();
  var password = $('#new_password').val();
  var info = {"user":{"name":f_name,"email":email, "password":password ,"privileges":"none"}}
  return info;
}

function isUserGod(data){
  if (data.privileges === "god"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    console.log("logged in as God");
    $('#toggle_privileges_button').show()
    $('#resort_column').hide()
    $('#pow_factor').hide()
    $('#about_page').hide()
    $('#super_div').show()
    $('#favorite_list_button').show()
    $('#favorite_button_div').show()
    userUID = data.id
    GODPRIV();
  }
}

function isUserAdmin(data){
  if (data.privileges === "admin"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    console.log("logged in as Admin")
    $('#resort_column').hide()
    $('#pow_factor').hide()
    $('#about_page').hide()
    $('#user_crud').hide()
    $('#super_div').show()
    $('#toggle_privileges_button').show()
    $('#favorite_list_button').show()
    $('#favorite_button_div').show()
    userUID = data.id
    ADMINPRIV()
  }
}
function isUser(data){
  if (data.privileges === "none"){
    $('#loggin').hide()
    $('#logged_in').show()
    $('#logged_in_name').html("Welcome " + data.name)
    $('#favorite_list_button').show()
    $('#favorite_button_div').show()
    userUID = data.id
  }
}


function createFavorite(resortID,userUID){
  var data = {"favorite":{"user":userUID,"resort":resortID}}
  createFavoriteAjax(data);
  $('#favorite_list').html("")
  showFavoriteOfUser(userUID)
}

function destroyFavorite(resortID,userUID){
  var path = favorite_show + userUID + "/"+ resortID
  destroyFavoriteAjax(path);
  $('#favorite_list').html("")
  showFavoriteOfUser(userUID)
}

function showFavoriteOfUser(userID){
  var path = (favorite_show + userID)
  $('#favorite_list').html("");
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

  //resort list click to show resort
    $('#favorite_list').on('click', '.resort', function(event){
    var path = (resort_name + event.target.id.substring(8));
    $('#about_page').hide()
    $('#super_div').hide()
    $('#favorite_button').hide()
    showResortAjax(path,"none")
    $('#resort_column').show()
    $('#pow_factor').show()
    $('#pow_factor_info').show()
    $('#un_favorite_button').show()
  });

  $('#closest_list').on('click', '.resort', function(event){
    var path = (resort_name + event.target.id.substring(7));
    $('#about_page').hide()
    $('#super_div').hide()
    $('#un_favorite_button').hide()
    showResortAjax(path,"none")
    $('#resort_column').show()
    $('#pow_factor').show()
    $('#pow_factor_info').show()
    $('#favorite_button').show()

  });

  //search bar on search_utton click
  $('#search_button').on('click', function(){
    var path = (resort_name + $('#search_box').val())
    $('#about_page').hide()
    $('#super_div').hide()
    showResortAjax(path,"none");
    if (userUID !== undefined){
      $('#favorite_button').show()
    }
    $('#resort_column').show()
    $('#pow_factor').show()
    $('#pow_factor_info').show()
    $('#search_box').val("")
    return false;
  });
  $(search_box).keyup(function(event) {
    if (event.keyCode === 13){
      var path = (resort_name + $('#search_box').val())
      $('#about_page').hide()
      $('#super_div').hide()
      showResortAjax(path,"none");
      if (userUID !== undefined){
        $('#favorite_button').show()
      }
      $('#resort_column').show()
      $('#pow_factor').show()
      $('#pow_factor_info').show()
      $('#search_box').val("")
      return false;
    }
  });

  //about_button on click
  $('#about_button').on('click', function(){
    $('#resort_column').hide()
    $('#pow_factor').hide()
    $('#super_div').hide()
    $('#about_page').show()
    //slide onto div row main a short about_page for the app and how/why
    //make so clicking anything else hides the about_page
  });

  $('#toggle_privileges_button').on('click',function(){
    $('#super_div').toggle()
    $('#resort_column').toggle()
    $('#pow_factor').toggle()
  })

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
  //UNFAVORITE RESORT BUTTON
  $('#un_favorite_button').on('click',function(){
    var resortID = $('#resort_info h2').attr('id');
    resortID = resortID.substring(8)
    var userID = userUID;
    destroyFavorite(resortID,userID)
  })

  //favorite header button to display list
  $('#favorite_list_button').on('click',function(){
    $('#closest_list').hide()
    $('#favorite_list').show()
    $('#favorite_list').html("")
    showFavoriteOfUser(userUID);
  });



  $('#closest_list_button').on('click',function(){
    $('#favorite_list').hide()
    $('#closest_list').show()
    loadResortsAjax()
  });

  //login button on click with hard coded admin used info to CRUD
  $('#login_button').on('click', function(){
    var email = $('#usn').val()
    var password = $('#psw').val()
    var path = (user_index + "login")
    //var data = {"user":{"username":username,"password":password}}
    //replace true in the if statement with the authenticator
    if(true){
      loginUserAjax(path);
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

  $('#header').on('click',function(){
    location.reload();
  });

  $('#login_page').on('click', function(){
    $('#signUp').hide();
    $('#loggin').show();
  });

  setTimeout(function(){loadResortsAjax()}, 100);
});


