# LOOP — Escape Room y tienda web

Proyecto escolar de una experiencia de escape room y laberinto acompañada de una tienda web. La tienda está construida con HTML, CSS y JavaScript, y utiliza un servidor Node.js con SQLite para guardar productos, clientes, pedidos y mensajes de contacto.

## Inicio rápido

### Requisitos

- Node.js **22.13 o superior**: <https://nodejs.org>
- Una terminal ubicada en la carpeta del proyecto.

Comprueba la versión instalada:

```bash
node --version
```

Debe aparecer `v22.13.0` o una versión superior.

### 1. Instalar las dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

### 2. Crear la configuración local

Ejecuta:

```bash
npm run configurar
```

Responde las preguntas del asistente. Se creará un archivo `.env` local.

Para una prueba escolar no es necesario configurar el correo. Puedes dejar vacíos los datos SMTP. Sí conviene definir una contraseña para el panel administrativo.

> El archivo `.env` contiene configuración privada. No lo compartas ni lo subas a GitHub.

### 3. Iniciar el proyecto

```bash
npm start
```

Cuando aparezca el mensaje de que LOOP está listo, abre en el navegador:

<http://localhost:3000>

Mantén la terminal abierta mientras uses la tienda. Para detener el servidor, presiona `Ctrl + C`.

### Inicio con scripts

- **Windows:** haz doble clic en `INICIAR.bat`.
- **Linux o macOS:** ejecuta `./iniciar.sh`.

Estos scripts instalan las dependencias y ayudan a crear `.env` cuando todavía no existe.

## Probar la base de datos

1. Abre la tienda en <http://localhost:3000>.
2. Realiza un pedido de prueba o envía un mensaje desde Soporte.
3. El servidor guardará los datos en el archivo local `loop.db`.
4. Abre <http://localhost:3000/admin.html>.
5. Inicia sesión con la contraseña configurada en `ADMIN_PASSWORD`.
6. Revisa las pestañas **Pedidos**, **Clientes**, **Mensajes** y **Productos**.

La base de datos se crea automáticamente cuando inicia el servidor. El esquema está en `db/schema.sql` y los productos iniciales se cargan una sola vez, sin duplicarse.

## Cómo funciona

```text
Navegador
   ↓
Frontend HTML/CSS/JavaScript
   ↓
API del servidor Node.js
   ↓
Validación de datos
   ↓
Base de datos SQLite
```

SQLite es la fuente oficial de los productos y sus precios. El servidor calcula el total del pedido; por eso no se confía en un precio enviado desde el navegador.

## Estructura principal

```text
├── server.js              Servidor Node.js
├── configurar.js          Asistente para crear .env
├── package.json            Comandos y dependencias
├── db/
│   └── schema.sql          Tablas y productos iniciales
├── src/
│   ├── config.js           Configuración del entorno
│   ├── db.js               Conexión y operaciones SQLite
│   ├── rutas.js            Rutas de la API
│   ├── validacion.js       Validación de pedidos y mensajes
│   ├── admin.js             Login y datos administrativos
│   ├── correo.js            Avisos por correo
│   └── estatico.js          Archivos públicos
└── public/
    ├── index.html           Tienda principal
    ├── admin.html           Panel administrativo
    ├── css/                 Estilos
    ├── js/                  Código de la tienda
    ├── img/                 Imágenes
    └── media/               Videos
```

## Comandos importantes

| Comando | Función |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run configurar` | Crea `.env` sin sobrescribirlo |
| `npm start` | Inicia el servidor local |

## Problemas comunes

### La página no guarda pedidos

No abras `index.html` haciendo doble clic. Debes iniciar el servidor con `npm start` y entrar por `http://localhost:3000`.

### El puerto 3000 está ocupado

Cierra otra ventana donde esté ejecutándose LOOP o cambia `PORT` en `.env`.

### El panel no permite iniciar sesión

Revisa que `ADMIN_PASSWORD` tenga un valor en `.env` y reinicia el servidor.

### No llegan correos

El correo es opcional para las pruebas locales. Los pedidos permanecen guardados en SQLite aunque SMTP no esté configurado.

## Integrantes

- Sara Estefany Montaño Echeverry
- Gabriela García Osuna

## Alcance actual

El proyecto integra una tienda web, un catálogo almacenado en SQLite, pedidos, clientes, mensajes de contacto y un panel administrativo local. El pago es demostrativo: no se almacenan datos de tarjetas ni se realiza un cobro real.
