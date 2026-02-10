@echo off
echo ========================================
echo   PLAYGROUND BACKEND - STARTING
echo ========================================
echo.

REM Navigate to the correct directory
cd /d "%~dp0"

REM Activate virtual environment from outside Eduverse folder
echo [1/3] Activating Python virtual environment...
call ..\..\..\..\venv\Scripts\activate.bat

REM Install/update dependencies
echo.
echo [2/3] Installing Python dependencies...
pip install -r requirements.txt

REM Start Flask backend
echo.
echo [3/3] Starting Playground Flask backend on port 5001...
echo Backend will be available at: http://localhost:5001
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python app.py

pause
