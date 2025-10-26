# Curso HTML 2025 � P�gina �nica (SPA)

Este repositorio fue unificado en una sola p�gina HTML para evitar duplicaci�n de HTML/CSS/JS y simplificar el mantenimiento.

## Estructura

- `index.html` � P�gina �nica con todas las clases (1�12) como secciones `#clase-N`.
- `CSS/`
  - `common.css` � Base, layout, header/footer modulares, utilidades comunes.
  - `app.css` � Estilos de la SPA: TOC (�ndice lateral), cards, demos (galer�a, formularios, tablas), utilidades.
  - `aside-scrollspy.js` � M�dulo de scrollspy para resaltar el �ndice lateral/aside.
- `JS/`
  - `app.js` � Scrollspy del TOC principal y utilidades de la SPA.
- `assets/`
  - `images/` � Im�genes reutilizadas por las demos.
  - `docs/` � Documentos auxiliares (por ejemplo `CV.html`).

## Componentes modulares

- Header y Footer (`header.site`, `footer.site`) con gradientes azules y contenido centrado mediante `.wrap`.
- �ndice lateral (TOC) con puntos de color y scrollspy para marcar la secci�n activa.
- Secciones `lesson` con `card` reusables y utilidades (`.grid`, `.responsive`, `.table-wrap`).

## Navegaci�n

- Usa el TOC para saltar a `#clase-1` � `#clase-12`.
- Scroll suave activo; el TOC marca la secci�n visible.

## A�adir contenido o nuevas secciones

1. En `index.html`, agrega un bloque `<section id="clase-N" class="lesson">` con su contenido.
2. Si necesitas estilos espec�ficos, intenta reutilizar utilidades de `CSS/app.css`. Evita crear archivos CSS por clase.
3. Si agregas im�genes nuevas, col�calas en `assets/images/` y referencia rutas relativas desde `index.html`.

## Imprimible / CV

- CV standalone en `assets/docs/CV.html`. Opcional: enlazar desde `index.html` (Clase 12) como �Descargar CV�.

## Convenciones

- Un solo `h1` global en la p�gina; el resto de secciones usan `h2`/`h3`.
- Accesibilidad: incluye `aria-label/aria-labelledby`, texto alternativo en im�genes (`alt`) y estructura sem�ntica.

## Historia de cambios (resumen)

- v1.0.0 � Unificaci�n a SPA: migraci�n de clases 1�12 a `index.html`, centralizaci�n de assets y eliminaci�n de p�ginas antiguas.
## Verificación de codificación (UTF‑8) y mojibake

Se incluye un verificador para impedir commits con caracteres rotos o archivos sin UTF‑8:

- Script: 	ools/check-encoding.ps1
- Hook de Git: .githooks/pre-commit

Activación del hook (una sola vez):

`
git config core.hooksPath .githooks
`

Ejecución manual del chequeo:

`
powershell -NoProfile -ExecutionPolicy Bypass -File tools/check-encoding.ps1
`

El hook analiza los archivos HTML/CSS staged y falla el commit si detecta mojibake común (ej. Ã, Â, �) o si falta meta charset="utf-8" en los HTML.