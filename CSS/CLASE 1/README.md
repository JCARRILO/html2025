# Nota de refactor de estilos (Clase 1)

Este proyecto fue reorganizado para separar los estilos CSS del HTML en todas las clases (1–12), siguiendo buenas prácticas.

Qué se hizo:
- Se creó un archivo `styles.css` por carpeta de clase y se enlazó desde cada `index.html`.
- Se movieron todas las reglas de los bloques `<style>` embebidos al `styles.css` correspondiente.
- Se eliminaron estilos inline (`style="..."`) en el HTML y se reemplazaron por clases utilitarias en CSS.
- Se estandarizó la clase `.visually-hidden` para el enlace de “Saltar al contenido”, mejorando accesibilidad sin estilos inline.

Clases utilitarias destacadas usadas:
- `.visually-hidden`: oculta visualmente contenido accesible para lectores de pantalla.
- `.header-inner`, `.brand`, `img.logo`, `.title-center`: utilizadas en Clase 5 para sustituir estilos inline del encabezado.
- `.spaced`, `.bg-example`, `.note`: utilizadas en Clase 3 para reemplazar márgenes, fondos y notas.
- `.fixed-600`: utilizada en Clase 8 para imágenes con ancho fijo responsivo.
- `.embed`: utilizada en Clase 9 para iframes con relación 16:9 sin borde.
- `.page-title`: utilizada en Clase 11 para márgenes del título principal.

Ubicación de los archivos relevantes de Clase 1:
- HTML: `CLASE 1/1- FUNDAMENTOS HTML/CLASE 1/00 fundamentos Estructura Basica/index.html`
- CSS: `CLASE 1/1- FUNDAMENTOS HTML/CLASE 1/00 fundamentos Estructura Basica/styles.css`

Recomendaciones a futuro:
- Evitar agregar `style="..."` en el HTML; crear o reutilizar clases en CSS.
- Si una utilidad se repite entre clases, considerar un CSS compartido para variables y utilidades globales.

Control de versiones:
- Cambios registrados en Git con el commit: "Extrae estilos a styles.css por clase y elimina inline styles".

## Selectores y Especificidad

Conceptos clave para entender cómo el navegador decide qué regla CSS se aplica cuando hay conflictos.

### Tipos de selectores (de más genéricos a más específicos)
- Universal: `*` (evítalo salvo resets puntuales)
- Tipo/Elemento: `div`, `h1`, `img`
- Clase: `.btn`, `.card.primary`
- Atributo: `[type="email"]`, `[aria-expanded="true"]`
- Pseudo‑clase: `:hover`, `:focus`, `:disabled`, `:not(...)`
- ID: `#header`, `#login`
- Pseudo‑elemento: `::before`, `::after`, `::marker`
- Combinadores: descendiente (` `), hijo (`>`), hermano adyacente (`+`), hermano general (`~`)

### Cálculo de especificidad (resumen práctico)
- Inline style (atributo `style="..."`): 1000
- IDs: 100 cada uno
- Clases, atributos y pseudo‑clases: 10 cada uno
- Elementos y pseudo‑elementos: 1 cada uno
- Universal (`*`) y combinadores: 0

Si la especificidad empata, gana la regla que aparece más tarde en la hoja (orden en cascada). `!important` sólo debe usarse como último recurso: gana frente a otras reglas del mismo origen, pero dificulta el mantenimiento.

Ejemplos rápidos
```html
<button id="cta" class="btn primary">Comprar</button>
```
```css
/* 1 punto (elemento) */
button { background:#eee }

/* 10 + 10 = 20 puntos (dos clases) */
.btn.primary { background:#2f6e93 }

/* 100 puntos (ID) → gana sobre clases */
#cta { background:#184b62 }

/* 10 + 1 = 11 puntos (clase + elemento) */
button.primary { background:#1b5 }

/* Igual especificidad que .btn.primary (20) → gana la que esté más abajo */
.btn.primary { background:#0a7 }
```

### Cascada, herencia y origen
- Cascada: si la especificidad es igual, el último bloque definido gana.
- Herencia: algunas propiedades (ej. `color`, `font-family`) se heredan; otras (ej. `margin`, `border`) no.
- Origen: navegador < autor < usuario. Dentro del mismo origen, `!important` eleva prioridad (usar con moderación).

### Buenas prácticas
- Prefiere clases sobre IDs para estilado reutilizable.
- Evita selectores demasiado largos o anidados (acoplamiento frágil).
- Usa utilidades y variables; limita `!important` a excepciones controladas.
- Coloca reglas de mayor alcance antes, y overrides más específicos después.
- Nombra clases por función/rol visual, no por estructura del DOM.

### Patrones útiles
- Estado por clase: `.is-active`, `.is-hidden`, `[aria-expanded="true"]`
- Variantes por clase: `.btn.primary`, `.btn.ghost`
- Pseudo‑clases interactivas accesibles: `:focus`, `:focus-visible` (no relies solo en `:hover`).

### Mini‑ejercicio sugerido
1) Estila un enlace con `.btn` y luego agrega `.btn.primary` para sobrescribir color de fondo.
2) Añade `#cta` al mismo elemento y verifica cómo el ID prevalece.
3) Elimina el ID y observa cómo el orden en el CSS afecta el resultado cuando la especificidad empata.
