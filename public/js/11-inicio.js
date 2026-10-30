// Arranque de la página
draw();
const st=$('#stage');addEventListener('pointermove',ev=>{st.style.setProperty('--mx',ev.clientX/innerWidth-.5);st.style.setProperty('--my',ev.clientY/innerHeight-.5)});
const cf=$('#cf');cf.addEventListener('pointermove',ev=>{const r=cf.getBoundingClientRect();$('#ci').style.transform='rotateY('+(((ev.clientX-r.left)/r.width-.5)*30)+'deg)'});cf.addEventListener('pointerleave',()=>$('#ci').style.transform='');
