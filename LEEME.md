# LOOP Tienda · base de datos + avisos por correo

La tienda necesita este pequeño servidor para guardar los datos y mandarte el correo.
(No funciona abriendo `index.html` con doble clic ni en GitHub Pages: tiene que correr el servidor.)

## Ponerlo a funcionar (Node.js >= 22.13)

1. Instala Node.js **22.13 o superior** (preferiblemente la versión LTS): https://nodejs.org
2. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   npm run configurar
   ```
3. Responde las preguntas del asistente. Se creará `.env` solo si todavía no existe; nunca se
   sobrescribe ni se generan credenciales automáticamente. SMTP y `ADMIN_PASSWORD` pueden quedar
   vacíos para una prueba local: los avisos quedarán pendientes y el panel se desactivará.
4. Levanta el servidor:
   ```bash
   npm start
   ```
5. Abre **http://localhost:3000** y deja la terminal abierta mientras uses la tienda.

En Windows también puedes hacer doble clic en `INICIAR.bat`. En Mac/Linux puedes usar `./iniciar.sh`.
Esos scripts instalan dependencias y ejecutan el mismo asistente si `.env` no existe.

> Importante: abre siempre la tienda desde **http://localhost:3000**. Si abres `index.html` con doble
> clic, la página se ve pero no puede guardar pedidos ni mostrar la base de datos (necesita el servidor).

Para cambiar la configuración, detén el servidor y edita `.env` manualmente. No lo compartas ni lo
subas a Git; para volver a ejecutar el asistente, primero haz una copia y elimina `.env` de forma
intencional.

## Cómo está organizado
```
loop-tienda/
├─ INICIAR.bat          Arranque con doble clic (Windows)  ·  iniciar.sh (Mac/Linux)
├─ configurar.js        Asistente seguro que crea el .env la primera vez
├─ server.js            Servidor
├─ .env.example         Plantilla de configuración (cópiala a .env)
├─ db/
│  └─ schema.sql        Tablas de la base de datos (productos, clientes, pedidos, pedido_items, mensajes_contacto)
├─ src/                 Código del servidor, un archivo por tarea
│  ├─ config.js         Lee el .env
│  ├─ db.js             Guarda y consulta en SQLite
│  ├─ validacion.js     Revisa los datos que llegan de la página
│  ├─ correo.js         Envía los avisos a tu correo (y reintenta si fallan)
│  ├─ rutas.js          API: /api/pedidos y /api/contacto
│  ├─ admin.js          Contraseña y datos del panel (/api/admin/*)
│  ├─ http.js           Utilidades compartidas de las rutas
│  └─ estatico.js       Entrega la página, imágenes y videos
└─ public/              La página web
   ├─ index.html        Solo la estructura (ya no lleva imágenes ni código dentro)
   ├─ admin.html        Panel administrativo para consultar los datos de SQLite
   ├─ css/estilos.css   Estilos de la tienda
   ├─ css/admin.css     Estilos del panel
   ├─ js/               El código de la página, en el orden en que se carga
   │  ├─ 01-imagenes.js   rutas de las imágenes
   │  ├─ 02-textos.js     textos en español / inglés / portugués
   │  ├─ 03-datos.js      países y pagos, personajes, niveles, vestuarios, mascotas, banners (respaldo visual)
   │  ├─ 04-utilidades.js idioma, país, formato de precios
   │  ├─ 05-tienda.js     carrito y tarjetas de productos
   │  ├─ 06-pago.js       pago, guardado del pedido, recibo y formulario de contacto
   │  ├─ 07-interfaz.js   ventanas, efecto 3D, flechas
   │  ├─ 08-banners.js    carrusel
   │  ├─ 09-asistente.js  chat de ayuda
   │  ├─ 10-video.js      video principal
   │  └─ 11-inicio.js     arranque
   ├─ img/              Imágenes (personajes, niveles, vestuarios, mascotas, banners, logo)
   └─ media/            Videos
```
Las imágenes y textos visuales siguen en `public/js/03-datos.js`. Al abrir la tienda, `GET /api/productos` reemplaza los nombres, precios y disponibilidad visibles con los productos activos de SQLite. Si el servidor no responde se muestra un catálogo local de respaldo, claramente marcado; no es la fuente oficial. SQLite es la autoridad de precios al crear pedidos.

## Panel de datos
El backend ya expone los datos administrativos mediante `/api/admin/*`. Con el servidor encendido,
abre **http://localhost:3000/admin.html** e inicia sesión con el valor de `ADMIN_PASSWORD` configurado
en `.env`. El panel muestra métricas, pedidos, clientes y mensajes guardados en SQLite; también permite
cerrar sesión y descargar la tabla visible en CSV. También incluye una pestaña de solo lectura para el catálogo.
- Tiene **contraseña** (`ADMIN_PASSWORD` en `.env`) porque ahí hay cédulas, teléfonos y correos reales:
  nunca la dejes vacía ni la compartas. Sin contraseña configurada, el panel queda desactivado.
- Tras 6 intentos fallidos seguidos desde una misma conexión, espera 10 minutos. La sesión dura 8 horas.
- Si lo publicas en internet, usa siempre HTTPS (Render, Railway y similares ya lo traen).

## Cómo integra SQLite y qué se guarda
- Pedidos (cliente, productos, total, método de pago, estado) y mensajes de Soporte se guardan en
  `loop.db`, un archivo local administrado por SQLite. Al iniciar, `src/db.js` abre ese archivo y
  ejecuta `db/schema.sql`; las tablas se crean con `CREATE TABLE IF NOT EXISTS`, por lo que no se
  borran los datos existentes. Puedes abrir una copia con la app gratuita "DB Browser for SQLite".
- `productos`, `clientes`, `pedidos`, `pedido_items` y `mensajes_contacto` son tablas relacionadas: un
  cliente puede tener pedidos y cada pedido guarda una instantánea del identificador, nombre, precio y
  cantidad comprados. `productos` conserva el catálogo estable; sus semillas usan `INSERT OR IGNORE`, así
  que reiniciar el servidor no duplica ni borra datos. Los productos con precio pendiente quedan inactivos.
- La tienda consulta `GET /api/productos` para actualizar nombres, precios y disponibilidad, pero al crear un pedido solo envía
  identificadores y cantidades. SQLite valida que estén activos y calcula `total`/`total_usd` usando sus
  precios; cualquier precio, nombre o total manipulado en el navegador se ignora. El cálculo usa USD como
  moneda base y tasas fijas sencillas para las monedas mostradas en la tienda.
- SQLite escribe los cambios directamente en `loop.db` y usa archivos auxiliares `loop.db-wal` y
  `loop.db-shm` mientras el servidor está activo.
- Cada pedido y mensaje también te llega por correo a `MAIL_TO`. Si el envío falla, queda con
  `correo_enviado = 0` y el servidor lo reintenta solo cada 5 minutos.
- **Los datos de tarjeta (número, vencimiento, CVV) NO se guardan ni se envían.** El pago es una
  simulación: queda como `pagado_demo` (o `pendiente` si es efectivo). Para cobrar de verdad usa una
  pasarela (Wompi, PayU, Mercado Pago).

## Publicarlo en internet
Súbelo a un servicio que ejecute Node (Render, Railway, Fly.io…), configura allí las variables del
`.env` y deja `loop.db` en un disco persistente.
