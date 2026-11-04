'use strict';

class DatosInvalidos extends Error {}

// Validación de texto genérico (longitud estricta)
const texto = (v, max, min = 1) => {
  const s = String(v ?? '').replace(/\s+/g, ' ').trim();
  if (s.length < min || s.length > max) throw new DatosInvalidos('Datos inválidos');
  return s;
};

// Validación de número genérico
const numero = (v, max) => {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > max) throw new DatosInvalidos('Datos inválidos');
  return n;
};

const METODOS_PAGO = new Set(['card', 'pse', 'mp', 'pp', 'cash', 'pix']);

function validarPedido(b) {
  const c = b.cliente || {};

  // 1. Nombre completo: Máximo 35 caracteres y solo letras
  const nombre = texto(c.nombre, 35, 1);
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    throw new DatosInvalidos('El nombre solo debe contener letras');
  }

  // 2. Documento de identidad: Mínimo 8 dígitos, máximo 12 dígitos
  const documento = texto(c.documento, 12, 8);
  if (!/^\d{8,12}$/.test(documento)) {
    throw new DatosInvalidos('El documento debe contener entre 8 y 12 números');
  }

  // 3. Teléfono: Exactamente 10 números (mínimo 10, máximo 10)
  const telefono = texto(c.telefono, 10, 10);
  if (!/^\d{10}$/.test(telefono)) {
    throw new DatosInvalidos('El teléfono debe contener exactamente 10 números');
  }

  // 4. Correo electrónico: Debe ser obligatorio que termine en @gmail.com
  const correo = texto(c.correo, 120, 11).toLowerCase();
  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo)) {
    throw new DatosInvalidos('El correo debe terminar obligatoriamente en @gmail.com');
  }

  // 5. Ciudad y País: Máximo 40 caracteres y solo letras
  const ciudad = texto(c.ciudad, 40, 1);
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.-]+$/.test(ciudad)) {
    throw new DatosInvalidos('La ciudad solo debe contener letras');
  }

  const pais = texto(b.pais, 40, 1);
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.-]+$/.test(pais)) {
    throw new DatosInvalidos('El país solo debe contener letras');
  }

  // 6. Método de pago
  const metodo = texto(b.metodo_pago, 20).toLowerCase();
  if (!METODOS_PAGO.has(metodo)) {
    throw new DatosInvalidos('Método de pago inválido');
  }

  // 7. Validación de Ítems del Carrito
  if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 30) {
    throw new DatosInvalidos('Carrito inválido');
  }

  const items = b.items.map((i) => {
    const id = texto(i.id, 6).toLowerCase();
    if (!/^[nvpc]\d{1,3}$/.test(id)) {
      throw new DatosInvalidos('Producto inválido');
    }

    const cantidad = i.cantidad === undefined ? 1 : numero(i.cantidad, 99);
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new DatosInvalidos('Cantidad inválida');
    }

    return { id, cantidad };
  });

  return {
    cliente: {
      nombre,
      documento,
      telefono,
      correo,
      ciudad,
    },
    pais,
    moneda: texto(b.moneda, 6).toUpperCase(),
    metodo,
    banco: b.banco ? texto(b.banco, 60) : '',
    idioma: texto(b.idioma || 'es', 5),
    items,
  };
}

function validarMensaje(b) {
  return {
    usuario: texto(b.usuario, 120),
    tipo: texto(b.tipo_reporte, 80),
    descripcion: textoLargo(b.descripcion, 4000),
  };
}

module.exports = { DatosInvalidos, validarPedido, validarMensaje };
