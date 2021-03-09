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

:: Check if python is installed
where python 1>nul 2>nul || (
    echo ERROR: python is not installed
    exit /b
)

:: Check if pip is installed
where pip 1>nul 2>nul || (
    echo ERROR: pip is not installed
    exit /b
)

:: Install pipenv
echo Installing pipenv
pip install pipenv

:: Install nodemon
echo Installing nodemon
call npm install -g nodemon

:: Initialize pipenv
echo Initializing pipenv
cd discordBot
pipenv install
cd ..