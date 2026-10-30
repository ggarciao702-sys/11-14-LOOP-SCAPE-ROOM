'use strict';
// Avisos por correo al dueño de la tienda. Si falla, el dato ya está en la base y se reintenta.
const cfg = require('./config');
const { sql } = require('./db');

let transporte = null; // null = sin crear todavía, false = no disponible

function obtenerTransporte() {
  if (transporte !== null) return transporte || null;
  if (!cfg.SMTP.usuario || !cfg.SMTP.clave) {
    console.warn('[correo] Falta SMTP_USER / SMTP_PASS en .env: los avisos quedan pendientes.');
    return (transporte = false);
  }
  try {
    const nodemailer = require('nodemailer');
    transporte = nodemailer.createTransport({
      host: cfg.SMTP.host, port: cfg.SMTP.port, secure: cfg.SMTP.secure,
      auth: { user: cfg.SMTP.usuario, pass: cfg.SMTP.clave },
    });
    return transporte;
  } catch (_) {
    console.error('[correo] nodemailer no está instalado. Ejecuta: npm install');
    return (transporte = false);
  }
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
const fila = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`;

async function enviar({ asunto, html, texto, responderA }) {
  const t = obtenerTransporte();
  if (!t) return false;
  try {
    await t.sendMail({
      from: `"LOOP Tienda" <${cfg.SMTP.usuario}>`, to: cfg.CORREO_DESTINO,
      subject: asunto, html, text: texto, ...(responderA ? { replyTo: responderA } : {}),
    });
    return true;
  } catch (e) {
    console.error('[correo] No se pudo enviar:', e.message);
    return false;
  }
}

async function avisarPedido(id) {
  const p = sql.pedidoCompleto.get(id);
  if (!p) return false;
  const items = sql.itemsDePedido.all(id);
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
    <h2>Nuevo pedido ${esc(p.numero)}</h2>
    <table>${fila('Nombre', p.nombre)}${fila('Documento', p.documento)}${fila('Teléfono', p.telefono)}
    ${fila('Correo', p.correo)}${fila('Ciudad', p.ciudad)}${fila('País', p.pais)}</table>
    <h3>Compra</h3><ul>${items.map((i) => `<li>${esc(i.nombre)} — USD ${i.precio_usd.toFixed(2)}</li>`).join('')}</ul>
    <table>${fila('Total', `${p.total.toLocaleString('es-CO')} ${p.moneda} (USD ${p.total_usd.toFixed(2)})`)}
    ${fila('Método de pago', p.metodo_pago + (p.banco ? ' – ' + p.banco : ''))}
    ${p.referencia_pago ? fila('Referencia de pago', p.referencia_pago) : ''}${fila('Estado', p.estado)}
    ${fila('Fecha (UTC)', p.creado_en)}</table></div>`;
  const texto = [`Nuevo pedido ${p.numero}`, `Nombre: ${p.nombre}`, `Documento: ${p.documento}`, `Teléfono: ${p.telefono}`,
    `Correo: ${p.correo}`, `Ciudad: ${p.ciudad}, ${p.pais}`,
    ...items.map((i) => `${i.nombre} — USD ${i.precio_usd.toFixed(2)}`),
    `Total: ${p.total} ${p.moneda} (USD ${p.total_usd.toFixed(2)})`, `Pago: ${p.metodo_pago} ${p.banco || ''}`, `Estado: ${p.estado}`].join('\n');
  const ok = await enviar({ asunto: `[LOOP] Nuevo pedido ${p.numero} — ${p.nombre}`, html, texto, responderA: p.correo });
  if (ok) sql.pedidoMarcarEnviado.run(id);
  return ok;
}

async function avisarMensaje(id) {
  const m = sql.mensajePorId.get(id);
  if (!m) return false;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px"><h2>Nuevo mensaje de contacto</h2>
    <table>${fila('Usuario', m.usuario)}${fila('Tipo', m.tipo_reporte)}${fila('Fecha (UTC)', m.creado_en)}</table>
    <p style="white-space:pre-wrap">${esc(m.descripcion)}</p></div>`;
  const ok = await enviar({
    asunto: `[LOOP] ${m.tipo_reporte} — ${m.usuario}`, html,
    texto: `Usuario: ${m.usuario}\nTipo: ${m.tipo_reporte}\n\n${m.descripcion}`,
  });
  if (ok) sql.mensajeMarcarEnviado.run(id);
  return ok;
}

/** Reintenta lo que no se pudo enviar (sin internet, clave mal puesta, etc.). */
async function reintentarPendientes() {
  if (!obtenerTransporte()) return;
  for (const { id } of sql.pedidosPendientes.all()) await avisarPedido(id);
  for (const { id } of sql.mensajesPendientes.all()) await avisarMensaje(id);
}

module.exports = { obtenerTransporte, avisarPedido, avisarMensaje, reintentarPendientes };
