# SPEC.md - Especificaciones Técnicas (Technical Specifications)

## 1. Arquitectura del Sistema
* **Motor de Juego:** Unreal Engine .
* **Perspectiva:** Primera persona (FPS Controller / 3D).
* **Plataforma Objetivo:** PC (Windows / Linux).

---

## 2. Controles e Interacción
* **Entrada de usuario (Input):**
  * Movimiento: Teclas `W`, `A`, `S`, `D` / Flechas direccionales.
  * Mirada / Dirección: Eje del Ratón (Mouse Pitch/Yaw).
  * Interacción con Objetos: Tecla `E` o Clic Izquierdo.
  * Agacharse / Correr (Opcional): Teclas `Ctrl` / `Shift`.
  * Menú de Pausa: Tecla `Esc`.

---

## 3. Especificaciones de Juego (Core Gameplay Logic)

### A. Sistema de Bucle y Persistencia
*  El mapa utiliza desencadenadores (Triggers) en zonas de transición. Al cruzar un umbral, las condiciones del mapa cambian de acuerdo al progreso del jugador.
*  Un administrador global (`GameManager`) registra el estado de los interruptores, combinaciones e inventario temporal.

### B. Interacción y Puzles
*  Un rayo desde la cámara (longitud máx. 2.5m) detecta objetos interactuables mediante la capa (Layer) `Interactable`.
*  Retícula central dinámica que cambia de forma/color al apuntar a un objeto interactivo.

---

## 4. Rendimiento y Optimización

### A. Optimización de Contenido de Terror y Multimedia
* Tráilers y Videos de Niveles: . Alojar los videos promocionales en plataformas optimizadas como Vimeo , e incrustarlos con carga diferida (`iframe con loading="lazy`).
* El arte conceptual y las capturas de pantalla de los mapas deben convertirse al formato moderno WebP o AVIF. Ninguna imagen de la galería debe superar los 150 KB.
Estética Oscura: Dado que el juego es de terror, usar fondos de color sólido oscuros (`#000000, #111111`) mediante CSS en lugar de cargar texturas de imagen pesadas para el fondo de la página.

### B. Optimización del Flujo de Venta y Compra en Equipo
* Si se integran pasarelas de pago o sistemas de autenticación para los equipos, estos scripts deben cargarse de forma asíncrona (`<script async>`) para que no bloqueen el diseño de la página.
* Los archivos instalables del juego (ejecutables de computadora) deben alojarse en un
almacenamiento externo especializado (como AWS S3, Google Cloud Storage o itch.io) y enlazarse externamente para no saturar el ancho de banda de Netlify.

### C. Configuración en la Plataforma Netlify
* Compresión de Activos: Habilitar la optimización de código automática en el panel de control de Netlify (Minificación de archivos HTML, CSS y JS).
* Archivos de Configuración (`_headers`): Configurar políticas de almacenamiento en caché agresivas para los recursos estáticos del juego (logotipos, fuentes personalizadas y sonidos de ambientación web).

---

## 5. Objetivos de Rendimiento (KPIs)

| Métrica | Meta para Escritorio (PC) | Impacto en el Negocio |
| :--- | :--- | :--- |
| **Tiempo de Carga Total** | < 1.5 segundos | Mayor conversión de venta de niveles. |
| **Puntuación PageSpeed** | > 95 / 100 | Mejor posicionamiento en Google (SEO). |
| **Peso Total de la Página** | < 2.0 MB (Inicial) | Navegación instantánea para los jugadores. |

---

## 6. Flujo de Trabajo para Lanzar Nuevos Niveles
1.  Exportación de Arte: Diseñar las portadas del nuevo nivel de investigación en alta calidad, pero comprimirlas antes de subirlas.
2.  Minificación: Asegurar que el código fuente no contenga funciones de desarrollo o pruebas.
3.  Despliegue de Actualización: Subir los cambios a Netlify mediante la terminal o arrastrando la carpeta de producción.
4.  Verificación de Enlaces: Probar que el botón de descarga para computadoras funcione correctamente y no ralentice la experiencia de navegación.
