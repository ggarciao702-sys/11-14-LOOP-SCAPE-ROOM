// Pago: validación de tarjeta, guardado del pedido en el servidor (base de datos + correo), recibo y formulario de contacto
$('#xcn').oninput=e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,19).replace(/(.{4})/g,'$1 ').trim()};
$('#xce').oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v};
const luhn=n=>{if(!/^\d{13,19}$/.test(n))return false;let s=0,a=false;for(let i=n.length-1;i>=0;i--){let d=+n[i];if(a){d*=2;if(d>9)d-=9}s+=d;a=!a}return s%10==0};
function cardOk(){const e=$('#xce').value.match(/^(\d{2})\/(\d{2})$/);if(!e||+e[1]<1||+e[1]>12)return false;const n=new Date(),y=n.getFullYear()%100,m=n.getMonth()+1;if(+e[2]<y||(+e[2]==y&&+e[1]<m))return false;
 return luhn($('#xcn').value.replace(/\s/g,''))&&/^\d{3,4}$/.test($('#xcv').value)&&$('#xch').value.trim().length>2}
// ===== Base de datos: pedidos y mensajes se guardan en el servidor (SQLite) y llegan al correo del dueño =====
const API=(window.LOOP_API||'').replace(/\/$/,'');
let srvNo='',srvRef='';
async function post(ruta,cuerpo){const r=await fetch(API+ruta,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(cuerpo)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||('HTTP '+r.status));return j}
async function saveOrder(){
 const f=Object.fromEntries(new FormData($('#xf')));
 // Solo se envían datos del cliente y de la compra. Los campos de tarjeta (xcn, xch, xce, xcv) NUNCA salen del navegador.
 const j=await post('/api/pedidos',{cliente:{nombre:f.name,documento:f.doc,telefono:f.phone,correo:f.email,ciudad:f.city},pais:C[CC].n,moneda:C[CC].c,total:total()*C[CC].r,metodo_pago:method,banco:method=='pse'?$('#xbk').value:'',idioma:LG,items:cart.map(id=>({id,nombre:nameOf(id),precio_usd:priceOf(id)}))});
 srvNo=j.numero;srvRef=j.referencia||'';
}
$('#form-contacto').addEventListener('submit',async e=>{e.preventDefault();const fm=e.target,b=fm.querySelector('button[type=submit]');b.disabled=true;
 try{await post('/api/contacto',{usuario:fm.usuario.value,tipo_reporte:fm.tipo_reporte.value,descripcion:fm.descripcion.value});fm.reset();toast(t('cok'))}catch(_){toast(t('cerr'))}b.disabled=false});
$('#xpay').onclick=()=>{if(busy||!cart.length)return;if(method=='card'&&!cardOk()){$('#xer').textContent=t('errcard');return}
 busy=true;$('#xpay').disabled=true;$('#xpay').textContent=t('wait');saveOrder().then(()=>{$('#xpay').disabled=false;finish()}).catch(()=>{$('#xpay').disabled=false;busy=false;upd();$('#xer').textContent=t('errsave')})};
function finish(){
 const f=Object.fromEntries(new FormData($('#xf'))),d=new Date(),p=x=>String(x).padStart(2,'0');
 const no=srvNo||('LOOP-'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+Math.floor(1000+Math.random()*9000));
 const cash=method=='cash',ref=cash?(srvRef||Array.from({length:12},()=>Math.floor(Math.random()*10)).join('')):'',ex=new Date(d.getTime()+72*36e5);
 const D=new Intl.DateTimeFormat(loc(),{dateStyle:'medium',timeStyle:'short'});
 const rows=cart.map(id=>'<p>1 × '+esc(nameOf(id))+' — '+fmt(priceOf(id))+'</p>').join('');
 $('#xrc').innerHTML='<div class="hd"><span class="lg"><img src="'+IMG.logo+'" alt=""></span><div><h3 class="mh" style="margin:0">LOOP</h3><p>'+t('rcp')+'</p></div></div>'+
 '<p>'+t('no')+': <b>'+no+'</b></p><p>'+t('date')+': '+D.format(d)+'</p><hr>'+
 '<p>'+t('cust')+': '+esc(f.name)+' ('+esc(f.doc)+')</p><p>'+esc(f.email)+' · '+esc(f.phone)+' · '+esc(f.city)+', '+C[CC].n+'</p><hr>'+rows+
 '<p style="font-size:18px;margin-top:8px">'+t('total')+': <b>'+fmt(total())+'</b> ('+C[CC].c+')</p><hr>'+
 '<p>'+t('m_'+method)+(method=='pse'?' – '+esc($('#xbk').value):'')+'</p><p>'+t('st')+': <b>'+(cash?t('pend'):t('paid'))+'</b></p>'+
 (cash?'<p>'+t('netw')+': '+C[CC].cash+'</p><div class="rf">'+ref+'</div><p>'+t('exp')+': '+D.format(ex)+'</p>':'')+
 '<p class="nt" style="margin-top:10px">'+t('demo')+'</p>';
 ['xcn','xch','xce','xcv'].forEach(i=>$('#'+i).value='');
 cart=[];busy=false;srvNo='';srvRef='';upd();step(3)}
$('#xprt').onclick=()=>{try{window.print()}catch(_){}};
