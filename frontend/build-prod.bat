@echo off
echo ========================================
echo   BUILD PRODUCAO - Auto-detect URL
echo ========================================
echo.
echo Este build usa deteccao automatica de URL.
echo Em producao, a URL sera detectada pelo dominio.
echo.
echo Para forcar uma URL especifica, edite:
echo   build/config.js
echo.

REM Limpa variavel para usar auto-detect
set REACT_APP_BACKEND_URL=

REM Remove build antigo
if exist build rmdir /s /q build

REM Executa o build
call npm run build

echo.
echo ========================================
echo   BUILD CONCLUIDO!
echo ========================================
echo.
echo Arquivos gerados em: frontend/build/
echo.
echo Para produção, copie a pasta build para o servidor.
echo O arquivo build/config.js pode ser editado para
echo definir a URL do backend sem precisar rebuild.
echo.
pause
