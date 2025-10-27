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
- v1.1.0 - Mobile-first + TOC en secci�n final, scrollspy mejorado, portada responsive, avatar flotante y bloque CSS (1�8)
  - Layout mobile-first: `main.wrap` en 1 columna por defecto; gradiente de header continuo.
  - �ndice final con generaci�n din�mica, scroll suave y estado �Clase actual�.
  - Portada adaptativa (img en m�vil, hero en desktop) y bot�n avatar hacia `#indice`.
  - Clases CSS a�adidas y ordenadas: CSS 1�7 + CSS 8 (unidades) con demos y hero 100vw/100vh.
  - Colores de secciones y puntos del TOC por n�mero; mejoras de accesibilidad.