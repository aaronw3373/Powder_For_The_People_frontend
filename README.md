#Powder
Powder For The People
Powder For Me

I want
powdermepowder.com
is available

user logs in
with username and password
-maybe with google auth or another

user can pick their favorite ski resorts
user has locations and a current location

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
