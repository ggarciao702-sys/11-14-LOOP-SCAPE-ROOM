'use strict';
// Rutas de la API:  POST /api/pedidos · POST /api/contacto · GET /api/salud · /api/admin/* (panel)
const { crearPedido, crearMensaje } = require('./db');
const { DatosInvalidos, validarPedido, validarMensaje } = require('./validacion');
const { avisarPedido, avisarMensaje } = require('./correo');
const { leerJson, responderJson, crearLimitador } = require('./http');
const admin = require('./admin');

const demasiadasSolicitudes = crearLimitador(30, 10 * 60e3); // 30 cada 10 minutos por IP

// ---- Manejadores ----
async function nuevoPedido(req, res) {
  const pedido = crearPedido(validarPedido(await leerJson(req)));
  avisarPedido(pedido.id).catch(console.error);  // el correo no hace esperar al cliente
  responderJson(res, 201, { numero: pedido.numero, referencia: pedido.referencia });
}
async function nuevoMensaje(req, res) {
  const id = crearMensaje(validarMensaje(await leerJson(req)));
  avisarMensaje(id).catch(console.error);
  responderJson(res, 201, { ok: true });
}

const RUTAS = { 'POST /api/pedidos': nuevoPedido, 'POST /api/contacto': nuevoMensaje };

/** Devuelve true si la solicitud era de la API (y ya fue respondida). */
async function manejarApi(req, res, ruta) {
  if (!ruta.startsWith('/api/')) return false;
  if (ruta.startsWith('/api/admin/')) { await admin.manejar(req, res, ruta); return true; }
  try {
    if (req.method === 'GET' && ruta === '/api/salud') { responderJson(res, 200, { ok: true }); return true; }
    const manejador = RUTAS[`${req.method} ${ruta}`];
    if (!manejador) { responderJson(res, 404, { error: 'No encontrado' }); return true; }
    if (demasiadasSolicitudes(req.socket.remoteAddress || '?')) {
      responderJson(res, 429, { error: 'Demasiadas solicitudes, intenta más tarde' }); return true;
    }
    await manejador(req, res);
  } catch (e) {
    if (e instanceof DatosInvalidos) responderJson(res, 400, { error: e.message });
    else { console.error(e); responderJson(res, 500, { error: 'Error del servidor' }); }
  }
  return true;
}

module.exports = { manejarApi };
