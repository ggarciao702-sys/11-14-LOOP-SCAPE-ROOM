#!/bin/sh
# Mac / Linux: ./iniciar.sh   (la primera vez: chmod +x iniciar.sh)
cd "$(dirname "$0")" || exit 1
command -v node >/dev/null 2>&1 || { echo "Instala Node.js (version LTS) desde https://nodejs.org y vuelve a intentarlo."; exit 1; }
[ -d node_modules ] || { echo "Primera vez: instalando lo necesario..."; npm install || exit 1; }
[ -f .env ] || node configurar.js
(sleep 3; (command -v open >/dev/null && open http://localhost:3000) || (command -v xdg-open >/dev/null && xdg-open http://localhost:3000)) >/dev/null 2>&1 &
exec node server.js
