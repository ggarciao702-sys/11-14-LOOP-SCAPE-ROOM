# Separación entre el juego y la web de LOOP

## Propósito

LOOP tiene dos entregables relacionados, pero con responsabilidades diferentes. Separarlos evita que la web promocional retrase la construcción del juego.

## 1. Juego: producto principal

El juego se desarrollará en **Unreal Engine**. Su objetivo es ofrecer la experiencia de escape room en primera persona.

El primer prototipo jugable debe incluir:

1. Movimiento en primera persona.
2. Una sala o tramo de laberinto.
3. Un objeto interactivo.
4. Un puzle sencillo.
5. Una condición de salida o finalización.

Este prototipo permite validar la mecánica de bucle, la interacción y el ritmo del juego antes de ampliar el contenido.

## 2. Web: presentación y distribución

La web es un producto de apoyo. No ejecuta el juego ni reemplaza su desarrollo.

Su primera versión puede incluir:

- Nombre, descripción e integrantes.
- Capturas o arte conceptual del juego.
- Video o avance, cuando exista material jugable.
- Requisitos mínimos del computador.
- Enlace de descarga o de publicación, por ejemplo en itch.io, cuando el juego esté listo para compartirse.

## Orden recomendado

1. Construir y probar el prototipo jugable.
2. Capturar imágenes o video del prototipo.
3. Crear una landing page estática con HTML, CSS y JavaScript.
4. Publicar el juego en una plataforma adecuada y enlazarlo desde la web.

## Fuera del alcance inicial

No se deben priorizar pagos, cuentas de usuario, tienda, autenticación o descargas alojadas directamente en Netlify. Esas funciones añaden complejidad y no validan la experiencia principal del juego.
