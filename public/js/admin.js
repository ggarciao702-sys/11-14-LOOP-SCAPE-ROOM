// Panel de datos: muestra pedidos, clientes y mensajes guardados en la base de datos.
// Todo el texto se inserta con textContent (nunca como HTML) para que nadie pueda colar código.
const $ = (s) => document.querySelector(s);
if (self !== top) document.body.classList.add('embebido'); // abierto dentro de la tienda
const SIN_SERVIDOR = location.protocol === 'file:'
  ? 'Abriste la página con doble clic. Inicia el servidor (npm start) y entra por http://localhost:3000'
  : 'No hay conexión con el servidor';
let datos = null, pestana = 'pedidos';

// ---------- Formato ----------
const fecha = (s) => new Date(String(s).replace(' ', 'T') + 'Z').toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
const dinero = (n, moneda) => {
  try { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda, maximumFractionDigits: moneda === 'COP' || moneda === 'CLP' || moneda === 'ARS' ? 0 : 2 }).format(n); }
  catch { return n + ' ' + moneda; }
};
const si = (v) => (v ? 'Sí' : 'No');

// ---------- Columnas de cada tabla: t = título, v = valor, c = clase, p = pastilla ----------
const COLUMNAS = {
  pedidos: [
    { t: 'Fecha', v: (r) => fecha(r.creado_en), c: 'nowrap' },
    { t: 'Pedido', v: (r) => r.numero, c: 'nowrap' },
    { t: 'Cliente', v: (r) => r.nombre },
    { t: 'Documento', v: (r) => r.documento },
    { t: 'Teléfono', v: (r) => r.telefono, c: 'nowrap' },
    { t: 'Correo', v: (r) => r.correo },
    { t: 'Ciudad', v: (r) => r.ciudad },
    { t: 'País', v: (r) => r.pais },
    { t: 'Productos', v: (r) => r.items.map((i) => i.nombre).join('\n'), c: 'ancho' },
    { t: 'Total', v: (r) => dinero(r.total, r.moneda) + ' (USD ' + r.total_usd.toFixed(2) + ')', c: 'nowrap' },
    { t: 'Pago', v: (r) => ({ card: 'Tarjeta', pse: 'PSE', mp: 'Mercado Pago', pp: 'PayPal', cash: 'Efectivo', pix: 'Pix' }[r.metodo_pago] || r.metodo_pago) + (r.banco ? ' – ' + r.banco : '') },
    { t: 'Referencia', v: (r) => r.referencia_pago || '' , c: 'nowrap' },
    { t: 'Estado', v: (r) => (r.estado === 'pendiente' ? 'Pendiente de pago' : 'Pagado (demo)'), p: (r) => (r.estado === 'pendiente' ? 'pend' : 'ok') },
    { t: 'Aviso al correo', v: (r) => (r.correo_enviado ? 'Enviado' : 'Pendiente'), p: (r) => (r.correo_enviado ? 'ok' : 'no') },
  ],
  clientes: [
    { t: 'Registro', v: (r) => fecha(r.creado_en), c: 'nowrap' },
    { t: 'Nombre', v: (r) => r.nombre },
    { t: 'Documento', v: (r) => r.documento },
    { t: 'Teléfono', v: (r) => r.telefono, c: 'nowrap' },
    { t: 'Correo', v: (r) => r.correo },
    { t: 'Ciudad', v: (r) => r.ciudad },
    { t: 'Pedidos', v: (r) => String(r.pedidos) },
  ],
  mensajes: [
    { t: 'Fecha', v: (r) => fecha(r.creado_en), c: 'nowrap' },
    { t: 'Usuario', v: (r) => r.usuario },
    { t: 'Tipo', v: (r) => r.tipo_reporte },
    { t: 'Mensaje', v: (r) => r.descripcion, c: 'ancho' },
    { t: 'Aviso al correo', v: (r) => (r.correo_enviado ? 'Enviado' : 'Pendiente'), p: (r) => (r.correo_enviado ? 'ok' : 'no') },
  ],
};
const NOMBRE_ARCHIVO = { pedidos: 'pedidos', clientes: 'clientes', mensajes: 'mensajes' };

// ---------- Pantallas ----------
function mostrarLogin(msg = '') {
  datos = null;
  $('#login').hidden = false; $('#datos').hidden = true; $('#acciones').hidden = true;
  const err = $('#login-err'); err.textContent = msg; $('#clave').value = ''; $('#clave').focus();
  if (msg === SIN_SERVIDOR && location.protocol === 'file:') {   // sin servidor: ofrece ir a la dirección correcta
    const a = document.createElement('a'); a.href = 'http://localhost:3000/'; a.target = '_top'; a.className = 'btn';
    a.style.cssText = 'display:inline-block;margin-top:12px'; a.textContent = 'Ir a http://localhost:3000';
    err.append(document.createElement('br'), a);
  }
}
function mostrarDatos() { $('#login').hidden = true; $('#datos').hidden = false; $('#acciones').hidden = false; }

async function cargar() {
  const r = await fetch('/api/admin/datos', { credentials: 'same-origin' });
  if (r.status === 401) return mostrarLogin('');
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    return mostrarLogin(j.error || 'No se pudieron cargar los datos');
  }
  datos = await r.json();
  mostrarDatos(); estado(); cifras(); pintar();
}

function estado() {
  const b = datos.base, f = b.filas, total = f.clientes + f.pedidos + f.mensajes_contacto;
  $('#estado').textContent = '● Conectado a la base de datos real: ' + b.archivo + ' (' + b.motor + ') · ' +
    f.clientes + ' clientes, ' + f.pedidos + ' pedidos, ' + f.pedido_items + ' productos vendidos, ' + f.mensajes_contacto + ' mensajes' +
    (total ? '' : ' · Aún no hay registros: aparecerán aquí cuando alguien compre o escriba en Soporte.');
}

function cifras() {
  const pagados = datos.pedidos.filter((p) => p.estado !== 'pendiente');
  const usd = datos.pedidos.reduce((s, p) => s + p.total_usd, 0);
  const sinAviso = datos.pedidos.filter((p) => !p.correo_enviado).length + datos.mensajes.filter((m) => !m.correo_enviado).length;
  const items = [
    [datos.pedidos.length, 'Pedidos'], [datos.clientes.length, 'Clientes'], [datos.mensajes.length, 'Mensajes de soporte'],
    ['USD ' + usd.toFixed(2), 'Suma de pedidos'], [pagados.length, 'Pagados (demo)'], [sinAviso, 'Avisos al correo pendientes'],
  ];
  const cont = $('#cifras'); cont.textContent = '';
  for (const [n, txt] of items) {
    const d = document.createElement('div'), b = document.createElement('b'), s = document.createElement('small');
    b.textContent = n; s.textContent = txt; d.append(b, s); cont.append(d);
  }
}

function filas() {
  const q = $('#buscar').value.trim().toLowerCase();
  const cols = COLUMNAS[pestana];
  return datos[pestana].filter((r) => !q || cols.some((c) => c.v(r).toLowerCase().includes(q)));
}

function pintar() {
  const cols = COLUMNAS[pestana], rows = filas();
  const th = $('#tabla thead'), tb = $('#tabla tbody');
  th.textContent = ''; tb.textContent = '';
  const trh = document.createElement('tr');
  for (const c of cols) { const e = document.createElement('th'); e.textContent = c.t; trh.append(e); }
  th.append(trh);
  if (!rows.length) {
    const tr = document.createElement('tr'), td = document.createElement('td');
    td.colSpan = cols.length; td.className = 'adm-vacio';
    td.textContent = datos[pestana].length ? 'Nada coincide con la búsqueda.' : 'Todavía no hay datos aquí.';
    tr.append(td); tb.append(tr);
  }
  for (const r of rows) {
    const tr = document.createElement('tr');
    for (const c of cols) {
      const td = document.createElement('td'); if (c.c) td.className = c.c;
      if (c.p) { const s = document.createElement('span'); s.className = 'pill ' + c.p(r); s.textContent = c.v(r); td.append(s); }
      else td.textContent = c.v(r);
      tr.append(td);
    }
    tb.append(tr);
  }
  $('#nota').textContent = rows.length + ' de ' + datos[pestana].length + ' registros · hora de tu dispositivo';
  document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === pestana));
}

// ---------- CSV (abre bien en Excel) ----------
function descargarCsv() {
  const cols = COLUMNAS[pestana];
  const celda = (v) => '"' + String(v).replace(/"/g, '""').replace(/\n/g, ' | ') + '"';
  const lineas = [cols.map((c) => celda(c.t)).join(',')].concat(filas().map((r) => cols.map((c) => celda(c.v(r))).join(',')));
  const blob = new Blob(['\ufeff' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'loop-' + NOMBRE_ARCHIVO[pestana] + '-' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---------- Eventos ----------
$('#form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const b = e.target.querySelector('button'); b.disabled = true; $('#login-err').textContent = '';
  try {
    const r = await fetch('/api/admin/login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clave: $('#clave').value }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) await cargar(); else $('#login-err').textContent = j.error || 'No se pudo entrar';
  } catch { $('#login-err').textContent = SIN_SERVIDOR; }
  b.disabled = false;
});
$('#tabs').addEventListener('click', (e) => { const t = e.target.closest('button[data-t]'); if (t) { pestana = t.dataset.t; pintar(); } });
$('#buscar').addEventListener('input', () => datos && pintar());
$('#recargar').onclick = () => cargar().catch(() => {});
$('#csv').onclick = () => datos && descargarCsv();
$('#salir').onclick = async () => { try { await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }); } catch {} mostrarLogin(''); };

cargar().catch(() => mostrarLogin(SIN_SERVIDOR));
