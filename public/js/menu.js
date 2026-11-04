// Menú móvil del encabezado
(function(){var h=document.querySelector('header'),b=document.getElementById('mn');if(!b)return;
function set(o){h.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.textContent=o?'✕':'☰'}
b.addEventListener('click',function(){set(!h.classList.contains('open'))});
h.addEventListener('click',function(e){if(e.target.closest('a')||e.target.closest('.cart'))set(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
addEventListener('resize',function(){if(innerWidth>900)set(false)})})();
