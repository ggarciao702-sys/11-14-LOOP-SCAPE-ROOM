'use strict';
// Utilidades HTTP compartidas por las rutas.
const { DatosInvalidos } = require('./validacion');

function leerJson(req) {
  return new Promise((ok, fallo) => {
    let bytes = 0; const partes = [];
    req.on('data', (c) => {
      bytes += c.length;
      if (bytes > 64 * 1024) { fallo(new DatosInvalidos('Demasiado grande')); req.destroy(); } else partes.push(c);
    });
    req.on('end', () => { try { ok(JSON.parse(Buffer.concat(partes).toString('utf8') || '{}')); } catch { fallo(new DatosInvalidos('JSON inválido')); } });
    req.on('error', fallo);
  });
}

function responderJson(res, codigo, objeto, extra = {}) {
  res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra });
  res.end(JSON.stringify(objeto));
}

/** Contador simple por IP: permite `maximo` intentos cada `ventanaMs`. */
function crearLimitador(maximo, ventanaMs) {
  const visitas = new Map();
  setInterval(() => {
    const ahora = Date.now();
    for (const [ip, l] of visitas) if (!l.some((t) => ahora - t < ventanaMs)) visitas.delete(ip);
  }, ventanaMs).unref();
  return (ip) => {
    const ahora = Date.now();
    const lista = (visitas.get(ip) || []).filter((t) => ahora - t < ventanaMs);
    lista.push(ahora); visitas.set(ip, lista);
    return lista.length > maximo;
  };
}

module.exports = { leerJson, responderJson, crearLimitador };
