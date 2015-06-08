
#Powder For The People

http://thepowderpeople.com

backend repo: https://github.com/aaronw3373/project_2_backend

#Explanation
My app compares ski resorts.
It uses ski resort statistics, current weather information(wunderground),
and distance calculation to help users determine where to go skiing.
Users can log in to save their favorite resorts.
and users can search by name in the search bar for resorts.

#Powder Index
I came up with a algorithm/function which takes in all the data points and outputs a single number I call the Powder Index which is used to compare resorts.

#Bugs
There is a bug in deleting users that I think is related to dependecies issues with favorites. (In progress)

I need more backend validations to even more safely allow only admin to do CRUD tasks on resorts and users

Video not supported in safari yet

Only in firefox the magnifine glass of my search bar has the wrong possitioning

#Next Steps
1. seed in the rest of north american resorts (and then the world)

2. fix the bugs listed above

3. greater a worker back end to regularily pull the weather info and store it so each call for a resort will have a shorter response time and not have to make the weather request each time

4. add cost of lift tickets

5. add if there are waffle cabins, number of bars and restaurants (yelp API)

6. add the types of terrain featured at each resort

7. use another third party API to get populate my Database with the resort stats so I do not have to do it manually

8. user can sort threw resorts by closest, pow index, price, name, etc...


#User Stories
1. User can log in

2. from list of resorts user clicks and sees resort info

3. user can favorite resorts

4. user can unfavorite resorts

4. user can use search bar to search for resorts

6. user can see a list of closest resorts to their current location

7. admin users can CRUD resorts and other users
