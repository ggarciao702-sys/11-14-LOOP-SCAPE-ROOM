# Tarea de mejora pedagógica — LOOP: Escape Room y Laberinto

Esta guía convierte la revisión actual en un recorrido de trabajo. Avancen en orden: primero hagan que la maqueta sea confiable y demostrable; después decidan el alcance del juego; por último construyan el prototipo mínimo. No intenten resolver tienda, pagos, inteligencia artificial real o un juego completo antes de validar la experiencia principal.

## Estado de partida

- El repositorio contiene una propuesta, documentación y una maqueta web con `index.html`, `style.css` y `script.js`.
- La revisión encontró rutas de assets rotas por diferencias de capitalización y nombres. Por ejemplo, el HTML usa `IMG/Video...`, mientras la carpeta real es `img/`; también usa nombres con mayúscula inicial que no coinciden con los archivos existentes en minúscula.
- La carpeta `gafas/` contiene experimentos A-Frame/360, pero tiene referencias a imágenes, audio e identificadores que no existen o no están conectados de forma completa. No debe presentarse todavía como el juego principal.
- No hay pruebas automatizadas ni una sección clara de ejecución y despliegue en `README.md`.
- Hay placeholders, enlaces `#` y comportamientos simulados. El formulario apunta a Formspree y el botón de checkout solo muestra una alerta; no son un sistema real de pagos.
- El tamaño de los archivos rastreados es aproximadamente **33,8 MB**; el directorio de trabajo puede ser mayor por archivos locales no rastreados, como `.codegraph/` y `seguimiento.md`.
- El proyecto debe distinguir dos productos: el **juego** (propuesto en Unreal Engine o una alternativa web) y la **web** (landing o maqueta de presentación). La web no reemplaza al juego.

> **Regla de cuidado:** antes de comenzar, no borren ni sobrescriban archivos no rastreados existentes. En particular, conserven `.codegraph/` y `seguimiento.md` tal como estén en su computador.

## Ruta rápida

1. Confirmar el estado local y hacer una copia de trabajo.
2. Reparar y documentar los recursos de la maqueta web.
3. Reemplazar placeholders y aclarar qué funciones son simuladas.
4. Agregar pruebas manuales y una prueba automatizada pequeña.
5. Documentar ejecución, despliegue y tamaño de assets.
6. Investigar el hardware y decidir entre Unreal Engine, Unreal reducido o alternativa web.
7. Construir y demostrar un prototipo mínimo jugable.

---

## Nivel 1 — Preparar el trabajo con seguridad

### Objetivo
Trabajar sobre una copia controlada sin perder avances locales ni confundir archivos de apoyo con trabajo propio.

### Pasos

1. Abran una terminal en la raíz del repositorio.
2. Revisen el estado y la rama actual.
3. Anoten qué archivos ya estaban modificados o no rastreados. No los eliminen.
4. Creen una rama de trabajo propia, si la profesora lo solicita.

### Evidencia de terminado

- Captura o registro de `git status --short --branch` antes de modificar.
- Lista de archivos nuevos o locales preservados.
- Un commit propio por cada avance importante, sin mezclar cambios de apoyo docente.

### Comandos seguros

```bash
git status --short --branch
git log -5 --oneline
git switch -c mejora-loop
```

Si la rama ya existe, no ejecuten el último comando; continúen trabajando en la rama acordada.

---

## Nivel 2 — Hacer que la maqueta web cargue sus recursos

### Objetivo
Conseguir que la página principal abra sin imágenes, video ni estilos faltantes.

### Pasos

1. Comparen cada ruta de `index.html` con el nombre exacto que aparece dentro de `img/`. En sistemas Linux, `img/` e `IMG/` son carpetas diferentes.
2. Elijan una convención sencilla para los assets: nombres cortos, sin espacios, sin tildes y en minúsculas, por ejemplo `img/nivel-1.png`.
3. Renombren o actualicen las referencias de manera consistente. No dupliquen archivos solo para ocultar una ruta incorrecta.
4. Revisen también los archivos dentro de `gafas/`, pero manténganlos separados de la página principal hasta comprobarlos.
5. Abran la consola del navegador y corrijan todos los errores `404` antes de continuar.

### Evidencia de terminado

- La página principal carga `style.css`, todas las imágenes visibles y el video elegido.
- La consola de red no muestra recursos locales con respuesta `404`.
- La lista de rutas corregidas queda anotada en el README o en una tabla de revisión.

### Comandos seguros

```bash
python3 -m http.server 8000
```

Después visiten `http://localhost:8000/` y detengan el servidor con `Ctrl+C`. El servidor local es preferible a abrir el HTML con doble clic porque permite detectar mejor las rutas.

---

## Nivel 3 — Quitar la apariencia de producto terminado

### Objetivo
Diferenciar lo implementado de lo que todavía es una demostración visual.

### Pasos

1. Identifiquen placeholders y elementos repetidos: tarjetas duplicadas, imágenes de prueba, enlaces `#`, textos genéricos y secciones sin contenido final.
2. Para cada elemento, elijan una acción: completarlo, ocultarlo temporalmente o marcarlo como “Próximamente”.
3. Revisen el carrito: debe quedar claro que actualmente solo calcula y simula una compra en el navegador.
4. Revisen la “IA”: expliquen que las respuestas actuales son reglas locales de palabras clave, no una conexión a un modelo de inteligencia artificial.
5. Revisen el formulario Formspree. Confirmen que el endpoint pertenece al equipo, que no se envían datos sensibles y que existe un mensaje de éxito o error comprensible.
6. No prometan pagos, cuentas, descargas ni autenticación si todavía no existe un backend que los implemente.

### Evidencia de terminado

- Cada placeholder tiene contenido real o una etiqueta visible de estado.
- El README incluye una tabla “Implementado / Simulado / Pendiente”.
- Una prueba del formulario documenta si llegó el mensaje a Formspree, sin publicar datos personales.
- La interfaz no presenta el checkout simulado como una compra real.

---

## Nivel 4 — Agregar pruebas reproducibles

### Objetivo
Demostrar con evidencia que las funciones principales no se rompen al hacer cambios.

### Pasos

1. Escriban una lista de pruebas manuales: navegación, cambio de idioma, cambio de moneda, agregar y eliminar productos, carrito vacío, formulario y visualización móvil.
2. Para cada prueba registren: precondición, pasos, resultado esperado, resultado real y fecha.
3. Agreguen al menos una validación automatizada sencilla. Puede comprobar que `index.html` referencia archivos existentes o que `script.js` pasa una comprobación de sintaxis.
4. Repitan las pruebas después de corregir los assets.
5. Guarden la evidencia en una sección del README o en un archivo de pruebas, sin incluir contraseñas, correos reales ni tokens.

### Evidencia de terminado

- Existe una tabla de pruebas con resultado “Aprobada” o “Falló” y observaciones.
- La prueba automatizada se puede ejecutar desde un comando documentado.
- Hay al menos una captura o video corto de una función funcionando.

### Comandos seguros

```bash
node --check script.js
python3 -m http.server 8000
git diff --check
```

`git diff --check` revisa problemas de espacios en los cambios y no modifica archivos.

---

## Nivel 5 — Documentar ejecución, despliegue y peso

### Objetivo
Permitir que otra persona ejecute, revise y publique la maqueta sin depender de explicaciones orales.

### Pasos

1. Completen `README.md` con requisitos, estructura de carpetas, comando de ejecución local, controles y funciones disponibles.
2. Indiquen la URL oficial de entrega cuando esté definida.
3. Expliquen un despliegue estático, por ejemplo GitHub Pages o Netlify, sin subir secretos.
4. Antes de desplegar, prueben la versión publicada desde una ventana privada y en un teléfono o viewport pequeño.
5. Midan el tamaño de los assets. Las imágenes actuales son pesadas y el repositorio rastreado ronda 33,8 MB; conviertan imágenes a WebP/AVIF cuando sea posible, reduzcan resoluciones y eviten cargar videos grandes en la primera pantalla.
6. Comparen el tamaño antes y después y registren qué se optimizó.

### Evidencia de terminado

- Una compañera puede ejecutar la web siguiendo únicamente el README.
- Existe una URL publicada o una explicación explícita de por qué aún no se publica.
- El README registra peso inicial, peso final y principales archivos optimizados.
- No se subieron claves, credenciales ni información personal.

### Comandos seguros

```bash
du -sh .
git ls-files -z | xargs -0 du -ch | tail -n 1
```

El segundo comando estima el tamaño de los archivos rastreados. Si `tail` no está disponible, usen una herramienta equivalente del sistema; no borren archivos para reducir el número.

---

## Nivel 6 — Investigar hardware y decidir el alcance

### Objetivo
Tomar una decisión técnica basada en evidencia, no en suposiciones, antes de comprometerse con Unreal Engine.

### Pasos

1. Completen una fila por integrante en `INVESTIGACION_HARDWARE_UNREAL.md`: sistema operativo, procesador, RAM, GPU, VRAM, DirectX 12, espacio libre y resultado de la prueba.
2. No publiquen números de serie, claves ni información personal.
3. Consulten la documentación oficial de requisitos de Unreal Engine 5.
4. Solo si ambos computadores lo permiten, prueben un proyecto vacío First Person con Blueprints.
5. Registren si ambas pueden abrirlo, ejecutarlo y navegar una sala simple.
6. Marquen una sola decisión: Unreal Engine, Unreal con alcance reducido o alternativa web A-Frame/HTML/JavaScript.
7. Justifiquen la decisión relacionando hardware, tiempo disponible y objetivo pedagógico.

### Evidencia de terminado

- Tabla completa con evidencia no sensible.
- Captura del proyecto vacío ejecutándose, si eligieron probar Unreal.
- Decisión marcada y justificada.
- Explicación de qué funciones quedan fuera del primer prototipo.

---

## Nivel 7 — Construir el prototipo mínimo jugable

### Objetivo
Validar la idea central de LOOP con una experiencia pequeña, terminable y demostrable.

### Pasos

1. Definan una sola sala o tramo de laberinto.
2. Implementen movimiento en primera persona o navegación equivalente si escogieron la alternativa web.
3. Añadan un objeto interactivo claramente identificable.
4. Diseñen un acertijo sencillo: por ejemplo, encontrar una pista y usarla para activar un interruptor.
5. Programen una condición de salida verificable. La jugadora no debe poder “ganar” sin resolver el acertijo.
6. Añadan mensajes de ayuda, reinicio y una indicación de finalización.
7. Prueben el recorrido con ambas integrantes y con una persona que no conozca la solución.
8. Graben un video corto o tomen capturas del recorrido completo.
9. Conecten la web únicamente como presentación: descripción, imágenes, video y enlace al prototipo o descarga cuando exista.

### Evidencia de terminado

- Una persona externa puede iniciar, entender el objetivo, interactuar, resolver el acertijo y llegar a la salida.
- El README explica cómo ejecutar el prototipo y sus controles.
- Hay video o capturas del flujo completo.
- La tabla de pruebas incluye al menos un caso exitoso, un intento incorrecto y un reinicio.
- Cada integrante puede explicar qué construyó y qué decisión técnica tomó.

## Fuera del alcance de esta primera entrega

No prioricen todavía pagos reales, cuentas de usuario, autenticación, backend completo, tienda funcional, IA conectada, múltiples niveles, efectos gráficos pesados ni un lanzamiento comercial. Estas funciones podrán planearse después de demostrar el prototipo mínimo.

## Lista final de entrega

- [ ] Rutas y capitalización de assets verificadas.
- [ ] Referencias VR/A-Frame inexistentes corregidas, aisladas o documentadas como experimento.
- [ ] Placeholders, enlaces vacíos y funciones simuladas identificados.
- [ ] Formulario Formspree probado y explicado.
- [ ] Pruebas manuales y automatizadas documentadas.
- [ ] Instrucciones de ejecución y despliegue actualizadas.
- [ ] Peso de assets medido y plan de optimización aplicado.
- [ ] Decisión de motor y alcance justificada con investigación de hardware.
- [ ] Prototipo mínimo jugable demostrado.
- [ ] Archivos locales no rastreados preservados.
