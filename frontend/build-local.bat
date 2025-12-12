@echo off
echo ========================================
echo   BUILD LOCAL - localhost:8080
echo ========================================
echo.
echo Este build usa localhost:8080 como backend.
echo Use para testar o build localmente.
echo.

REM Define localhost como backend
set REACT_APP_BACKEND_URL=http://localhost:8080

REM Remove build antigo
if exist build rmdir /s /q build

REM Executa o build
call npm run build

echo.
echo ========================================
echo   BUILD CONCLUIDO!
echo ========================================
echo.
echo Para testar localmente, execute:
echo   npx serve -s build -l 3000
echo.
echo Ou use o server.js com:
echo   node server.js
echo.
pause
