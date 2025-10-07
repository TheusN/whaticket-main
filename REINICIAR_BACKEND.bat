@echo off
echo ========================================
echo   REINICIAR BACKEND COM CORS CORRETO
echo ========================================
echo.
echo Matando todos os processos Node...
powershell -Command "Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force"
timeout /t 3 /nobreak

echo.
echo Iniciando backend...
cd backend
start "WHATICKET BACKEND" cmd /k "npm start"

echo.
echo Backend reiniciado!
echo Aguarde ver "Server started on port: 8080"
echo.
pause
