'use strict';
// Base de datos SQLite: abre el archivo, crea las tablas y expone las operaciones.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const cfg = require('./config');

const db = new DatabaseSync(cfg.ARCHIVO_DB);
db.exec(fs.readFileSync(cfg.ESQUEMA_SQL, 'utf8'));

// Compatibilidad con bases creadas en etapas anteriores: solo agrega la columna
// nueva si falta, nunca elimina ni reescribe datos existentes.
if (!db.prepare("SELECT 1 FROM pragma_table_info('pedido_items') WHERE name = 'cantidad'").get()) {
  db.exec('ALTER TABLE pedido_items ADD COLUMN cantidad INTEGER NOT NULL DEFAULT 1');
}

const CATALOGO_INICIAL = [
  ['n0', 'Nivel 1: Vías olvidadas', 'nivel', 9.99, 'img/n1.jpg', 1],
  ['n1', 'Nivel 2: Armero', 'nivel', 4.99, 'img/n2.jpg', 1],
  ['n2', 'Nivel 3: El auto sumergido', 'nivel', null, 'img/n3.jpg', 0],
  ['v0', 'El campesino cundiboyacense', 'vestuario', 15, 'img/v2.jpg', 1],
  ['v1', 'Ropa normal', 'vestuario', 15, 'img/v4.jpg', 1],
  ['v2', 'El desconocido', 'vestuario', 15, 'img/v6.jpg', 1],
  ['v3', 'El vaquero', 'vestuario', 15, 'img/v3.jpg', 1],
  ['v4', 'El superviviente', 'vestuario', 15, 'img/v5.jpg', 1],
  ['v5', 'El payaso', 'vestuario', 15, 'img/v1.jpg', 1],
  ...['Pinchi', 'Don Tigre', 'Goldi', 'Vampi', 'Sonrisón', 'Colmillo', 'Manitas']
    .map((nombre, i) => [`p${i}`, nombre, 'mascota', null, `img/pt${i + 1}.jpg`, 0]),
  ...['Cristian', 'Sara', 'Cano', 'Andrea', 'Shaday', 'Gabriela']
    .map((nombre, i) => [`c${i}`, nombre, 'personaje', null, `img/${nombre.toLowerCase()}.jpg`, 0]),
];
const insertarProducto = db.prepare(`INSERT OR IGNORE INTO productos
  (id, nombre, categoria, precio, moneda, imagen, activo) VALUES (?, ?, ?, ?, 'USD', ?, ?)`);
for (const producto of CATALOGO_INICIAL) insertarProducto.run(...producto);

const sql = {
  clienteBuscar: db.prepare('SELECT id FROM clientes WHERE correo = ? AND documento = ?'),
  clienteNuevo: db.prepare('INSERT INTO clientes (nombre, documento, telefono, correo, ciudad) VALUES (?,?,?,?,?)'),
  clienteActualizar: db.prepare('UPDATE clientes SET nombre = ?, telefono = ?, ciudad = ? WHERE id = ?'),
  pedidoNuevo: db.prepare(`INSERT INTO pedidos
    (numero, cliente_id, pais, moneda, total, total_usd, metodo_pago, banco, referencia_pago, estado, idioma)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`),
  itemNuevo: db.prepare('INSERT INTO pedido_items (pedido_id, producto_id, nombre, precio_usd, cantidad) VALUES (?,?,?,?,?)'),
  productoPorId: db.prepare('SELECT * FROM productos WHERE id = ?'),
  productosActivos: db.prepare('SELECT id, nombre, categoria, precio, moneda, imagen, activo FROM productos WHERE activo = 1 ORDER BY categoria, id'),
  pedidoCompleto: db.prepare(`SELECT p.*, c.nombre, c.documento, c.telefono, c.correo, c.ciudad
    FROM pedidos p JOIN clientes c ON c.id = p.cliente_id WHERE p.id = ?`),
  itemsDePedido: db.prepare('SELECT producto_id, nombre, precio_usd, cantidad FROM pedido_items WHERE pedido_id = ?'),
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
  listaItems: db.prepare('SELECT pedido_id, producto_id, nombre, precio_usd, cantidad FROM pedido_items ORDER BY id'),
  listaProductos: db.prepare('SELECT * FROM productos ORDER BY categoria, id'),
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
const TASAS = { COP: 3900, MXN: 18, ARS: 1200, PEN: 3.7, CLP: 950, BRL: 5.5, USD: 1, EUR: 0.92 };
class ProductoNoDisponible extends Error {}

function crearPedido(d) {
  return enTransaccion(() => {
    const moneda = d.moneda.toUpperCase();
    if (!TASAS[moneda]) throw new ProductoNoDisponible('Moneda no disponible');
    const items = d.items.map((item) => {
      const producto = sql.productoPorId.get(item.id);
      if (!producto || !producto.activo || producto.precio === null) throw new ProductoNoDisponible('Producto no disponible');
      return { ...item, nombre: producto.nombre, precio: producto.precio };
    });
    const totalUsd = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const total = Math.round(totalUsd * TASAS[moneda] * 100) / 100;
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
        const id = Number(sql.pedidoNuevo.run(numero, clienteId, d.pais, moneda, total, totalUsd,
          d.metodo, d.banco, referencia, estado, d.idioma).lastInsertRowid);
        for (const i of items) sql.itemNuevo.run(id, i.id, i.nombre, i.precio, i.cantidad);
        return { id, numero, referencia, total, totalUsd };
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
    porPedido.get(i.pedido_id).push({ producto_id: i.producto_id, nombre: i.nombre, precio_usd: i.precio_usd, cantidad: i.cantidad });
  }
  return {
    pedidos: sql.listaPedidos.all().map((p) => ({ ...p, items: porPedido.get(p.id) || [] })),
    clientes: sql.listaClientes.all(),
    mensajes: sql.listaMensajes.all(), productos: sql.listaProductos.all(),
    base: {
      archivo: path.basename(cfg.ARCHIVO_DB), motor: 'SQLite',
      filas: { clientes: contar('clientes'), pedidos: contar('pedidos'), pedido_items: contar('pedido_items'), mensajes_contacto: contar('mensajes_contacto'), productos: contar('productos') },
    },
  };
}

module.exports = { sql, crearPedido, crearMensaje, leerTodo, productosActivos: () => sql.productosActivos.all(), ProductoNoDisponible };
