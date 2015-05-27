#Powder
Powder For The People
Powder For Me
###################################
User Stories
###################################
1. from list of resorts user clicks and sees resort static info (vert, acers name etc)
  -that info creates rating

2. from list of resorts user clicks and sees resort dynamic info (weather)
  -that info creates rating

3. user can login

4. user can save favorite resorts
  -button on each resort page to toggle favorite

5. user can use search bar to search for resorts
  4b. search bar is responsive as user types

6. user can see a list of closest resorts


###################################
App Abilities in priority order
###################################
1. My new API give back resort info ie: non changing info (name, vertical, acers, averages, location, etc)
  -dish up and display on frontend
    -use formula to create rating and display it
2. wunderground API give resort weather info ie:(c,lo,hi temps, precip last 24 and 48hrs, forecast, etc)
  -dish up and display on frentend
    -use formula to create rating with current weather included and display it
3. Create User login and save info to my API
4. populate resort list of favorits from API of user logged in
5. populate results from search bar querys to results list
6. populate resort list of closest using API resort location and API user location or current location
7. Admin can loggin as superuser to CRUD resorts and users through browser

I want
powdermepowder.com
it is available on namecheap.com

user logs in
with username and password
-maybe with google auth or another

user can pick their favorite ski resorts
user has home location in API and a current location based of gps/wifi etc

each resort shown has a rating for if you should go based on resort stats and current weather

-posible put in rating for if you should go based or proximity and resort stats and current weather

start simple for 1 then 2 then 5 resorts
using fake data I create (not winter so no snow anyway)

resort datatypes
  vertical ft
  acers
  %open as decimal
  recent snowfall inches (last 48hrs?)

  (possible)
  terrain difficulty 1-10 scale
  lift capacity
  temp forecast
  and endlessly more

  compare to this average
  2000 vt ft
  500 acres
  85% open
  6 inches in 48hrs.

formula in testing should === 100 at must go shred
formula should === 10 at good resort 15 at great resort and 5 and okay resort min number should be a 5 if open and 0 if closed

the formula in works
(vtft + acers)*(48hrsnow + 1) * %open(As decimal)
      all div by 150


google sheets with the way the database should be modeled
https://docs.google.com/spreadsheets/d/1CeANICMCCl1IgIFEvJUNEYnwSd2jSX9KJuOGKaOyZzk/edit#gid=0
