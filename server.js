'use strict';
// Punto de entrada: npm start
//   src/config.js     configuración (.env)
//   src/db.js         base de datos SQLite (esquema en db/schema.sql)
//   src/validacion.js revisión de los datos recibidos
//   src/correo.js     avisos por correo
//   src/rutas.js      API (/api/pedidos, /api/contacto)
//   src/estatico.js   entrega de la página (public/)
// Requiere Node 22.13 o superior (trae SQLite incluido, sin instalar nada más)
const [mayor, menor] = process.versions.node.split('.').map(Number);
if (mayor < 22 || (mayor === 22 && menor < 13)) {
  console.error(`\nTu Node.js es la versión ${process.versions.node} y se necesita la 22.13 o superior.\n` +
    'Descarga la versión LTS en https://nodejs.org, instálala y vuelve a abrir el programa.\n');
  process.exit(1);
}
// Oculta el aviso "SQLite es experimental" (asusta y no afecta nada)
const emitir = process.emitWarning;
process.emitWarning = (w, ...resto) => (/SQLite/i.test(String(w)) ? undefined : emitir.call(process, w, ...resto));

const http = require('node:http');
const cfg = require('./src/config');
const { manejarApi } = require('./src/rutas');
const { servirArchivo } = require('./src/estatico');
const { obtenerTransporte, reintentarPendientes } = require('./src/correo');

const servidor = http.createServer(async (req, res) => {
  const ruta = new URL(req.url, 'http://x').pathname;
  if (await manejarApi(req, res, ruta)) return;
  if (req.method === 'GET' || req.method === 'HEAD') return servirArchivo(req, res, ruta);
  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Método no permitido');
});

servidor.on('error', (e) => {
  if (e.code === 'EADDRINUSE') console.error(`\nEl puerto ${cfg.PUERTO} ya está en uso: probablemente LOOP ya está abierto en otra ventana. Ciérrala e inténtalo de nuevo.\n`);
  else console.error(e);
  process.exit(1);
});

servidor.listen(cfg.PUERTO, () => {
  console.log(`\nLOOP listo: abre http://localhost:${cfg.PUERTO} en tu navegador`);
  console.log(`Base de datos: ${cfg.ARCHIVO_DB}`);
  console.log(`Avisos por correo a: ${cfg.CORREO_DESTINO}`);
  console.log(cfg.CLAVE_ADMIN ? 'Panel de datos: toca el logo del inicio.' : 'Panel de datos DESACTIVADO: falta ADMIN_PASSWORD en .env');
  console.log('(Deja esta ventana abierta mientras uses la tienda. Para apagar: Ctrl + C)\n');
  obtenerTransporte();
  reintentarPendientes();
  setInterval(reintentarPendientes, cfg.MINUTOS_REINTENTO * 60e3).unref();
});
