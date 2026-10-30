'use strict';
// Validación de lo que llega desde la página. Solo se aceptan los campos listados aquí.
class DatosInvalidos extends Error {}

const texto = (v, max, min = 1) => {
  const s = String(v ?? '').replace(/\s+/g, ' ').trim();
  if (s.length < min || s.length > max) throw new DatosInvalidos('Datos inválidos');
  return s;
};
const textoLargo = (v, max) => {
  const s = String(v ?? '').replace(/\r/g, '').trim();
  if (!s || s.length > max) throw new DatosInvalidos('Datos inválidos');
  return s;
};
const numero = (v, max) => {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > max) throw new DatosInvalidos('Datos inválidos');
  return n;
};

const METODOS_PAGO = new Set(['card', 'pse', 'mp', 'pp', 'cash', 'pix']);

function validarPedido(b) {
  const c = b.cliente || {};
  const correo = texto(c.correo, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) throw new DatosInvalidos('Correo inválido');

  const metodo = texto(b.metodo_pago, 20).toLowerCase();
  if (!METODOS_PAGO.has(metodo)) throw new DatosInvalidos('Método inválido');

  if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 30) throw new DatosInvalidos('Carrito inválido');
  const items = b.items.map((i) => {
    const id = texto(i.id, 6);
    if (!/^[nvpc]\d{1,3}$/.test(id)) throw new DatosInvalidos('Producto inválido');
    return { id, nombre: texto(i.nombre, 120), precio: numero(i.precio_usd, 10000) };
  });

  // Los datos de tarjeta (número, vencimiento, CVV) nunca se reciben, guardan ni envían.
  return {
    cliente: {
      nombre: texto(c.nombre, 120), documento: texto(c.documento, 40),
      telefono: texto(c.telefono, 30, 5), correo, ciudad: texto(c.ciudad, 80),
    },
    pais: texto(b.pais, 60), moneda: texto(b.moneda, 6), total: numero(b.total, 1e12),
    metodo, banco: b.banco ? texto(b.banco, 60) : '', idioma: texto(b.idioma || 'es', 5),
    items, totalUsd: items.reduce((s, i) => s + i.precio, 0),
  };
}

function validarMensaje(b) {
  return { usuario: texto(b.usuario, 120), tipo: texto(b.tipo_reporte, 80), descripcion: textoLargo(b.descripcion, 4000) };
}

module.exports = { DatosInvalidos, validarPedido, validarMensaje };
