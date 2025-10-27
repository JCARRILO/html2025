# Curso HTML 2025 — Página Única (SPA)

Este repositorio fue unificado en una sola página HTML para evitar duplicación de HTML/CSS/JS y simplificar el mantenimiento.

## Estructura

- `index.html` — Página única con todas las clases (1–12) como secciones `#clase-N`.
- `CSS/`
  - `common.css` — Base, layout, header/footer modulares, utilidades comunes.
  - `app.css` — Estilos de la SPA: TOC (índice lateral), cards, demos (galería, formularios, tablas), utilidades.
  - `aside-scrollspy.js` — Módulo de scrollspy para resaltar el índice lateral/aside.
- `JS/`
  - `app.js` — Scrollspy del TOC principal y utilidades de la SPA.
- `assets/`
  - `images/` — Imágenes reutilizadas por las demos.
  - `docs/` — Documentos auxiliares (por ejemplo `CV.html`).

## Componentes modulares

- Header y Footer (`header.site`, `footer.site`) con gradientes azules y contenido centrado mediante `.wrap`.
- Índice lateral (TOC) con puntos de color y scrollspy para marcar la sección activa.
- Secciones `lesson` con `card` reusables y utilidades (`.grid`, `.responsive`, `.table-wrap`).

## Navegación

- Usa el TOC para saltar a `#clase-1` … `#clase-12`.
- Scroll suave activo; el TOC marca la sección visible.

## Añadir contenido o nuevas secciones

1. En `index.html`, agrega un bloque `<section id="clase-N" class="lesson">` con su contenido.
2. Si necesitas estilos específicos, intenta reutilizar utilidades de `CSS/app.css`. Evita crear archivos CSS por clase.
3. Si agregas imágenes nuevas, colócalas en `assets/images/` y referencia rutas relativas desde `index.html`.

## Imprimible / CV

- CV standalone en `assets/docs/CV.html`. Opcional: enlazar desde `index.html` (Clase 12) como “Descargar CV”.

## Convenciones

- Un solo `h1` global en la página; el resto de secciones usan `h2`/`h3`.
- Accesibilidad: incluye `aria-label/aria-labelledby`, texto alternativo en imágenes (`alt`) y estructura semántica.

## Historia de cambios (resumen)

- v1.0.0 — Unificación a SPA: migración de clases 1–12 a `index.html`, centralización de assets y eliminación de páginas antiguas.
- v1.1.0 - Mobile-first + TOC en sección final, scrollspy mejorado, portada responsive, avatar flotante y bloque CSS (1–8)
  - Layout mobile-first: `main.wrap` en 1 columna por defecto; gradiente de header continuo.
  - Índice final con generación dinámica, scroll suave y estado “Clase actual”.
  - Portada adaptativa (img en móvil, hero en desktop) y botón avatar hacia `#indice`.
  - Clases CSS añadidas y ordenadas: CSS 1–7 + CSS 8 (unidades) con demos y hero 100vw/100vh.
  - Colores de secciones y puntos del TOC por número; mejoras de accesibilidad.