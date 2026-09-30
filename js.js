
  let carrito = [];

document.querySelectorAll('.btn-comprar').forEach((boton) => {
  if (boton.closest('#form-reporte') || boton.id === 'btn-cerrar-carrito') return;

  boton.addEventListener('click', (e) => {
    const tarjeta = e.target.closest('.tarjeta-producto');
    if (!tarjeta) return;

    const titulo = tarjeta.querySelector('h3').innerText;
    const precioTexto = tarjeta.querySelector('.precio').innerText;
    const precio = parseFloat(precioTexto.replace('$', '').replace(' USD', ''));

    carrito.push({ titulo, precio });
    actualizarCarrito();
    alert(`✔ "${titulo}" agregado al carrito.`);
  });
});

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const btnCarrito = document.getElementById('btn-abrir-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  btnCarrito.innerText = `🛒 Carrito (${carrito.length})`;
  listaCarrito.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p style="color:#a496ba; text-align:center;">El carrito está vacío.</p>';
  } else {
    carrito.forEach((prod, index) => {
      total += prod.precio;
      const item = document.createElement('div');
      item.className = 'item-carrito';
      
      const info = document.createElement('div');
      info.innerHTML = `
        <div style="font-weight:bold;">${prod.titulo}</div>
        <div style="color:#bf55ec; font-size:13px;">$${prod.precio.toFixed(2)} USD</div>
      `;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'X';
      btnEliminar.addEventListener('click', () => eliminarDelCarrito(index));

      item.appendChild(info);
      item.appendChild(btnEliminar);
      listaCarrito.appendChild(item);
    });
  }

  totalCarrito.innerText = total.toFixed(2);
}

const modalCarrito = document.getElementById('modal-carrito');
document.getElementById('btn-abrir-carrito').addEventListener('click', (e) => {
  e.preventDefault();
  modalCarrito.style.display = 'flex';
});

document.getElementById('btn-cerrar-carrito').addEventListener('click', () => {
  modalCarrito.style.display = 'none';
});

document.getElementById('btn-checkout').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos de la tienda.');
    return;
  }
  alert('¡Compra procesada con éxito! Revisa tu inventario dentro del juego.');
  carrito = [];
  actualizarCarrito();
  modalCarrito.style.display = 'none';
});

const abrirIA = document.getElementById("abrirIA");
const cerrarIA = document.getElementById("cerrarIA");
const loopIA = document.getElementById("loopIA");
const iaInput = document.getElementById("iaInput");
const iaEnviar = document.getElementById("iaEnviar");
const iaMensajes = document.getElementById("iaMensajes");

abrirIA.addEventListener("click", () => {
  loopIA.style.display = "block";
  abrirIA.style.display = "none";
  iaInput.focus();
});

cerrarIA.addEventListener("click", () => {
  loopIA.style.display = "none";
  abrirIA.style.display = "block";
});

function agregarMensaje(texto, tipo) {
  const mensaje = document.createElement("div");
  mensaje.classList.add("ia-mensaje", tipo === "usuario" ? "ia-usuario" : "ia-bot");
  mensaje.textContent = texto;
  iaMensajes.appendChild(mensaje);
  iaMensajes.scrollTop = iaMensajes.scrollHeight;
}

function responderIA(pregunta) {
  const texto = pregunta.toLowerCase();
  if (texto.includes("hola") || texto.includes("buenas")) return "👁️ Hola, jugador. Bienvenido al bucle. ¿Qué deseas consultar?";
  if (texto.includes("precio") || texto.includes("cuesta")) return "💰 Revisa la sección Tienda para ver los precios actualizados.";
  if (texto.includes("comprar") || texto.includes("carrito")) return "🛒 Agrega un ítem desde la tienda y pulsa en el botón superior de Carrito para completar la transacción.";
  return "👁️ Esa información sigue bajo sombras...";
}

function enviarMensaje() {
  const pregunta = iaInput.value.trim();
  if (pregunta === "") return;

  agregarMensaje(pregunta, "usuario");
  iaInput.value = "";

  setTimeout(() => {
    agregarMensaje(responderIA(pregunta), "bot");
  }, 500);
}

iaEnviar.addEventListener("click", enviarMensaje);
iaInput.addEventListener("keydown", (e) => { if (e.key === "Enter") enviarMensaje(); });

document.addEventListener('DOMContentLoaded', () => {
  const tarjetas = Array.from(document.querySelectorAll('.coverflow-track .tarjeta-producto'));
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (tarjetas.length === 0) return;

  let currentIndex = Math.floor(tarjetas.length / 2);

  function actualizarCoverflow() {
    tarjetas.forEach((tarjeta, index) => {
      const offset = index - currentIndex;
      const absOffset = Math.abs(offset);

      if (offset === 0) {
        tarjeta.style.transform = `translate(-50%, -50%) translateX(0px) translateZ(160px) rotateY(0deg)`;
        tarjeta.style.opacity = '1';
        tarjeta.style.zIndex = '100';
        tarjeta.style.filter = 'blur(0px) brightness(1)';
        tarjeta.style.pointerEvents = 'auto';
      } else if (offset < 0) {
        const translateX = offset * 110 - 60;
        const translateZ = -absOffset * 100;
        const rotateY = 35;

        tarjeta.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        tarjeta.style.opacity = Math.max(0.2, 1 - absOffset * 0.25).toString();
        tarjeta.style.zIndex = (100 - absOffset).toString();
        tarjeta.style.filter = `blur(${absOffset * 1.5}px) brightness(${1 - absOffset * 0.2})`;
        tarjeta.style.pointerEvents = 'auto';
      } else {
        const translateX = offset * 110 + 60;
        const translateZ = -absOffset * 100;
        const rotateY = -35;

        tarjeta.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        tarjeta.style.opacity = Math.max(0.2, 1 - absOffset * 0.25).toString();
        tarjeta.style.zIndex = (100 - absOffset).toString();
        tarjeta.style.filter = `blur(${absOffset * 1.5}px) brightness(${1 - absOffset * 0.2})`;
        tarjeta.style.pointerEvents = 'auto';
      }
    });
  }

  btnNext.addEventListener('click', () => {
    if (currentIndex < tarjetas.length - 1) {
      currentIndex++;
      actualizarCoverflow();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      actualizarCoverflow();
    }
  });

  tarjetas.forEach((tarjeta, index) => {
    tarjeta.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-comprar')) return;
      if (currentIndex !== index) {
        currentIndex = index;
        actualizarCoverflow();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      actualizarCoverflow();
    } else if (e.key === 'ArrowRight' && currentIndex < tarjetas.length - 1) {
      currentIndex++;
      actualizarCoverflow();
    }
  });

  actualizarCoverflow();
});
// 🛒 SISTEMA DE AGREGADO CON ATRIBUTOS DIRECTOS (INFALIBLE)
document.body.addEventListener('click', (e) => {
  const boton = e.target;
  
  // Filtro de seguridad para el botón de compra
  if (!boton.classList.contains('btn-comprar')) return;
  if (boton.closest('#form-reporte') || boton.id === 'btn-cerrar-carrito') return;

  e.stopPropagation(); // Evita que se congele el movimiento por error

  let titulo = "";
  let precio = 0;

  // 1. Verificamos primero si el botón ya tiene los datos incrustados directamente
  if (boton.hasAttribute('data-title')) {
    titulo = boton.getAttribute('data-title');
    precio = parseFloat(boton.getAttribute('data-price')) || 0;
  } 
  // 2. Si no los tiene (por si acaso es del Coverflow antiguo), usamos el plan de respaldo original
  else {
    const tarjetaVieja = boton.closest('.tarjeta-producto');
    if (!tarjetaVieja) return;

    const elementoTitulo = tarjetaVieja.querySelector('h3');
    titulo = elementoTitulo ? elementoTitulo.innerText : 'Producto';

    const elementoPrecio = tarjetaVieja.querySelector('.precio');
    if (elementoPrecio) {
      const precioTexto = elementoPrecio.innerText;
      precio = parseFloat(precioTexto.replace('$', '').replace(' USD', '')) || 0;
    }
  }

  // Ejecución limpia e idéntica a tus otros productos
  carrito.push({ titulo, precio });
  actualizarCarrito();
  alert(`✔ "${titulo}" agregado al carrito.`);
});

