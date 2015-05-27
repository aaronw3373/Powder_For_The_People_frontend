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

});
