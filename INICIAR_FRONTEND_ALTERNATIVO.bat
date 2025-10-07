@echo off
echo ========================================
echo   FRONTEND ALTERNATIVO - BUILD + SERVE
echo ========================================
echo.
echo O React Scripts esta com problemas no Windows.
echo Vamos fazer o build de producao e servir!
echo.
echo Isso vai demorar uns 5 minutos...
echo.
pause

cd frontend

echo.
echo [1/3] Instalando servidor HTTP...
call npm install -g serve

echo.
echo [2/3] Fazendo build (pode demorar 5-10 min)...
call npm run build

echo.
echo [3/3] Iniciando servidor na porta 3003...
echo.
echo Acesse: http://localhost:3003
echo.
serve -s build -l 3003

pause
