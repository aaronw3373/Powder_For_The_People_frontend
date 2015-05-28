$(document).ready(function() {

  $('#login_button').on('click', function(){
    console.log("loginging in");
    var user = $('#usn').val()
    var pass = $('#psw').val()
    //run password checker against api
    //if password checker successfull hide the login
    // and display username
    return false;
  });

  $('#search_button').on('click', function(){
    console.log("searching");
    //basic step one on submit search api for matches
    //next level display resorts the match as you type
    //and allow you to click or tab to the on you want
    // like real search bars do
    return false;
  });

  $('#about_button').on('click', function(){
    console.log("about click");
    //slide onto div row main a short about_page for the app and how/why
    //make so clicking anything else hides the about_page
  });

  $('#resort_list').on('click', function(){
    //step 1 reads my api
    //displays info
    //step 2 also reads weather info and displays info
    //step 3 auto populates based on user location the closest resorts or favorites
  });

  $('#wunderground').on('click',function(){
    window.open("http://www.wunderground.com/?apiref=390cac5ce90ab221");

  });

  $('#login_button').on('click', function(){
    if ($('#usn').val() === "aaronw3373" && $('#psw').val() === "password1"){
      console.log("loged in as super user");
      $('#super_div').show()
      $('#resort_info').hide()
      $('#pow_factor').hide()
      CRUDPRIV();
    }
  });

});



function rating(vertical,acres,snowfall){
  return Math.round(((2000 + vertical + acres)/500)*(1+snowfall));
};


var needGo = "Call In Sick And Grab Your Boots";
var betterGo = "I Doubt Your Boss Will Mind";
var shouldGo = "It Better Be The Weekend Already";
var maybeGo = "At Least Nobody Else Will Be There";
var noGo = "If You Are Desperate But Then Again Spring Conditions";
var summer = "Let's Go Surfing Instead"

function quote(rating,month){
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
