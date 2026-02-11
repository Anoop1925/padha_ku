@echo off
echo.
echo ================================================
echo    PLAYGROUND - COMPLETE TEST WORKFLOW
echo ================================================
echo.
echo This script will help you test the entire Playground feature
echo.
echo ================================================
echo.

:MENU
echo [1] Start Playground Backend (Port 5001)
echo [2] Test Backend Health
echo [3] Open Frontend in Browser
echo [4] View Backend Logs
echo [5] Stop All Servers
echo [6] Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto START_BACKEND
if "%choice%"=="2" goto TEST_HEALTH
if "%choice%"=="3" goto OPEN_BROWSER
if "%choice%"=="4" goto VIEW_LOGS
if "%choice%"=="5" goto STOP_SERVERS
if "%choice%"=="6" goto EXIT

:START_BACKEND
echo.
echo Starting Playground Backend...
echo.
start cmd /k "cd /d %~dp0 && call ..\..\..\..\venv\Scripts\activate.bat && python app.py"
timeout /t 3
goto MENU

:TEST_HEALTH
echo.
echo Testing backend health...
curl http://localhost:5001/health
echo.
echo.
pause
goto MENU

:OPEN_BROWSER
echo.
echo Opening Playground in browser...
start http://localhost:3000/feature-4
echo.
echo If Next.js is not running, start it with: npm run dev
echo.
pause
goto MENU

:VIEW_LOGS
echo.
echo Backend logs will appear in the terminal window...
echo (Check the window that opened when you started the backend)
echo.
pause
goto MENU

:STOP_SERVERS
echo.
echo Stopping all Python servers on port 5001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001') do taskkill /F /PID %%a
echo.
echo Done! All servers stopped.
echo.
pause
goto MENU

:EXIT
echo.
echo Goodbye!
echo.
exit
