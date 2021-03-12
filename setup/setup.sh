#!/bin/bash

# Information
# Which checks if the command is available
# "> /dev/null" ignores stdout and stderr


errors=""

# Check if node is installed
if ! (which node) > /dev/null
then
    errors+="ERROR: node is not installed\n"
fi

# Check if npm is installed
if ! (which npm) > /dev/null
then
    errors+="ERROR: npm is not installed\n"
fi

# Check if Python is installed
if ! (which python3) > /dev/null
then
    errors+="ERROR: Python is not installed\n"
fi

# Checks if there are any errors
if [ -n "$errors" ]
then
    echo -e "$errors"
    exit 1
fi

# Check if script finished without errors
python3 setup.py
ret=$?
if [ $ret -ne 0 ]
then
    exit 1
fi


# Install nodemon
echo "Installing nodemon"
cd ..
npm install -g nodemon

# Install backend dependencies
echo "Installing backend dependencies"
cd backend || exit
npm install
cd ..

# Install client dependencies
echo "Installing client dependencies"
cd client || exit
npm install
cd ..


# Install pipenv
echo "Installing pipenv"
sudo pip3 install pipenv

# Initialize pipenv
echo "Initializing pipenv"
cd discordBot || exit
pipenv install
cd ..

