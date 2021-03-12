@echo off

:: Information:
:: The code after "||" only runs if the previous command completes with an error code
:: "1>nul" blocks stdout, "2>nul" blocks stderr
:: "exit /b" stops the script, but keeps the console alive

:: Check if node is installed
where node 1>nul 2>nul || (
    echo ERROR: node is not installed
    exit /b
)

:: Check if npm is installed
where npm 1>nul 2>nul || (
    echo ERROR: npm is not installed
    exit /b
)

:: Check if Python is installed
where python 1>nul 2>nul || (
    echo ERROR: Python is not installed
    exit /b
)

:: Check if pip is installed
where pip 1>nul 2>nul || (
    echo ERROR: pip is not installed
    exit /b
)

:: Start the python setup script
python setup.py || (
    exit /b
)


:: Install nodemon globally
echo Installing nodemon
cd ..
call npm install -g nodemon

:: Install backend dependencies
echo Installing backend dependencies
cd backend
call npm install
cd ..

:: Install client dependencies
echo Installing client dependencies
cd client
call npm install
cd ..


:: Install pipenv
echo Installing pipenv
pip install pipenv

:: Initialize pipenv
echo Initializing pipenv
cd discordBot
pipenv install
cd ..

