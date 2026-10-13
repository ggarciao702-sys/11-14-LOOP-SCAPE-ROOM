# Tarea de mejora

## Objetivo

Dejar claro qué funciona, qué está simulado y cuál será el primer prototipo del escape room. Trabajen sin modificar otros archivos fuera de los necesarios para esta tarea.

## Estado actual

El repositorio tiene una maqueta web, documentos y una carpeta `gafas/` con experimentos. Algunas rutas de imágenes y video pueden no coincidir con los nombres reales. La web todavía mezcla partes demostrativas con funciones que parecen terminadas. Primero se debe ordenar y comprobar la maqueta; los pagos, la IA real y el juego completo quedan para después.

## 5 pasos prioritarios

1. **Corregir las rutas de imágenes y video.** Comparen cada ruta con el nombre exacto de los archivos y carpetas. Comprueben que no haya errores `404`.
2. **Revisar la carpeta `gafas/`.** Comprueben qué archivos existen y marquen como experimento lo que todavía no funcione o no esté conectado.
3. **Diferenciar la maqueta de lo simulado.** Indiquen qué está implementado, qué solo muestra una demostración y qué queda pendiente. No presenten pagos ni IA real si no existen.
4. **Agregar pruebas manuales y actualizar `README.md`.** Escriban pruebas sencillas para abrir la web, ver recursos, usar botones y revisar el celular. Documenten cómo ejecutar el proyecto.
5. **Definir el prototipo mínimo del escape room.** Planifiquen una sala, un objeto interactivo, una pista o acertijo y una salida que solo se active al resolverlo.

## Comandos mínimos seguros

```bash
git status --short --branch
python3 -m http.server 8000
node --check script.js
git diff --check
```

Detengan el servidor con `Ctrl+C`. No ejecuten comandos de borrado, commit ni push para esta tarea.

## Evidencias

- Captura de la web funcionando y sin rutas de recursos rotas.
- Lista breve de lo revisado en `gafas/`.
- Tabla o lista de: **implementado**, **simulado** y **pendiente**.
- Pruebas manuales con resultado aprobado o fallido.
- Descripción del prototipo mínimo y captura, dibujo o video cuando exista.

## Checklist final

- [ ] Imágenes y video cargan correctamente.
- [ ] La carpeta `gafas/` está revisada y descrita.
- [ ] La maqueta y las funciones simuladas están diferenciadas.
- [ ] Las pruebas y las instrucciones están en `README.md`.
- [ ] El prototipo mínimo tiene sala, interacción, acertijo y salida.
- [ ] Pagos reales, IA real y juego completo quedaron para una etapa posterior.
