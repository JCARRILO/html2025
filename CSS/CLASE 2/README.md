# Nota de refactor de estilos (Clase 2)

Esta carpeta documenta la separación de estilos de la Clase 2 (Texto — Jerarquías).

Qué se hizo en Clase 2:
- Se creó `styles.css` en la carpeta de la clase y se enlazó desde `index.html`.
- Se movieron las reglas del bloque `<style>` embebido al archivo `styles.css`.
- Se eliminó el estilo inline del enlace de salto y se reemplazó por la clase `.visually-hidden`.
- Se mantuvieron las clases utilitarias como `.muted` y los estilos de `blockquote`, `pre`, etc., dentro del CSS.

Rutas relacionadas:
- HTML: `CLASE 2/2- TEXTO JERARQUIAS/index.html`
- CSS: `CLASE 2/2- TEXTO JERARQUIAS/styles.css`

Buenas prácticas:
- Evitar `style="..."` en el HTML; usar clases desde CSS.
- Centralizar utilidades repetidas y nombrar clases de forma clara.

Control de versiones:
- Cambios registrados en Git con el commit: "Extrae estilos a styles.css por clase y elimina inline styles".
