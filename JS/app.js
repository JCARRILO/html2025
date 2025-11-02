// TOC builder + scrollspy (índice inferior)
(function(){
  'use strict';
  try{
    var toc = document.querySelector('.toc');
    if(!toc || toc.hasAttribute('hidden')) return;

    var list = toc.querySelector('ol');
    if(!list){ list = document.createElement('ol'); list.className='toc-list'; toc.appendChild(list); }
    var statusEl = toc.querySelector('#toc-current');

    var io = null;
    var items = [];

    function setActive(id){
      items.forEach(function(it){
        var on = (it.id===id);
        it.a.setAttribute('aria-current', on?'true':'false');
        if(it.li) it.li.classList.toggle('is-active', on);
      });
      if(statusEl){
        var idx = items.findIndex(function(it){ return it.id===id });
        if(idx>=0){
          var title = items[idx].a.textContent.trim();
          statusEl.textContent = (idx+1) + ' / ' + items.length + ' — ' + title;
        }
      }
    }

    function onClick(e){
      var a = e.target.closest('a[href^="#"]');
      if(!a) return;
      var id = (a.getAttribute('href')||'').slice(1);
      if(!id) return;
      var target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      try{ target.setAttribute('tabindex','-1'); target.focus({ preventScroll:true }); }catch(_){}
      target.scrollIntoView({ behavior:'smooth', block:'start' });
      setActive(id);
      try{ history.pushState(null, '', '#' + id) }catch(_){}
    }

    function build(){
      if(io){ try{ io.disconnect() }catch(_e){} io=null }
      items = [];
      list.innerHTML = '';
      var sections = Array.prototype.slice.call(document.querySelectorAll('main .lesson[id]:not(#indice)'));
      // 1) Deduplicate by id (in case duplicates remain in DOM)
      var seen = new Set();
      sections = sections.filter(function(sec){ if(seen.has(sec.id)) return false; seen.add(sec.id); return true; });
      // 2) Sort by group (clase-* first, then css-*) and numeric order
      sections.sort(function(a,b){
        function key(s){
          var id = s.id || '';
          var m = id.match(/(clase|css)-(\d+)/i) || [];
          var grp = (m[1] && m[1].toLowerCase()==='clase') ? 0 : 1;
          var num = m[2] ? parseInt(m[2],10) : 0;
          return [grp, num];
        }
        var ka = key(a), kb = key(b);
        return (ka[0]-kb[0]) || (ka[1]-kb[1]);
      });
      function colorIndexFromId(id, idx){
        var m = (id||'').match(/(?:clase|css)-(\d+)/i);
        var span = 12; // usar 12 colores; del 7 al 12 emplean gradientes
        if(m){ var n = parseInt(m[1],10) || 1; return ((n-1) % span) + 1; }
        return (idx % span) + 1;
      }
      sections.forEach(function(sec, idx){
        var id = sec.id;
        var titleEl = sec.querySelector('h2');
        var raw = titleEl ? titleEl.textContent.trim() : id;
        function sanitize(t){
          if(!t) return t;
          // Quitar caracteres de reemplazo o secuencias mojibake comunes
          var hasMojibake = /\uFFFD|�/.test(t) || /��/.test(t);
          if(hasMojibake){
            var m = id.match(/clase-(\d+)/i);
            var n = m ? m[1] : (idx+1);
            return 'Clase ' + n;
          }
          return t;
        }
        var title = sanitize(raw);
        var li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center gap-2';
        var dot = document.createElement('span');
        var colorIndex = colorIndexFromId(id, idx); // c1..c6 ciclo por número
        dot.className = 'dot c' + colorIndex;
        dot.setAttribute('aria-hidden','true');
        var a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = title;
        li.appendChild(dot);
        li.appendChild(a);
        list.appendChild(li);
        // Asociar color también a la sección para estilizar su título
        try{ sec.classList.add('c' + colorIndex); }catch(_e){}
        items.push({ id:id, a:a, li:li });
      });

      if(items.length){ setActive(items[0].id); }

      toc.addEventListener('click', onClick);
      if('IntersectionObserver' in window){
        var current = null;
        io = new IntersectionObserver(function(entries){
          var top=null, ratio=0;
          entries.forEach(function(e){ if(e.isIntersecting && e.intersectionRatio>=ratio){ top=e.target; ratio=e.intersectionRatio } });
          if(top && top.id!==current){ current=top.id; setActive(current) }
        }, { rootMargin:'0px 0px -45% 0px', threshold:[0.35,0.6,0.85] });
        sections.forEach(function(s){ io.observe(s) });
      }
    }

    build();

    // Actualizar el índice si se agregan nuevas secciones dinámicamente
    var content = document.querySelector('.content');
    if(content){
      // If no #indice, insert CSS defs before the first existing CSS section, or append.
      try{
        var idxSection = document.getElementById('indice');
        var firstCss = document.querySelector('.content > section.lesson[id^="css-"]');
        var anchor = firstCss || idxSection;
        // Rewire defs insertion to use anchor/fallback
        // Monkey-patch local helper if present
      }catch(_e){}
    }
    if(content && 'MutationObserver' in window){
      var mo = new MutationObserver(function(mutations){
        var changed = mutations.some(function(m){
          return Array.prototype.some.call(m.addedNodes||[], function(n){ return n.nodeType===1 && n.matches && n.matches('section.lesson[id]'); });
        });
        if(changed){ build(); }
      });
      mo.observe(content, { childList:true, subtree:false });
    }

  }catch(e){ /* no-op */ }
})();

// Avatar flotante que enlaza al índice (#indice)
(function(){
  try{
    var existing = document.querySelector('.avatar-fab');
    if(existing) return;
    var fab = document.createElement('a');
    fab.href = '#indice';
    fab.className = 'avatar-fab';
    fab.setAttribute('aria-label','Ir al índice de temas');
    var img = document.createElement('img');
    img.src = 'assets/images/avatar.jpeg';
    img.alt = '';
    img.setAttribute('aria-hidden','true');
    fab.appendChild(img);
    document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(fab) });
  }catch(e){ /* no-op */ }
})();

// Insertar imagen de portada en el header para móviles (para evitar recorte)
(function(){
  try{
    document.addEventListener('DOMContentLoaded', function(){
      var wrap = document.querySelector('header.site .wrap');
      if(!wrap) return;
      if(wrap.querySelector('.header-cover')) return;
      var img = document.createElement('img');
      img.src = 'assets/images/portadadeheader.jpeg';
      img.alt = 'Portada del Curso HTML';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.className = 'header-cover responsive';
      wrap.appendChild(img);
    });
  }catch(e){ /* no-op */ }
})();

// Ordenar y ubicar secciones CSS (css-1..N) después de las clases HTML
(function(){
  try{
    document.addEventListener('DOMContentLoaded', function(){
      var content = document.querySelector('.content');
      if(!content) return;
      // 1) Inyectar secciones CSS vistas si no existen
      var idxSection = document.getElementById('indice');
      if(!document.getElementById('css-1')){
        var defs = [
          { id:'css-1', title:'CSS 1 — De la idea al estilo', html:'<article class="card"><h3>Concepto</h3><p>Del diseño a reglas mantenibles: paleta, tipografías, espaciados, componentes y utilidades.</p><ul><li>Variables CSS para colores y espaciado.</li><li>Sistema tipográfico y tarjetas reutilizables.</li><li>Enfoque mobile‑first.</li></ul></article>' },
          { id:'css-2', title:'CSS 2 — Qué es y cómo aplicarlo', html:'<article class="card"><h3>3 formas de aplicar estilos</h3><pre><code>&lt;!-- 1) En línea (evitar globalmente) --&gt;\n&lt;h1 style=&quot;color:#2f6e93&quot;&gt;Título&lt;/h1&gt;\n\n&lt;!-- 2) En el head --&gt;\n&lt;style&gt; h1{ color:#2f6e93 } &lt;/style&gt;\n\n&lt;!-- 3) Hoja externa (recomendado) --&gt;\n&lt;link rel=&quot;stylesheet&quot; href=&quot;CSS/app.css&quot;&gt;</code></pre></article>' },
          { id:'css-3', title:'CSS 3 — Selectores y Especificidad', html:'<article class="card"><h3>Ejemplos</h3><ul class="cols"><li>Tipo: &lt;code&gt;p&lt;/code&gt;, &lt;code&gt;h1&lt;/code&gt;</li><li>Clase: &lt;code&gt;.card&lt;/code&gt;, &lt;code&gt;.btn.primary&lt;/code&gt;</li><li>ID: &lt;code&gt;#contenido&lt;/code&gt;</li><li>Atributo: &lt;code&gt;a[target=&quot;_blank&quot;]&lt;/code&gt;</li><li>Jerarquía: &lt;code&gt;.card a&lt;/code&gt; y &lt;code&gt;.card &amp;gt; h3&lt;/code&gt;</li></ul><p><strong>Especificidad</strong>: ID &amp;gt; clase/atributo/pseudoclase &amp;gt; tipo. Evita &lt;code&gt;!important&lt;/code&gt;.</p></article>' },
          { id:'css-4', title:'CSS 4 — Pseudo‑clases y Pseudo‑elementos', html:'<article class="card"><h3>Uso común</h3><ul class="cols"><li>Pseudo‑clases: &lt;code&gt;:hover&lt;/code&gt;, &lt;code&gt;:focus&lt;/code&gt;, &lt;code&gt;:active&lt;/code&gt;, &lt;code&gt;:nth-child()&lt;/code&gt;</li><li>Pseudo‑elementos: &lt;code&gt;::before&lt;/code&gt;, &lt;code&gt;::after&lt;/code&gt;, &lt;code&gt;::marker&lt;/code&gt;, &lt;code&gt;::selection&lt;/code&gt;</li></ul></article>' },
          { id:'css-5', title:'CSS 5 — Box Model', html:'<article class="card"><h3>Recordatorio</h3><p>Cada elemento es una caja: contenido, padding, border y margin. Usa &lt;code&gt;box-sizing: border-box&lt;/code&gt;.</p><pre><code>*{ box-sizing: border-box }\n.demo-box{ width:200px; padding:12px; border:2px solid #2f6e93; margin:8px 0 }</code></pre></article>' },
          { id:'css-6', title:'CSS 6 — Position', html:'<article class="card"><h3>Tipos de position</h3><ul><li>&lt;code&gt;static&lt;/code&gt;, &lt;code&gt;relative&lt;/code&gt; (desplaza sin sacar del flujo)</li><li>&lt;code&gt;absolute&lt;/code&gt; (respecto al contenedor posicionado)</li><li>&lt;code&gt;fixed&lt;/code&gt; (anclado a la ventana), &lt;code&gt;sticky&lt;/code&gt; (se pega al scroll)</li></ul></article>' },
          { id:'css-7', title:'CSS 7 — Organización BEM', html:'<article class="card"><h3>Bloque, Elemento, Modificador</h3><pre><code>&lt;article class=&quot;card product product--featured&quot;&gt;\n  &lt;h3 class=&quot;product__title&quot;&gt;Auriculares&lt;/h3&gt;\n  &lt;button class=&quot;btn btn--primary product__cta&quot;&gt;Comprar&lt;/button&gt;\n&lt;/article&gt;\n\n/* BEM */\n.product{ }\n.product__title{ }\n.product__cta{ }\n.product--featured{ }</code></pre><p>Nombres predecibles, componentes reusables y modificadores explícitos evitan choques de estilos.</p></article>' },
          { id:'css-8', title:'CSS 8 — Unidades de medida', html:'<article class="card"><h3>Tipos</h3><ul class="cols"><li>Absolutas: <code>px</code></li><li>Relativas tipográficas: <code>em</code>, <code>rem</code>, <code>ch</code></li><li>Relativas al contenedor: <code>%</code></li><li>Relativas a la ventana: <code>vw</code>, <code>vh</code>, <code>vmin</code>, <code>vmax</code></li></ul></article><article class="card"><h3>Demo rápida</h3><div class="units-grid"><div class="box" style="width:120px">width:120px</div><div class="box" style="width:50%">width:50%</div><div class="box" style="width:40vw">width:40vw</div><div class="box" style="font-size:1rem">1rem texto</div><div class="box" style="font-size:1.25rem">1.25rem texto</div><div class="box" style="font-size:1em">1em (rel. al padre)</div></div></article>' }
        ];
        defs.forEach(function(def){
          if(!document.getElementById(def.id)){
            var sec = document.createElement('section');
            sec.id = def.id;
            sec.className = 'lesson' + (def.id==='css-6' ? ' css-c5' : '');
            sec.tabIndex = -1;
            var h2 = document.createElement('h2'); h2.textContent = def.title; sec.appendChild(h2);
            var container = document.createElement('div'); container.innerHTML = def.html; while(container.firstChild){ sec.appendChild(container.firstChild) }
            var contentEl = document.querySelector('.content');
            var firstCss = document.querySelector('.content > section.lesson[id^="css-"]');
            var anchor = firstCss || idxSection;
            var parent = (anchor && anchor.parentNode) || contentEl;
            if(parent){ if(anchor){ parent.insertBefore(sec, anchor); } else { parent.appendChild(sec); } }
          }
        });

        // Overrides de contenido (p. ej., CSS 8 con resumen y ejemplos completos)
        var ov = {
          'css-8': { title:'CSS 8 — Unidades de medida', html:'<article class="card"><h3>Resumen</h3><p>Elegir la unidad correcta en CSS es clave para lograr un diseño responsive, accesible y controlado. Cuándo usar <code>px</code>, <code>%</code>, <code>rem</code>, <code>em</code>, <code>vw</code> y <code>vh</code>, sus ventajas y límites.</p><ul><li><strong>px</strong> es fijo y no se adapta; útil en casos puntuales.</li><li><strong>%</strong> depende del tamaño del contenedor padre.</li><li><strong>rem</strong> usa el font-size raíz; mejora accesibilidad.</li><li><strong>em</strong> depende del padre inmediato y puede acumularse.</li><li><strong>vw/vh</strong> miden respecto al viewport; útiles para secciones a pantalla.</li></ul></article><article class="card"><h3>Ejemplos y código</h3><div class="units-grid"><div class="box box-pixel">width:200px</div><div class="box box-percent">width:50%</div><div class="box box-rem" style="font-size:1rem">width:15rem</div><div class="box box-em" style="font-size:1.25em">width:1em</div><div class="box box-vw">width:30vw</div><div class="box box-vh">height:20vh</div></div><h4 style="margin-top:12px">CSS de ejemplo</h4><pre><code>.box-pixel{ border:1px solid red; padding:16px; width:200px; }\n.box-percent{ border:1px solid red; padding:16px; width:50%; }\n.box-rem{ border:1px solid red; padding:16px; width:15rem; /* 15 * 16px por defecto */ }\n.container{ font-size:20px; }\n.container .inner{ font-size:24px; }\n.box-em{ border:1px solid red; padding:16px; width:1em; /* depende del padre */ }\n.box-vw{ border:1px solid red; padding:16px; width:30vw; }\n.box-vh{ border:1px solid red; padding:16px; height:20vh; }\n.hero{ width:100vw; height:100vh; }</code></pre></article>' }
        };
        Object.keys(ov).forEach(function(id){
          var sec = document.getElementById(id);
          if(!sec) return;
          var h2 = sec.querySelector('h2');
          if(!h2){ h2 = document.createElement('h2'); sec.prepend(h2); }
          h2.textContent = ov[id].title;
          while(h2.nextSibling){ sec.removeChild(h2.nextSibling); }
          var wrapper = document.createElement('div');
          wrapper.innerHTML = ov[id].html;
          while(wrapper.firstChild){ sec.appendChild(wrapper.firstChild) }
        });

        // 3) Extender CSS 8 con demo de hero 100vw/100vh y tipografía fluida (clamp)
        var css8 = document.getElementById('css-8');
        if(css8 && !css8.querySelector('[data-demo="hero"]')){
          var a1 = document.createElement('article');
          a1.className = 'card';
          a1.setAttribute('data-demo','hero');
          a1.innerHTML = '<h3>Hero a pantalla completa (100vw/100vh)</h3>'+
            '<div class="hero-demo"><div class="hero-demo__content">Hero 100vw × 100vh</div></div>'+
            '<h4 style="margin-top:12px">CSS</h4>'+
            '<pre><code>.hero { width:100vw; height:100vh; }</code></pre>';
          css8.appendChild(a1);
        }
        if(css8 && !css8.querySelector('[data-demo="clamp"]')){
          var a2 = document.createElement('article');
          a2.className = 'card';
          a2.setAttribute('data-demo','clamp');
          a2.innerHTML = '<h3>Tipografía fluida con <code>clamp()</code></h3>'+
            '<p class="fluid-text">Texto fluido: clamp(1.1rem, 5vw, 2.4rem)</p>'+
            '<pre><code>.title { font-size: clamp(1.1rem, 5vw, 2.4rem); }</code></pre>';
          css8.appendChild(a2);
        }
      }

      // 2) Reordenar todas las secciones CSS por número y colocarlas juntas antes del índice
      var cssSecs = Array.prototype.slice.call(content.querySelectorAll('section.lesson[id^="css-"]'));
      if(cssSecs.length){
        // Eliminar duplicados (por id)
        var seen = new Set();
        cssSecs.forEach(function(sec){
          if(seen.has(sec.id)){
            sec.parentNode && sec.parentNode.removeChild(sec);
          } else { seen.add(sec.id) }
        });
        // Recalcular tras posibles removidos
        cssSecs = Array.prototype.slice.call(content.querySelectorAll('section.lesson[id^="css-"]'));
        // Orden numérico ascendente
        cssSecs.sort(function(a,b){
          var na = parseInt((a.id.match(/css-(\d+)/)||[])[1]||0,10);
          var nb = parseInt((b.id.match(/css-(\d+)/)||[])[1]||0,10);
          return na - nb;
        });
        // Insertar en orden justo antes del índice
        if(idxSection){
          var firstCss = document.querySelector('.content > section.lesson[id^="css-"]');
          var anchor = firstCss || null;
          cssSecs.forEach(function(sec){
            if(anchor && anchor.parentNode){ anchor.parentNode.insertBefore(sec, anchor); }
            else { content.appendChild(sec); }
          });
        }
      }
    });
  }catch(e){ /* no-op */ }
})();
