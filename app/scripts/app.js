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
    createResortAjax(getCRUDData());
    loadResortsAjax();
  });
  $('#read_crud_ID').on('click', function(){
    c_json = getCRUDData()
    var dbID = $('#ID_crud').val()
    showResortAjax(dbID,"admin")
  });
  $('#read_crud_name').on('click', function(){
    c_json = getCRUDData()
    var searchAPI = resort_name + c_json.resort.name
    searchAndShowResort(searchAPI,"admin")
  });
  $('#update_crud').on('click', function(){
    var id = $('#ID_crud').val()
    c_json = getCRUDData()
    var updateAPI = resort_show + id
    updateResortAjax(updateAPI,c_json);
    loadResortsAjax();
  });
  $('#destroy_crud').on('click', function(){
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
  $('#resort_name').html(data.name);
  $('#vertical').html("Vertical Feet: " + data.vertical);
  $('#acres').html("Skiable Acres: " + data.acres);
  $('#rating').html("Powder Index: " + (rating(data.vertical,data.acres,0)));
  $('#quote').html(quote(rating(data.vertical,data.acres),parseInt(date.getMonth()),0));
  $('#current_temp_f').html("Temp: " + weather.current_observation.temp_f + " ℉");
}

//render response on superuser page
function renderShowResortAdmin(data,weather){
  $('#resorts_info_admin').html("<h3>"+ "ID: " +data.id+ " name: "+ data.name + " vertical: " + data.vertical +" acres: "+ data.acres + " location: " + data.location + "</h3>");
}

//render response to resort list
function appendResortList(resort){
  $('#resort_list').append("<h3 class='resort' id=" + "resort" +resort.id + ">" + resort.name + "</h3>");
}



//
//RUN TIME
//
//AND
//
//CLICK HANDLERS
//


$(document).ready(function() {
  //poulate resort_list div
  loadResortsAjax();

  //resort list click to show resort
  $('#resort_list').on('click', '.resort', function(event){
    var dbID = parseInt(event.target.id.substring(6));
    showResortAjax(dbID,"none");
  });

  //search bar on search_utton click
  $('#search_button').on('click', function(){
    console.log("search");
    var search = $('#search_box').val()

    var searchAPI = (resort_name + search)
    searchAndShowResort(searchAPI,"none");
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

  //login button on click with hard coded admin used info to CRUD
  $('#login_button').on('click', function(){
    if ($('#usn').val() === "aaronw3373" && $('#psw').val() === "123"){
      console.log("loged in as super user");
      $('#super_div').toggle()
      $('#resort_info').toggle()
      $('#pow_factor').toggle()
      CRUDPRIV();
    }
    return false;
  });
  $('#signUp_button').on('click',function(){
    $('#login').hide();
    $('#signUp').show();
    return false;
  });

});


