# DollyBot

## Installation 
### Requirements 

To host Dollybot, you need to have the following programs installed:
- Node.js
- npm
- Python 3.9
- pi
- AdoptOpenJDK 13.02

### Evniroment variables
It is importand that you create .env files inside the discordBot and the backend directory.  
You need to write the variables in this format: `VARIABLE_NAME=value`.  
Here are the variables that you need:  

discordBot/.env:  
- BOT_TOKEN: The bot token that you can retrieve from the Discord Developer Portal.

backend/env:  
- API_ENDPOINT: 
- CLIENT_ID: The ID of the bot that you can retrieve from the Discord Developer Portal.
- CLIENT_SECRET: The secret that you can retrieve from the Discord Developer Portal.
- REDIRECT_URI: 
- DB_PATH: The path where your sqlite database-file is located.
- (Optional) BOT_ADDRESS: The address where your bot is running, if it is running on a different server.
- (Optional) BOT_PORT: The port of the socket that is used to send notification to the bot, if you use a different port.


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
