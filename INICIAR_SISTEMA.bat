@echo off
echo ========================================
echo   WHATICKET - INICIAR SISTEMA
echo ========================================
echo.
echo Este script vai abrir 2 terminais:
echo.
echo 1. BACKEND (Porta 8080)
echo 2. FRONTEND (Porta 3003)
echo.
echo Aguarde ambos iniciarem antes de acessar!
echo.
pause

REM Iniciar Backend em uma nova janela
start "WHATICKET BACKEND" cmd /k "cd /d %~dp0backend && npm start"

REM Aguardar 5 segundos
timeout /t 5 /nobreak

REM Iniciar Frontend em outra janela
start "WHATICKET FRONTEND" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo Terminais abertos!
echo ========================================
echo.
echo Backend: Aguarde ver "Server started on port: 8080"
echo Frontend: Aguarde 5-10 minutos para compilar
echo.
echo Depois acesse: http://localhost:3003
echo.
echo Credenciais:
echo   Email: admin@admin.com
echo   Senha: 123456
echo.
echo Para parar: Feche as janelas dos terminais
echo ========================================
pause
