-- Esquema de la base de datos de LOOP (SQLite). Se aplica solo al iniciar el servidor.
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Catálogo de productos. Los precios se expresan en USD y el servidor los usa
-- para calcular los pedidos; activo = 0 conserva productos aún no disponibles.
CREATE TABLE IF NOT EXISTS productos (
  id         TEXT PRIMARY KEY,
  nombre     TEXT NOT NULL,
  categoria  TEXT NOT NULL,
  precio     REAL,
  moneda     TEXT NOT NULL DEFAULT 'USD',
  imagen     TEXT NOT NULL,
  activo     INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

-- Personas que compran (una fila por correo + documento)
CREATE TABLE IF NOT EXISTS clientes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre     TEXT NOT NULL,
  documento  TEXT NOT NULL,
  telefono   TEXT NOT NULL,
  correo     TEXT NOT NULL,
  ciudad     TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (correo, documento)
);

-- Un pedido por compra. Nunca guarda datos de tarjeta.
CREATE TABLE IF NOT EXISTS pedidos (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  numero          TEXT NOT NULL UNIQUE,
  cliente_id      INTEGER NOT NULL REFERENCES clientes(id),
  pais            TEXT,
  moneda          TEXT,
  total           REAL NOT NULL,
  total_usd       REAL NOT NULL,
  metodo_pago     TEXT NOT NULL,
  banco           TEXT,
  referencia_pago TEXT,
  estado          TEXT NOT NULL,            -- pagado_demo | pendiente
  idioma          TEXT,
  correo_enviado  INTEGER NOT NULL DEFAULT 0, -- 0 = aviso por correo pendiente
  creado_en       TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Productos de cada pedido
CREATE TABLE IF NOT EXISTS pedido_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  pedido_id   INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id TEXT NOT NULL,
  nombre      TEXT NOT NULL,
  precio_usd  REAL NOT NULL,
  cantidad    INTEGER NOT NULL DEFAULT 1
);

-- Mensajes del formulario de Soporte
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario        TEXT NOT NULL,
  tipo_reporte   TEXT NOT NULL,
  descripcion    TEXT NOT NULL,
  correo_enviado INTEGER NOT NULL DEFAULT 0,
  creado_en      TEXT NOT NULL DEFAULT (datetime('now'))
);
