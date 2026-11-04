// Interfaz: ventana de personaje, inclinación 3D de tarjetas y flechas de carrusel
$('#ic').onclick=()=>$('#im').classList.remove('on');$('#im').onclick=e=>{if(e.target.id=='im')$('#im').classList.remove('on')};addEventListener('keydown',e=>{if(e.key=='Escape')$('#im').classList.remove('on')});
// inclinación 3D de tarjetas (delegada: funciona aunque se redibujen)
let cur=null;document.addEventListener('pointermove',ev=>{const e=ev.target.closest('.card');if(cur&&cur!==e){cur.style.setProperty('--rx',0);cur.style.setProperty('--ry',0)}cur=e;if(e){const r=e.getBoundingClientRect();e.style.setProperty('--rx',((ev.clientX-r.left)/r.width-.5)*14);e.style.setProperty('--ry',-((ev.clientY-r.top)/r.height-.5)*14)}});
$$('.ar').forEach(b=>b.onclick=()=>{const v=$('#'+b.dataset.sc);v.scrollBy({left:(b.classList.contains('l')?-1:1)*v.clientWidth*.8,behavior:'smooth'})});
