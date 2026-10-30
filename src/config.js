'use strict';
// Configuración: se lee del archivo .env (ver .env.example)
try { process.loadEnvFile(); } catch (_) { /* sin .env: usa variables del sistema */ }

const path = require('node:path');
const raiz = path.join(__dirname, '..');

module.exports = {
  PUERTO: +(process.env.PORT || 3000),
  CORREO_DESTINO: process.env.MAIL_TO || 'ggarciao702@inemkennedy.edu.co',
  SMTP: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: +(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || 'true') === 'true',
    usuario: process.env.SMTP_USER || '',
    clave: process.env.SMTP_PASS || '',
  },
  CLAVE_ADMIN: process.env.ADMIN_PASSWORD || '',
  ARCHIVO_DB: path.join(raiz, process.env.DB_FILE || 'loop.db'),
  ESQUEMA_SQL: path.join(raiz, 'db', 'schema.sql'),
  CARPETA_PUBLICA: path.join(raiz, 'public'),
  MINUTOS_REINTENTO: 5,
};
