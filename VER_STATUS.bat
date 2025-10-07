@echo off
echo ========================================
echo   WHATICKET - STATUS DO SISTEMA
echo ========================================
echo.

echo Verificando Backend (Porta 8080)...
curl -s -o nul -w "Backend: %%{http_code}\n" http://localhost:8080 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Backend: NAO RESPONDENDO
) else (
    echo Backend: OK
)

echo.
echo Verificando Frontend (Porta 3003)...
curl -s -o nul -w "Frontend: %%{http_code}\n" http://localhost:3003 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Frontend: NAO RESPONDENDO
) else (
    echo Frontend: OK
)

echo.
echo Verificando Docker...
docker ps --filter name=whaticket --format "{{.Names}} - {{.Status}}"

echo.
echo Processos Node rodando:
tasklist | findstr "node.exe" | find /c "node.exe"

echo.
echo ========================================
pause
