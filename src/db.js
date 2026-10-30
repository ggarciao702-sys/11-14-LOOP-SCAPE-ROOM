'use strict';
// Base de datos SQLite: abre el archivo, crea las tablas y expone las operaciones.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const cfg = require('./config');

const db = new DatabaseSync(cfg.ARCHIVO_DB);
db.exec(fs.readFileSync(cfg.ESQUEMA_SQL, 'utf8'));

const sql = {
  clienteBuscar: db.prepare('SELECT id FROM clientes WHERE correo = ? AND documento = ?'),
  clienteNuevo: db.prepare('INSERT INTO clientes (nombre, documento, telefono, correo, ciudad) VALUES (?,?,?,?,?)'),
  clienteActualizar: db.prepare('UPDATE clientes SET nombre = ?, telefono = ?, ciudad = ? WHERE id = ?'),
  pedidoNuevo: db.prepare(`INSERT INTO pedidos
    (numero, cliente_id, pais, moneda, total, total_usd, metodo_pago, banco, referencia_pago, estado, idioma)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`),
  itemNuevo: db.prepare('INSERT INTO pedido_items (pedido_id, producto_id, nombre, precio_usd) VALUES (?,?,?,?)'),
  pedidoCompleto: db.prepare(`SELECT p.*, c.nombre, c.documento, c.telefono, c.correo, c.ciudad
    FROM pedidos p JOIN clientes c ON c.id = p.cliente_id WHERE p.id = ?`),
  itemsDePedido: db.prepare('SELECT nombre, precio_usd FROM pedido_items WHERE pedido_id = ?'),
  pedidoMarcarEnviado: db.prepare('UPDATE pedidos SET correo_enviado = 1 WHERE id = ?'),
  pedidosPendientes: db.prepare('SELECT id FROM pedidos WHERE correo_enviado = 0'),
  mensajeNuevo: db.prepare('INSERT INTO mensajes_contacto (usuario, tipo_reporte, descripcion) VALUES (?,?,?)'),
  mensajePorId: db.prepare('SELECT * FROM mensajes_contacto WHERE id = ?'),
  mensajeMarcarEnviado: db.prepare('UPDATE mensajes_contacto SET correo_enviado = 1 WHERE id = ?'),
  mensajesPendientes: db.prepare('SELECT id FROM mensajes_contacto WHERE correo_enviado = 0'),
  // Lectura para el panel de administración (lo más reciente primero)
  listaPedidos: db.prepare(`SELECT p.id, p.numero, p.creado_en, p.pais, p.moneda, p.total, p.total_usd,
    p.metodo_pago, p.banco, p.referencia_pago, p.estado, p.correo_enviado,
    c.nombre, c.documento, c.telefono, c.correo, c.ciudad
    FROM pedidos p JOIN clientes c ON c.id = p.cliente_id ORDER BY p.id DESC LIMIT 2000`),
  listaItems: db.prepare('SELECT pedido_id, nombre, precio_usd FROM pedido_items ORDER BY id'),
  listaClientes: db.prepare(`SELECT c.id, c.nombre, c.documento, c.telefono, c.correo, c.ciudad, c.creado_en,
    (SELECT COUNT(*) FROM pedidos p WHERE p.cliente_id = c.id) AS pedidos
    FROM clientes c ORDER BY c.id DESC LIMIT 2000`),
  listaMensajes: db.prepare('SELECT * FROM mensajes_contacto ORDER BY id DESC LIMIT 2000'),
};

function enTransaccion(fn) {
  db.exec('BEGIN');
  try { const r = fn(); db.exec('COMMIT'); return r; }
  catch (e) { db.exec('ROLLBACK'); throw e; }
}

/** Guarda cliente + pedido + productos. Devuelve { id, numero, referencia }. */
function crearPedido(d) {
  return enTransaccion(() => {
    const existente = sql.clienteBuscar.get(d.cliente.correo, d.cliente.documento);
    let clienteId;
    if (existente) {
      clienteId = existente.id;
      sql.clienteActualizar.run(d.cliente.nombre, d.cliente.telefono, d.cliente.ciudad, clienteId);
    } else {
      const c = d.cliente;
      clienteId = Number(sql.clienteNuevo.run(c.nombre, c.documento, c.telefono, c.correo, c.ciudad).lastInsertRowid);
    }

    const efectivo = d.metodo === 'cash';
    const referencia = efectivo ? Array.from({ length: 12 }, () => crypto.randomInt(10)).join('') : '';
    const estado = efectivo ? 'pendiente' : 'pagado_demo';
    const hoy = new Date(), dos = (n) => String(n).padStart(2, '0');
    const dia = `${hoy.getFullYear()}${dos(hoy.getMonth() + 1)}${dos(hoy.getDate())}`;

    for (let intento = 0; intento < 8; intento++) {
      const numero = `LOOP-${dia}-${crypto.randomInt(1000, 10000)}`;
      try {
        const id = Number(sql.pedidoNuevo.run(numero, clienteId, d.pais, d.moneda, d.total, d.totalUsd,
          d.metodo, d.banco, referencia, estado, d.idioma).lastInsertRowid);
        for (const i of d.items) sql.itemNuevo.run(id, i.id, i.nombre, i.precio);
        return { id, numero, referencia };
      } catch (e) { if (!/UNIQUE/i.test(e.message)) throw e; } // número repetido: reintenta
    }
    throw new Error('No se pudo generar el número de pedido');
  });
}

function crearMensaje(m) {
  return Number(sql.mensajeNuevo.run(m.usuario, m.tipo, m.descripcion).lastInsertRowid);
}

const contar = (tabla) => db.prepare(`SELECT COUNT(*) AS n FROM ${tabla}`).get().n; // tabla: valores fijos de abajo

/** Todo lo guardado, para el panel de administración. */
function leerTodo() {
  const items = sql.listaItems.all();
  const porPedido = new Map();
  for (const i of items) {
    if (!porPedido.has(i.pedido_id)) porPedido.set(i.pedido_id, []);
    porPedido.get(i.pedido_id).push({ nombre: i.nombre, precio_usd: i.precio_usd });
  }
  return {
    pedidos: sql.listaPedidos.all().map((p) => ({ ...p, items: porPedido.get(p.id) || [] })),
    clientes: sql.listaClientes.all(),
    mensajes: sql.listaMensajes.all(),
    base: {
      archivo: path.basename(cfg.ARCHIVO_DB), motor: 'SQLite',
      filas: { clientes: contar('clientes'), pedidos: contar('pedidos'), pedido_items: contar('pedido_items'), mensajes_contacto: contar('mensajes_contacto') },
    },
  };
}

module.exports = { sql, crearPedido, crearMensaje, leerTodo };
