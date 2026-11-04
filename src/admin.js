'use strict';
// Panel de administración: solo el dueño (con contraseña) puede ver los datos guardados.
//   POST /api/admin/login   { clave }  -> abre sesión (cookie)
//   GET  /api/admin/datos              -> pedidos, clientes y mensajes
//   POST /api/admin/logout             -> cierra sesión
const crypto = require('node:crypto');
const cfg = require('./config');
const { leerTodo } = require('./db');
const { DatosInvalidos } = require('./validacion');
const { leerJson, responderJson, crearLimitador } = require('./http');

const COOKIE = 'loop_admin';
const DURACION_MS = 8 * 60 * 60e3;               // la sesión dura 8 horas
const sesiones = new Map();                      // token -> expira
const demasiadosIntentos = crearLimitador(6, 10 * 60e3); // 6 intentos de clave cada 10 minutos por IP

const hash = (s) => crypto.createHash('sha256').update(String(s)).digest();
const claveCorrecta = (intento) => crypto.timingSafeEqual(hash(intento), hash(cfg.CLAVE_ADMIN));

function tokenDe(req) {
  const m = new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`).exec(req.headers.cookie || '');
  return m ? m[1] : null;
}
function sesionValida(req) {
  const t = tokenDe(req);
  const exp = t && sesiones.get(t);
  if (!exp) return false;
  if (exp < Date.now()) { sesiones.delete(t); return false; }
  return true;
}
const cookie = (valor, maxAgeSeg) =>
  `${COOKIE}=${valor}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAgeSeg}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

async function manejar(req, res, ruta) {
  try {
    if (!cfg.CLAVE_ADMIN) {
      return responderJson(res, 503, { error: 'Panel desactivado: define ADMIN_PASSWORD en el archivo .env' });
    }
    if (req.method === 'POST' && ruta === '/api/admin/login') {
      if (demasiadosIntentos(req.socket.remoteAddress || '?')) {
        return responderJson(res, 429, { error: 'Demasiados intentos, espera unos minutos' });
      }
      const { clave } = await leerJson(req);
      if (typeof clave !== 'string' || !claveCorrecta(clave)) return responderJson(res, 401, { error: 'Contraseña incorrecta' });
      const token = crypto.randomBytes(32).toString('hex');
      sesiones.set(token, Date.now() + DURACION_MS);
      return responderJson(res, 200, { ok: true }, { 'Set-Cookie': cookie(token, DURACION_MS / 1000) });
    }
    if (req.method === 'POST' && ruta === '/api/admin/logout') {
      sesiones.delete(tokenDe(req));
      return responderJson(res, 200, { ok: true }, { 'Set-Cookie': cookie('', 0) });
    }
    if (req.method === 'GET' && ruta === '/api/admin/datos') {
      if (!sesionValida(req)) return responderJson(res, 401, { error: 'Inicia sesión' });
      return responderJson(res, 200, leerTodo());
    }
    return responderJson(res, 404, { error: 'No encontrado' });
  } catch (e) {
    if (e instanceof DatosInvalidos) return responderJson(res, 400, { error: e.message });
    console.error(e);
    return responderJson(res, 500, { error: 'Error del servidor' });
  }
}

module.exports = { manejar };
