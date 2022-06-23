# Talk To Me Bro
This is the submition of assignment 3. In order to access the code written for the submition of assignment 1
Switch to the branch 'main'.
## Getting Started

### Chat Server and WebAPI - C#
The chat server runs on port 7000 and the WebAPI runs on port 7001.
In order to change the port(s), you can change the file Properties/launchSettings.json:

<img width="400" alt="launchSettings" src="../ex2/public/pictures/launchSettings.png">

In this project we used the local SQL server supported by the Windows OS.
In order to change the server you should change the DbContext service defined in the 'Program.cs' file:
<img width="400" alt="DbContext" src="public/pictures/dbContext.png">
In the case of changing the DbContext, you must define its connection string.
The string connection can be found in appsettings.json file of the project:
<img width="400" alt="Connection String" src="public/pictures/ConnectionString.png">
Each project has its own files, make sure to apply changes to each project

## Android
Here in this project we built an android platform for our chats app.
In order to make it work, make sure you run the API first.
Since all of the request from the android app being sent to the API.
Then you'll be able to use the different activites in the android app.

## Authors
Idan Ziv
Guy Aronson
