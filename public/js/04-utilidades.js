// Estado global y funciones de ayuda (idioma, país, formato de precios, avisos)
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const tzm={'America/Bogota':'CO','America/Mexico_City':'MX','America/Argentina/Buenos_Aires':'AR','America/Lima':'PE','America/Santiago':'CL','America/Sao_Paulo':'BR','America/Guayaquil':'EC','Europe/Madrid':'ES'};
let LG=(navigator.language||'es').slice(0,2),CC=tzm[Intl.DateTimeFormat().resolvedOptions().timeZone]||'US',cart=[],method='card',busy=false,curK=0;
if(!T[LG])LG='es';
const L=o=>o[LG]||o.es,t=k=>T[LG][k]||T.es[k]||k,esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const loc=()=>({es:'es',en:'en',pt:'pt-BR'}[LG]);
const fmt=u=>{const c=C[CC];return new Intl.NumberFormat(loc(),{style:'currency',currency:c.c,minimumFractionDigits:c.d,maximumFractionDigits:c.d}).format(u*c.r)};
const nameOf=id=>{const k=+id.slice(1);return id[0]=='n'?L(NV[k].t):id[0]=='v'?L(VS[k][0]):id[0]=='p'?L(PETS[k].n):t('pj')+' '+CH[k].n};
const priceOf=id=>{const k=+id.slice(1);return id[0]=='n'?NV[k].p:id[0]=='v'?VP:id[0]=='p'?PETS[k].p:CH[k].p};
const total=()=>cart.reduce((s,id)=>s+priceOf(id),0);
function toast(m){const e=$('#ts');e.textContent=m;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}
