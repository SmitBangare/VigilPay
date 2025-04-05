@echo off
echo Starting the GitHub push process for VigilPay: Smart Indian Transaction Shield...
echo.

:: Check if git is installed
git --version > nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed or not in your PATH. Please install Git first.
    pause
    exit /b
)

:: Confirm with the user
echo This script will add all files, commit, and push to GitHub.
echo Repository: https://github.com/SmitBangare/vigilpay
echo.
set /p confirm=Do you want to continue? (y/n): 

if /i "%confirm%" neq "y" (
    echo Operation cancelled.
    pause
    exit /b
)

echo.
echo Step 1: Adding all files to Git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Initial commit: VigilPay - Smart Indian Transaction Shield"

echo.
echo Step 3: Setting up remote repository...
git remote add origin https://github.com/SmitBangare/vigilpay.git 2>nul

echo.
echo Step 4: Pushing to GitHub...
echo This might ask for your GitHub credentials.
echo.

:: Try to detect branch name
for /f "delims=" %%a in ('git branch --show-current') do set branch=%%a
if "%branch%"=="" set branch=main

echo Pushing to branch: %branch%
git push -u origin %branch%

echo.
echo Process completed! Please check your GitHub repository:
echo https://github.com/SmitBangare/vigilpay
echo.
pause 