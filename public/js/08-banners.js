// Carrusel de banners (los datos BN están en 03-datos.js)
// ===== Banners (carrusel automático) =====
let bi=0,bt;const bR=$('#bnr');
BN.forEach((b,k)=>{const im=document.createElement('img');im.src=IMG[b.i];im.draggable=false;bR.insertBefore(im,$('#bdt'));const d=document.createElement('button');d.setAttribute('aria-label',(k+1)+'/'+BN.length);d.onclick=()=>bGo(k,1);$('#bdt').appendChild(d)});
function bGo(k,r){bi=(k+BN.length)%BN.length;$$('#bnr img').forEach((e,j)=>e.classList.toggle('on',j==bi));$$('#bdt button').forEach((e,j)=>e.classList.toggle('on',j==bi));if(r)bRun()}
function bRun(){clearTimeout(bt);bt=setTimeout(()=>{bGo(bi+1);bRun()},4500)}
$('#bnp').onclick=()=>bGo(bi-1,1);$('#bnx').onclick=()=>bGo(bi+1,1);
let bx=null;bR.addEventListener('touchstart',e=>bx=e.touches[0].clientX,{passive:true});bR.addEventListener('touchend',e=>{if(bx==null)return;const d=e.changedTouches[0].clientX-bx;bx=null;if(Math.abs(d)>40)bGo(bi+(d<0?1:-1),1)});
bGo(0);bRun();
