@echo off
chcp 65001 >nul
title LOOP Tienda
cd /d "%~dp0"
echo.
echo ===== LOOP Tienda =====
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo No tienes Node.js instalado.
  echo Se abrira la pagina de descarga: instala la version LTS y vuelve a abrir este archivo.
  start "" https://nodejs.org
  pause
  exit /b 1
)

if not exist node_modules (
  echo Primera vez: instalando lo necesario, espera un momento...
  call npm install
  if errorlevel 1 (
    echo.
    echo Fallo la instalacion. Revisa tu conexion a internet e intentalo de nuevo.
    pause
    exit /b 1
  )
)

if not exist .env (
  node configurar.js
)

echo.
echo Abriendo la tienda en tu navegador...
start "" cmd /c "timeout /t 3 >nul & start http://localhost:3000"
node server.js
echo.
echo El servidor se detuvo. Lee el mensaje de arriba.
pause
