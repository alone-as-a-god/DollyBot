# DollyBot
DollyBot is a Discord Bot with music functions. The bot is manageable via a [WebDashboard](https://dollybot.tk). To invite the bot, go to the aforementioned link or just host the bot yourself! Look below for installation instructions.


## Installation 
### Requirements 

To host Dollybot, you need to have the following programs installed:
- Node.js
- npm
- Python 3.9
- pip
- AdoptOpenJDK 13.02

### Evniroment variables
To make the bot run as intended you have to create certain .env files. These contain keys and similar which are not supposed to be shared online, therefore you have to create them yourself.
The files as needed are as follows:

#### discordBot/.env:

`BOT_TOKEN= `

#### backend/.env:  

`API_ENDPOINT=https://discord.com/api/oauth2/token`

`CLIENT_ID=`

`CLIENT_SECRET=`

`REDIRECT_URI=http://localhost:3000/`

`DB_PATH="../database/database.db"`


#### client/.env:

`REACT_APP_API_ENDPOINT=http://localhost:4000/api`

`REACT_APP_LOGIN_URL=""`

`REACT_APP_INVITE_URL=""`

`REACT_APP_YOUTUBE_API_KEY=`


Some of these entries are empty as you can see, the following section will describe how you can obtain the necessary keys etc.

### Getting the API Keys
First of all, go to the [Discord Developer Portal](https://discord.com/developers/applications/) and create a new Application. If you do not have a discord account yet, you can create one [here](https://discord.com/). When you successfully created your application go to the Bot panel on the left and click `Add Bot`. Note: This may fail if you have a common username for your bot like "test". Now you can begin to get the required keys.
Note: If there are Quotation marks (") next to an entry in the .env file, the corresponding key needs to be in quotation marks. Otherwise do not add quotation marks.

- discordBot:

BOT_TOKEN = On the Bot panel, click on `Copy` Right under the bots name

- backend:

CLIENT_ID = On the Oauth2 panel, copy the Client ID

ClIENT_SECRET = Right next to the Client ID, copy the Client Secret

- client:

REACT_APP_LOGIN_URL = Go to the Oauth2 Panel, and in the `Redirects` Category add a new Redirect. This should be your landing page, so if you kept the standard values it is `http://localhost:3000/`. Below that, you will find a `Oauth2 URL Generator`. First choose your recently added Redirect URL and then make checkmarks on the following fields:
`identify`
`email`
`connections`
`guilds`
Click on `Save Changes` at the bottom of the page and copy the url it generated and paste it in the .env file

REACT_APP_INVITE_URL = Again on the Oauth2 Panel, remove all the ckeckmarks and click on "bot" instead. Below this menu a new one will popup, where you have to make a checkmark on `Administrator`. Then copy the link above.

REACT_APP_YOUTUBE_API_KEY = To create your YouTube API-Key go to https://console.cloud.google.com/home/dashboard and login with your google account. Then you need to create a new project. When your project has been created go to https://console.cloud.google.com/apis/library, make sure you're on the right project and activate "YouTube Data API v3". Lastly go to https://console.cloud.google.com/apis/credentials and click "Create credentials" > "API Key"



### Discord bot with Python
To run the discrod bot you need to install nodemon with `npm install -g nodemon` and pipenv with `pip install pipenv`.  
Next you have to initialise pipenv with `pipenv install` inside the discordBot directory.  
To play the music at all, it is important that the correct Java version is installed. You can use the Java version manager [Jabba](https://github.com/shyiko/jabba) to install the right version.  
To start the bot you have to run `pipenv run dev` inside the discordBot directory.  


### Node.js backend  
To install the backend dependecies you have to run `npm install` inside the backend directory.  
Start the frontend with `npm run start` inside inside the backend directory.  


### React frontend  
To install the backend dependecies you have to run `npm install` inside the client directory.  
Start the frontend with `npm run start` inside inside the client directory.

## Commands
Command | Alias | Usage
------- | ----- | -----
help | - | Sends a list of all commands
prefix [New prefix] | - | Changes the current prefix to the new prefix
purge [Amount] | - | Deletes a defined amount of messages (Default: 10)
clear | - | Clears the queue
connect | join | Connects the bot to a channel
jump [Timestamp in seconds] | - | Jumps to the timestamp
play [Songname or url] | - | Adds a new song or playlist to the queue
queue | q | Displays the queue
search [Songname] | s | Displays the first five youtube search results, from which you can choose what song you want to play
shuffle | - | Shuffles the queue
skip | - | Skips the currently playing song
stop | - | Stops the music
