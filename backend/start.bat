@echo off
echo ==========================================
echo 🌱 EcoBuddy Backend Server
echo ==========================================
echo.

REM Set API Key if provided as argument
if not "%~1"=="" (
    set GROQ_API_KEY=%~1
    echo 🔑 API Key configurata dagli argomenti
) else (
    echo ℹ️  Per configurare la API Key:
    echo    start.bat TUA_API_KEY_QUI
    echo.
)

echo 🚀 Avvio server backend...
echo 📍 Endpoint: http://localhost:3001
echo 📍 Health:   http://localhost:3001/health
echo.
echo Premi Ctrl+C per fermare il server
echo ==========================================
echo.

powershell -ExecutionPolicy Bypass -File server.ps1

pause
