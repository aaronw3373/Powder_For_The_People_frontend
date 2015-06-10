'use strict';

//TODO: look into grouping code by user story

$(document).ready(function() {
  setTimeout(function(){powder_iife.getLocation();},400);

  setTimeout(function(){powder_iife.loadResortsAjax();}, 500);

  setTimeout(function(){
    $('#main_content').show(1000);
  },500);
  setTimeout(function(){
    $('#header').show(1000);
  },1500);

  //poulate full_list div

  //resort list click to show resort
    $('#favorite_list').on('click', '.resort', function(event){
    var path = (powder_iife.resort_name + event.target.id.substring(8));
    $('#search_container').show(300);
    $('#about_page').hide();
    $('#super_div').hide();
    $('#favorite_button').hide();
    powder_iife.showResortAjax(path,"none");
    $('#resort_column').show(300);
    $('#pow_factor').show(300);
    $('#pow_factor_info').show();
    $('#un_favorite_button').show();
  });

  $('#closest_list').on('click', '.resort', function(event){
    var path = (powder_iife.resort_name + event.target.id.substring(7));
    $('#search_container').show(300);
    $('#about_page').hide();
    $('#super_div').hide();
    $('#un_favorite_button').hide();
    powder_iife.showResortAjax(path,"none");
    $('#resort_column').show(300);
    $('#pow_factor').show(300);
    $('#pow_factor_info').show();
    $('#favorite_button').show();

  });

  //search bar on search_utton click
  $('#search_button').on('click', function(){
    var path = (powder_iife.resort_name + $('#search_box').val());
    $('#about_page').hide();
    $('#super_div').hide();
    powder_iife.showResortAjax(path,"none");
    if (sessionStorage.getItem('userUID') !== undefined){
      $('#un_favorite_button').hide();
      $('#favorite_button').show();
    }
    $('#resort_column').show(300);
    $('#pow_factor').show(300);
    $('#pow_factor_info').show();
    $('#search_box').val("");
    return false;
  });

  //TODO: put the insides of these click handlers in a function.
  $('#search_box').keyup(function(event) {
    if (event.keyCode === 13){
      var path = (powder_iife.resort_name + $('#search_box').val());
      $('#about_page').hide();
      $('#super_div').hide(300);
      powder_iife.showResortAjax(path,"none");
      if (sessionStorage.getItem('userUID') !== undefined){
        $('#un_favorite_button').hide();
        $('#favorite_button').show();
      }
      $('#resort_column').show(300);
      $('#pow_factor').show(300);
      $('#pow_factor_info').show();
      $('#search_box').val("");
      return false;
    }
  });
  //search bar on search_utton click
  $('#search_button2').on('click', function(){
    var path = (powder_iife.resort_name + $('#search_box2').val());
    $('3search_container_2').hide(300);
    $('#about_page').hide();
    $('#super_div').hide();
    powder_iife.showResortAjax(path,"none");
    if (sessionStorage.getItem('userUID') !== undefined){
      $('#un_favorite_button').hide();
      $('#favorite_button').show();
    }
    $('#search_container').show(300);
    $('#resort_column').show(300);
    $('#pow_factor').show(300);
    $('#pow_factor_info').show();
    $('#search_box').val("");
    return false;
  });
  $('#search_box2').keyup(function(event) {
    if (event.keyCode === 13){
      var path = (powder_iife.resort_name + $('#search_box2').val());
      $('#search_container_2').hide(300);
      $('#about_page').hide();
      $('#super_div').hide(300);
      powder_iife.showResortAjax(path,"none");
      if (sessionStorage.getItem('userUID') !== undefined){
        $('#un_favorite_button').hide();
        $('#favorite_button').show();
      }
      $('#search_container').show(300);
      $('#resort_column').show(300);
      $('#pow_factor').show(300);
      $('#pow_factor_info').show();
      $('#search_box').val("");
      return false;
    }
  });

  //Click wunderground logo takes you to wunderground site
  $('#wunderground').on('click',function(){
    window.open("http://www.wunderground.com/?apiref=390cac5ce90ab221");
  });

  //restart page on headaer click

  //TODO:rename to title or header ...
  $('#pp').on('click',function(){
    location.reload();
  });

  $('#play_pause').on('click',function(){
    var video = document.getElementById("video_1");
    if (video.paused === false) {
        video.pause();
        $('#play_pause').val("Play");
    } else {
        video.play();
        $('#play_pause').val("Pause");
    }
  });

  $('#mute_button').on('click',function(){
    var video = document.getElementById("video_1");
    if (video.muted){
      video.muted = false;
      $('#mute_button').val("Mute");
    }else{
      video.muted = true;
      $('#mute_button').val("Mute");
    }
  });

  //favorite resort button
  $('#favorite_button').on('click',function(){
    var resortID = $('#resort_info h2').attr('id');
    resortID = resortID.substring(8);
    var userID = sessionStorage.getItem('userUID');
    var name = $('#resort_info h2').html();
    powder_iife.createFavorite(resortID,userID,name);
  });
  //UNFAVORITE RESORT BUTTON
  $('#un_favorite_button').on('click',function(){
    var resortID = $('#resort_info h2').attr('id');
    resortID = resortID.substring(8);
    var userID = sessionStorage.getItem('userUID');
    powder_iife.destroyFavorite(resortID,userID);
  });

  //closest header button display list
  $('#closest_list_button').on('click',function(){
    $('#favorite_list').hide(300);
    $('#closest_list').show(300);
    powder_iife.loadResortsAjax();
  });

  //favorite header button to display list
  $('#favorite_list_button').on('click',function(){
    $('#closest_list').hide(300);
    $('#favorite_list').show(300);
    $('#favorite_list').html("");
    powder_iife.showFavoriteOfUser(sessionStorage.getItem('userUID'));
  });

  //TODO rename signup_page_button
  //TODO loggin??? 1 g
  $('#signUp_page').on('click',function(){
    $('#loggin').hide(300);
    $('#login_page').hide(300);
    $('#signUp_page').hide(300);
    $('#signUp').show(300);
  });
  //TODO: rename buttons
  //login to show login page
  $('#login_page').on('click', function(){
    $('#signUp').hide(300);
    $('#login_page').hide(300);
    $('#signUp_page').hide(300);
    $('#loggin').show(300);
  });

  $('.logs_return').on('click', function(){
    $('#signUp').hide(300);
    $('#loggin').hide(300);
    $('#signUp_page').show(300);
    $('#login_page').show(300);
  });

  //login button on click with hard coded admin used info to CRUD
  $('#password_form').keyup(function(event){
    if (event.keyCode === 13){
      var email = $('#email_form').val();
      var password = $('#password_form').val();
      var path = (powder_iife.currentAPI + "/login");
      if(true){
        powder_iife.loginUserAjax(path);
        console.log("logging in");
      }
      return false;
    }
  });
  $('#signin_button').on('click',function(){
    var email = $('#email_form').val();
    var password = $('#password_form').val();
    var path = (powder_iife.currentAPI + "/login");
    if(true){
     powder_iife.loginUserAjax(path);
    console.log("logging in");
    }
  });


  //sign up submit
  $('#signup_button').on('click', function(){
    powder_iife.createUser();
  });

  //toggle privileges
  $('#toggle_privileges_button').on('click',function(){
    $('#super_div').toggle(300);
    $('#resort_column').toggle(300);
    $('#pow_factor').toggle(300);
  });

  //logout button
  $('#logout_button').on('click',function(){
    console.log("logging out");
    location.reload();
    sessionStorage.setItem('powder-token',null);
    sessionStorage.setItem('userUID',null);
  });


});
