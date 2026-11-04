'use strict';
// Entrega los archivos de /public (página, css, js, imágenes, videos).
// Soporta "Range" para que los videos funcionen en Safari/iPhone.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const cfg = require('./config');

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
};
const COMPRIMIBLES = new Set(['.html', '.css', '.js', '.svg']);

function enviarError(res, codigo, mensaje) {
  res.writeHead(codigo, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(mensaje);
}

function servirArchivo(req, res, rutaUrl) {
  let rel;
  try { rel = decodeURIComponent(rutaUrl); } catch { return enviarError(res, 400, 'Solicitud inválida'); }
  if (rel === '/' || rel === '') rel = '/index.html';

  const archivo = path.normalize(path.join(cfg.CARPETA_PUBLICA, rel));
  if (!archivo.startsWith(cfg.CARPETA_PUBLICA + path.sep)) return enviarError(res, 403, 'Prohibido');

  fs.stat(archivo, (err, st) => {
    if (err || !st.isFile()) return enviarError(res, 404, 'No encontrado');
    const ext = path.extname(archivo).toLowerCase();
    const cabeceras = {
      'Content-Type': TIPOS[ext] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
      'Accept-Ranges': 'bytes',
    };

    // Videos y archivos grandes: respuesta parcial
    const rango = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (rango && (rango[1] || rango[2])) {
      let ini = rango[1] === '' ? st.size - Number(rango[2]) : Number(rango[1]);
      let fin = rango[1] === '' || rango[2] === '' ? st.size - 1 : Number(rango[2]);
      fin = Math.min(fin, st.size - 1);
      if (!(ini >= 0) || ini > fin) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { ...cabeceras, 'Content-Range': `bytes ${ini}-${fin}/${st.size}`, 'Content-Length': fin - ini + 1 });
      return req.method === 'HEAD' ? res.end() : fs.createReadStream(archivo, { start: ini, end: fin }).pipe(res);
    }

    if (COMPRIMIBLES.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      res.writeHead(200, { ...cabeceras, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
      return req.method === 'HEAD' ? res.end() : fs.createReadStream(archivo).pipe(zlib.createGzip()).pipe(res);
    }
    res.writeHead(200, { ...cabeceras, 'Content-Length': st.size });
    return req.method === 'HEAD' ? res.end() : fs.createReadStream(archivo).pipe(res);
  });
}

module.exports = { servirArchivo };
