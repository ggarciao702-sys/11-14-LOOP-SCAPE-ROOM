// Tienda: carrito, tarjetas de productos, personajes y dibujo de la página
function buy(id){const p=priceOf(id);
 if(p==null){$('#tp').value='Consultar precio de un personaje';$('#ds').value=t('askm')+nameOf(id);location.hash='#contacto';return}
 if(cart.includes(id))return toast(t('dup'));cart.push(id);upd();toast(t('added')+': '+nameOf(id))}
function upd(){
 $('#bc').textContent=t('cartb')+' ('+cart.length+')';
 $('#li').innerHTML=cart.length?'':'<p style="color:var(--mute)">'+t('empty')+'</p>';
 cart.forEach((id,k)=>{const d=document.createElement('div');d.className='it';d.innerHTML='<span>'+esc(nameOf(id))+'<br><small style="color:var(--violet)">'+fmt(priceOf(id))+'</small></span>';const b=document.createElement('button');b.textContent='✕';b.setAttribute('aria-label','✕');b.onclick=()=>{cart.splice(k,1);upd()};d.appendChild(b);$('#li').appendChild(d)});
 $('#tt').textContent=fmt(total())+' ('+C[CC].c+')';
 $('#xn1').disabled=!cart.length;
 $('#xsum').innerHTML=cart.map(id=>'<div class="it"><span>'+esc(nameOf(id))+'</span><b>'+fmt(priceOf(id))+'</b></div>').join('')+'<p style="margin:10px 0"><b>'+t('total')+':</b> '+fmt(total())+' ('+C[CC].c+')</p>';
 const ms=C[CC].m;if(!ms.includes(method))method=ms[0];
 $('#xm').innerHTML=ms.map(m=>'<label><input type="radio" name="pm" value="'+m+'"'+(m==method?' checked':'')+'>'+t('m_'+m)+'</label>').join('');
 $('#xpay').textContent=busy?t('wait'):t('pay')+' '+fmt(total());
 panel();
}
function panel(){$('#xpc').hidden=method!='card';$('#xpb').hidden=method!='pse';const n=$('#xpn');n.hidden=['card','pse'].includes(method);
 if(method=='cash')n.textContent=t('cashn').replace('{x}',C[CC].cash);else if(!n.hidden)n.textContent=t('redir').replace('{x}',t('m_'+method))}
function step(n){[1,2,3].forEach(i=>$('#xs'+i).hidden=i!=n);$('#xer').textContent=''}
const mk=(img,badge,title,d,p,col,box,id)=>{const e=document.createElement('article');e.className='card';e.style.setProperty('--acc',col);e.innerHTML='<div class="ph"><img src="'+img+'" alt="'+esc(title)+'" loading="lazy">'+(badge?'<span class="badge">'+esc(badge)+'</span>':'')+'</div><div class="bd"><h3>'+esc(title)+'</h3>'+(d?'<p>'+esc(d)+'</p>':'')+'<div class="pr"><b>'+(p==null?t('soonp'):fmt(p))+'</b><button class="btn">'+(p==null?t('notify'):t('buy'))+'</button></div></div>';e.querySelector('button').onclick=()=>buy(id);$(box).appendChild(e)};
function pickC(k){curK=k;const c=CH[k];$('#chars').style.setProperty('--acc',c.c);$('#cn').textContent=c.n.toUpperCase();$('#ct').textContent=c.n;$('#cd').textContent=L(c.d);$('#ci').src=IMG[c.i];$('#ci').alt=c.n;
 $('#cb').innerHTML='<button class="btn" style="background:'+c.c+'">'+(c.p==null?t('ask'):fmt(c.p)+' · '+t('buy'))+'</button>';$('#cb button').onclick=()=>buy('c'+k);
 const q=document.createElement('button');q.className='btn o';q.style.cssText='display:block;margin:12px 0 0';q.textContent=t('where').replace('{x}',c.n);q.onclick=()=>info(k);$('#cb').appendChild(q);
 $('#cn').style.fontSize='min('+(85/(c.n.length*.9)).toFixed(1)+'vw,320px)';[...$('#pk').children].forEach((b,j)=>b.classList.toggle('on',j==k))}
function info(k){const c=CH[k],a=c.a?L(c.a):'';$('#im').style.setProperty('--acc',c.c);$('#ii').src=IMG[c.i];$('#it').textContent=c.n;$('#ia').textContent=a||t('soon').replace('{x}',c.n);$('#iu').textContent=t(a?'use1':'use2').replace('{x}',c.n);$('#im').classList.add('on');$('#ic').focus()}
function draw(){
 document.documentElement.lang=LG;
 $$('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));$$('[data-ip]').forEach(e=>e.placeholder=t(e.dataset.ip));
 $('#xlng').value=LG;$('#xctry').innerHTML=Object.keys(C).map(k=>'<option value="'+k+'"'+(k==CC?' selected':'')+'>'+C[k].n+' ('+C[k].c+')</option>').join('');
 $$('#bnr img').forEach((im,k)=>im.alt=BN[k].a?L(BN[k].a):t('bfalt'));chips();
 const rt=x=>(x+' · ').repeat(14);$('#r1').innerHTML=rt(t('rb1'))+rt(t('rb1'));$('#r2').innerHTML=rt(t('rb2'))+rt(t('rb2'));
 $('#lv').innerHTML='';$('#vs').innerHTML='';$('#ps').innerHTML='';
 NV.forEach((n,k)=>mk(IMG[n.i],L(n.s),L(n.t),L(n.d),n.p,n.c,'#lv','n'+k));
 VS.forEach((v,k)=>mk(IMG[v[1]],t('badgev'),L(v[0]),'',VP,'#b44cff','#vs','v'+k));
 PETS.forEach((q,k)=>mk(q.img||PAW,t('badgep'),L(q.n),L(q.d),q.p,q.c,'#ps','p'+k));
 pickC(curK);upd();
}
// personajes: botones de selección (se crean una vez)
CH.forEach((c,k)=>{const b=document.createElement('button');b.innerHTML='<img src="'+IMG[c.i]+'" alt="'+c.n+'">';b.onclick=()=>pickC(k);$('#pk').appendChild(b)});
$('#xlng').onchange=e=>{LG=e.target.value;draw()};$('#xctry').onchange=e=>{CC=e.target.value;draw()};
$('#bc').onclick=()=>{upd();step(1);$('#cm').classList.add('on')};
$$('[data-x]').forEach(b=>b.onclick=()=>$('#cm').classList.remove('on'));
$('#xn1').onclick=()=>{if($('#xf').reportValidity()&&cart.length){upd();step(2)}};
$('#xb2').onclick=()=>step(1);
$('#xm').onchange=e=>{method=e.target.value;panel()};
