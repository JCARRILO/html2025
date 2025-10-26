(function(){
  // Scrollspy for global TOC
  try{
    var toc = document.querySelector('.toc');
    if(!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var items = links.map(function(a){ return { id:(a.getAttribute('href')||'').replace('#',''), a:a, li:a.closest('li') } });
    var targets = items.map(function(it){ return document.getElementById(it.id) }).filter(Boolean);
    function setActive(id){
      items.forEach(function(it){ var on = (it.id===id); it.a.setAttribute('aria-current', on?'true':'false'); if(it.li) it.li.classList.toggle('is-active', on); });
    }
    setActive(items[0] && items[0].id);
    if(!('IntersectionObserver' in window)) return;
    var current = null;
    var io = new IntersectionObserver(function(entries){
      var top=null, ratio=0;
      entries.forEach(function(e){ if(e.isIntersecting && e.intersectionRatio>=ratio){ top=e.target; ratio=e.intersectionRatio } });
      if(top && top.id!==current){ current=top.id; setActive(current) }
    }, { rootMargin:'0px 0px -45% 0px', threshold:[0.35,0.6,0.85] });
    targets.forEach(function(t){ io.observe(t) });
  }catch(e){ /* no-op */ }
})();

