@echo off
echo ========================================
echo   MODO DESENVOLVIMENTO - localhost
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3003
echo.

REM Usa .env.local que tem localhost configurado
set REACT_APP_BACKEND_URL=http://localhost:8080
set PORT=3003

npm start
