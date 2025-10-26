// Scrollspy for lesson-aside: highlights the active knowledge item while scrolling
(function(){
  try{
    var aside = document.querySelector('.lesson-aside');
    if(!aside) return;
    var links = Array.prototype.slice.call(aside.querySelectorAll('a[href^="#"]'));
    if(!links.length) return;
    var items = links.map(function(a){
      var id = (a.getAttribute('href')||'').replace(/^#/, '');
      return { id:id, a:a, li:a.closest('li') };
    }).filter(function(it){ return !!it.id; });
    if(!items.length) return;
    var targets = items.map(function(it){ return document.getElementById(it.id) }).filter(Boolean);
    function setActive(id){
      items.forEach(function(it){
        var active = it.id === id;
        it.a.setAttribute('aria-current', active ? 'true' : 'false');
        if(it.li) it.li.classList.toggle('is-active', active);
      });
    }
    // Default to first item
    setActive(items[0].id);
    if(!('IntersectionObserver' in window)) return;
    var byId = new Map(items.map(function(it){ return [it.id, it]; }));
    var current = null;
    var io = new IntersectionObserver(function(entries){
      var top = null, ratio = 0;
      entries.forEach(function(e){
        if(e.isIntersecting && e.intersectionRatio >= ratio){ top = e.target; ratio = e.intersectionRatio; }
      });
      if(top){
        var id = top.id;
        if(id && id !== current && byId.has(id)){
          current = id; setActive(id);
        }
      }
    }, { rootMargin: '0px 0px -40% 0px', threshold: [0.4,0.6,0.8] });
    targets.forEach(function(t){ io.observe(t) });
  }catch(e){ /* no-op */ }
})();

