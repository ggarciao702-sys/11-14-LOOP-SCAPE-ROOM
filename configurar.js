'use strict';

// Creates the local .env once. It never overwrites an existing file or invents credentials.
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const archivoEnv = path.join(__dirname, '.env');

function preguntar(rl, texto, valorPorDefecto = '') {
  if (!rl) return Promise.resolve(valorPorDefecto);
  const sufijo = valorPorDefecto ? ` [${valorPorDefecto}]` : '';
  return new Promise((resolve) => rl.question(`${texto}${sufijo}: `, (respuesta) => {
    resolve(respuesta.trim() || valorPorDefecto);
  }));
}

function lineaEnv(nombre, valor) {
  return `${nombre}=${JSON.stringify(valor)}\n`;
}

async function main() {
  if (fs.existsSync(archivoEnv)) {
    console.log('Ya existe .env; no se modificó. Si necesitas cambiarlo, edítalo manualmente.');
    return;
  }

  const rl = process.stdin.isTTY && process.stdout.isTTY
    ? readline.createInterface({ input: process.stdin, output: process.stdout })
    : null;
  try {
    console.log('\nConfiguración local de LOOP (Enter conserva el valor indicado).');
    console.log('Las credenciales de correo y la contraseña del panel son opcionales para probar la tienda.');

    const puerto = await preguntar(rl, 'Puerto', '3000');
    const correoDestino = await preguntar(rl, 'Correo que recibirá los avisos', 'ggarciao702@inemkennedy.edu.co');
    const smtpUsuario = await preguntar(rl, 'Usuario SMTP (opcional)');
    const smtpClave = await preguntar(rl, 'Contraseña SMTP o de aplicación (opcional)');
    const claveAdmin = await preguntar(rl, 'Contraseña del panel (opcional; no se genera automáticamente)');

    const contenido = [
      '# Configuración local de LOOP. No compartas este archivo.',
      lineaEnv('PORT', puerto),
      lineaEnv('MAIL_TO', correoDestino),
      lineaEnv('SMTP_HOST', 'smtp.gmail.com'),
      lineaEnv('SMTP_PORT', '465'),
      lineaEnv('SMTP_SECURE', 'true'),
      lineaEnv('SMTP_USER', smtpUsuario),
      lineaEnv('SMTP_PASS', smtpClave),
      lineaEnv('DB_FILE', 'loop.db'),
      lineaEnv('ADMIN_PASSWORD', claveAdmin),
    ].join('');

    try {
      fs.writeFileSync(archivoEnv, contenido, { encoding: 'utf8', flag: 'wx', mode: 0o600 });
    } catch (error) {
      if (error.code === 'EEXIST') {
        console.log('Otra ejecución creó .env primero; no se modificó el archivo existente.');
        return;
      }
      throw error;
    }

    console.log('\n.env creado correctamente.');
    if (!smtpUsuario || !smtpClave) console.log('Avisos por correo: pendientes hasta configurar SMTP_USER y SMTP_PASS.');
    if (!claveAdmin) console.log('Panel de datos: desactivado hasta configurar ADMIN_PASSWORD.');
    console.log('Siguiente paso: npm start');
  } finally {
    if (rl) rl.close();
  }
}

main().catch((error) => {
  console.error(`No se pudo crear .env: ${error.message}`);
  process.exitCode = 1;
});
