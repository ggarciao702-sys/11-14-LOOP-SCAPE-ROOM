# LOOP Tienda · base de datos + avisos por correo

La tienda necesita este pequeño servidor para guardar los datos y mandarte el correo.
(No funciona abriendo `index.html` con doble clic ni en GitHub Pages: tiene que correr el servidor.)

## Ponerlo a funcionar (la forma fácil)
1. Instala Node.js (versión LTS, 22 o superior): https://nodejs.org  (solo una vez)
2. **Windows:** haz doble clic en `INICIAR.bat`.  **Mac/Linux:** en la terminal, `./iniciar.sh`
3. La primera vez te hace 3 preguntas (contraseña del panel, tu correo y el Gmail que envía los avisos)
   y crea solo el archivo `.env`. Si no escribes contraseña, te crea una segura y te la muestra: anótala.
4. Se abre el navegador en **http://localhost:3000**. Deja la ventana negra abierta mientras uses la tienda.
5. Para ver los datos: toca el **logo pequeño del inicio** (arriba de "Escapa. Resuelve."), escribe la
   contraseña y verás las tablas reales de la base de datos `loop.db`.

> Importante: abre siempre la tienda desde **http://localhost:3000**. Si abres `index.html` con doble
> clic, la página se ve pero no puede guardar pedidos ni mostrar la base de datos (necesita el servidor).

Para cambiar la contraseña o el correo: borra el archivo `.env` y abre `INICIAR.bat` otra vez.

## Cómo está organizado
```
loop-tienda/
├─ INICIAR.bat          Arranque con doble clic (Windows)  ·  iniciar.sh (Mac/Linux)
├─ configurar.js        Asistente que crea el .env la primera vez
├─ server.js            Servidor
├─ .env.example         Plantilla de configuración (cópiala a .env)
├─ db/
│  └─ schema.sql        Tablas de la base de datos (clientes, pedidos, pedido_items, mensajes_contacto)
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
   ├─ admin.html        Panel con las tablas de datos reales (pide contraseña)
   ├─ css/estilos.css   Estilos de la tienda
   ├─ css/admin.css     Estilos del panel
   ├─ js/               El código de la página, en el orden en que se carga
   │  ├─ 01-imagenes.js   rutas de las imágenes
   │  ├─ 02-textos.js     textos en español / inglés / portugués
   │  ├─ 03-datos.js      países y pagos, personajes, niveles, vestuarios, mascotas, banners (precios aquí)
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
Para cambiar un precio, un texto o una imagen, ve directo al archivo de su sección.

## Panel de datos (logo del inicio o `/admin.html`)
Muestra en tablas lo que han ingresado los usuarios: **Pedidos**, **Clientes** y **Mensajes** de soporte,
con cifras arriba, buscador y botón "Descargar CSV" (abre en Excel).
- Tiene **contraseña** (`ADMIN_PASSWORD` en `.env`) porque ahí hay cédulas, teléfonos y correos reales:
  nunca la dejes vacía ni la compartas. Sin contraseña configurada, el panel queda desactivado.
- Tras 6 intentos fallidos seguidos desde una misma conexión, espera 10 minutos. La sesión dura 8 horas.
- Si lo publicas en internet, usa siempre HTTPS (Render, Railway y similares ya lo traen).

## Qué se guarda y a dónde llega
- Pedidos (cliente, productos, total, método de pago, estado) y mensajes de Soporte se guardan en
  `loop.db` (SQLite). Puedes abrirla con la app gratuita "DB Browser for SQLite".
- Cada pedido y mensaje también te llega por correo a `MAIL_TO`. Si el envío falla, queda con
  `correo_enviado = 0` y el servidor lo reintenta solo cada 5 minutos.
- **Los datos de tarjeta (número, vencimiento, CVV) NO se guardan ni se envían.** El pago es una
  simulación: queda como `pagado_demo` (o `pendiente` si es efectivo). Para cobrar de verdad usa una
  pasarela (Wompi, PayU, Mercado Pago).

## Publicarlo en internet
Súbelo a un servicio que ejecute Node (Render, Railway, Fly.io…), configura allí las variables del
`.env` y deja `loop.db` en un disco persistente.
