function createResortAjax(a){$.ajax({url:resort_index,type:"POST",dataType:"json",data:a}).done(function(){console.log("Created")}).fail(function(){console.log("error")})}function updateResortAjax(a,b){$.ajax({url:a,type:"PATCH",dataType:"json",data:b}).done(function(){console.log("Updated")}).fail(function(){console.log("error")})}function deleteResortAjax(a){$.ajax({url:a,type:"DELETE"}).done(function(){console.log("Deleted")}).fail(function(){console.log("error")})}function loadResortsAjax(){$("#resort_list").html("<h2> Resorts</h2>"),$.ajax({url:resort_index,type:"GET",dataType:"json"}).done(function(a){a.forEach(function(a){appendResortList(a)})}).fail(function(){console.log("error")})}function showResortAjax(a,b){$.ajax({url:resort_show+a,type:"GET",dataType:"json"}).done(function(a){"none"===b?renderShowResort(a.resort,a.weather):"admin"===b&&renderShowResortAdmin(a.resort,a.weather)}).fail(function(){console.log("error")})}function searchAndShowResort(a,b){$.ajax({url:a,type:"GET",dataType:"json"}).done(function(a){"none"===b?renderShowResort(a.resort,a.weather):"admin"===b&&renderShowResortAdmin(a.resort,a.weather)}).fail(function(){console.log("error")})}function rating(a,b,c){return Math.round((2e3+a+b)/500*(1+c))}function quote(a,b){var c="Call In Sick And Grab Your Boots",d="I Doubt Your Boss Will Mind",e="It Better Be The Weekend Already",f="At Least Nobody Else Will Be There",g="If You Are Desperate But Then Again Spring Conditions",h="Let's Go Surfing Instead";return 4>b||b>10?1>=a/20?g:2>=a/20?f:3>=a/20?e:4>=a/20?d:c:h}function CRUDPRIV(){$("#create_crud").on("click",function(){createResortAjax(getCRUDData()),loadResortsAjax()}),$("#read_crud_ID").on("click",function(){c_json=getCRUDData();var a=$("#ID_crud").val();showResortAjax(a,"admin")}),$("#read_crud_name").on("click",function(){c_json=getCRUDData();var a=resort_name+c_json.resort.name;searchAndShowResort(a,"admin")}),$("#update_crud").on("click",function(){var a=$("#ID_crud").val();c_json=getCRUDData();var b=resort_show+a;updateResortAjax(b,c_json),loadResortsAjax()}),$("#destroy_crud").on("click",function(){c_json=getCRUDData();var a=resort_name+c_json.resort.name;deleteResortAjax(a),loadResortsAjax()})}function getCRUDData(){var a=$("#name_crud").val(),b=$("#vertical_crud").val();b=Number(b);var c=$("#acres_crud").val();c=Number(c);var d=$("#state_crud").val();d=d.toUpperCase();var e=$("#location_crud").val();e=e.replace(/ /g,"_");var f={resort:{name:a,vertical:b,acres:c,state:d,location:e}};return f}function renderShowResort(a,b){var c=new Date;$("#resort_name").html(a.name),$("#vertical").html("Vertical Feet: "+a.vertical),$("#acres").html("Skiable Acres: "+a.acres),$("#rating").html("Powder Index: "+rating(a.vertical,a.acres,0)),$("#quote").html(quote(rating(a.vertical,a.acres),parseInt(c.getMonth()),0)),$("#current_temp_f").html("Temp: "+b.current_observation.temp_f+" ℉")}function renderShowResortAdmin(a,b){$("#resorts_info_admin").html("<h3>ID: "+a.id+" name: "+a.name+" vertical: "+a.vertical+" acres: "+a.acres+" state: "+a.state+" location: "+a.location+"</h3>")}function appendResortList(a){$("#resort_list").append("<h3 class='resort' id=resort"+a.id+">"+a.name+"</h3>")}var resort_index="http://localhost:5000/resorts",resort_show="http://localhost:5000/resorts/",resort_name="http://localhost:5000/resortsname?name=";$(document).ready(function(){loadResortsAjax(),$("#resort_list").on("click",".resort",function(a){var b=parseInt(a.target.id.substring(6));showResortAjax(b,"none")}),$("#search_button").on("click",function(){console.log("search");var a=$("#search_box").val(),b=resort_name+a;return searchAndShowResort(b,"none"),!1}),$("#about_button").on("click",function(){console.log("about click")}),$("#wunderground").on("click",function(){window.open("http://www.wunderground.com/?apiref=390cac5ce90ab221")}),$("#login_button").on("click",function(){return"aaronw3373"===$("#usn").val()&&"password1"===$("#psw").val()&&(console.log("loged in as super user"),$("#super_div").toggle(),$("#resort_info").toggle(),$("#pow_factor").toggle(),CRUDPRIV()),!1})});