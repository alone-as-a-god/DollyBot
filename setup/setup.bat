@echo off

:: Information:
:: The code after "||" only runs if the previous command completes with an error code
:: "1>nul" blocks stdout, "2>nul" blocks stderr
:: "exit /b" stops the script, but keeps the console alive


:: Check if Python is installed
where python 1>nul 2>nul || (
    echo ERROR: Python is not installed
    exit /b
)

:: Start the python setup script
python -c "import setup; setup.setup()"