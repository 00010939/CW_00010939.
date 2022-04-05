# 00010939. Documentation 


# Link to github:



# Link to glitch: 




# Installation
To run this project, install it locally using npm:

$ npm install
$ npm start
------------------

# Create .env file
Create a .env file to store your database credentials
DB_HOST = localhost
DB_NAME = usermanagement_tut
DB_USER = root
DB_PASS = password.

--------------------

# XAMPP Control Panel 
It is better to use mysql database for this project I used XAMPP Control Panel, where we should run both Apache and MySQL.


# Folders
As for the folders each of them has it is own role, where server includes controllers  and routes. Also there is views folder where it keeps layouts and partials like add, edit,  view-students  and so on.

# Step by step instructions on how to run the app locally including dependencies’ installation 
First thing we need to do  is to run  both Apache and MySQL, using XAMPP Control Panel. Second step, is to enter the folder and press shift + right click mouse to open PowerShell, then write  (1)npm install ,  (2)npm start. Third step, is to enter name =>   localhost:5000  in website url.
Finally it must open the app where user can interract with it.

# About app
When user enters it he can add students,  edit, view the written data about student, delete the student and finally there is also a search button to find students by name or surname. Also when user deletes, adds and edits the student above will pop uo an notify message which will indicate that students were added, edited succfully. 