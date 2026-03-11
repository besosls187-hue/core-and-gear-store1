@echo off
color 0B
echo =========================================
echo    CORE ^& GEAR - GIT AUTO PUSHER
echo =========================================
echo.

set /p msg="Enter commit message (or press enter for 'Auto-update'): "

if "%msg%"=="" set msg="Auto-update"

echo.
echo [1/3] Adding changes...
git add .

echo.
echo [2/3] Committing...
git commit -m "%msg%"

echo.
echo [3/3] Pushing to GitHub...
git push origin master

echo.
echo =========================================
echo    SUCCESS! Changes pushed to GitHub.
echo =========================================
pause
