// Asistente LOOP (chat de ayuda)
// ===== Asistente LOOP =====
// AI_ENDPOINT (opcional): URL de TU servidor que llama a Claude con tu clave y devuelve {reply}. Vacío = respuestas con la información de la página.
const AI_ENDPOINT='';
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const P=x=>x==null?t('soonp'):fmt(x);
function kbText(){return['Eres el asistente de la tienda de LOOP. Responde en el idioma del usuario, breve y solo con estos datos; si no sabes algo, dirige a la sección Soporte.',
 'LOOP: juego de terror y escape room; es un juego geométrico avanzado (no es un juego de Roblox, nunca lo menciones como tal). Laberintos y escape rooms en 3D, acertijos de lógica, escenarios que desafían la percepción y una entidad que vigila al jugador. 3 niveles, 6 personajes premium, 6 vestuarios.',
 'Niveles (USD): '+NV.map(v=>v.t.es+' '+(v.p==null?'próximamente':v.p)).join('; ')+'.',
 'Personajes premium: '+CH.map(c=>c.n+' ('+c.d.es+(c.a?' Aparece en: '+c.a.es:'')+(c.p==null?'; precio bajo pedido':'; USD '+c.p)+')').join('; ')+'.',
 'Vestuarios (USD '+VP+' c/u): '+VS.map(v=>v[0].es).join(', ')+'.',
 'Mascotas ('+PETS.length+'): '+PETS.map(q=>q.n.es+' ('+q.d.es+') '+(q.p==null?'próximamente':'USD '+q.p)).join('; ')+'.',
 'Estudio: LOOP, estudio de videojuegos de terror, misterio y experiencias; LOOP es un juego geométrico avanzado. Los banners de la página presentan el juego, el nivel 1 (El tren abandonado: ¿te atreves a subir?), el nivel 3 (El auto sumergido: ¿podrás salir con vida?) y la promoción Black Friday (hasta -70% en mascotas, ropa y accesorios, por tiempo limitado).',
 'Pagos: tarjeta, PSE (Colombia), Mercado Pago, PayPal, Pix (Brasil) y efectivo con referencia (72 h). Precios por país en '+Object.values(C).map(c=>c.c).filter((v,i,a)=>a.indexOf(v)==i).join(', ')+'.',
 'También en desarrollo: Escape de la Cornisa: Eco Marino, coop de terror para 4 jugadores en Unity (carretera de cornisa, fondo marino oscuro, barco científico de la NASA).',
 'Soporte: sección Soporte de la página (errores, compras o pagos, precios, sugerencias).'].join('\n')}
function answer(q){
 const n=norm(q),h=r=>r.test(n),c=C[CC],ow=h(/vestuario|outfit|visual|traje|skin|ropa|roupa|clothes/);
 if(h(/^(hola|buenas|hello|hi|hey|ola|oi)\b/)&&n.length<25)return{x:t('ai_hi')};
 if(h(/gracias|thanks|thank you|obrigad/))return{x:t('a_thx')};
 let k=CH.findIndex(ch=>new RegExp('\\b'+norm(ch.n)+'\\b').test(n));
 if(k<0&&h(/payaso|clown|palhac/)&&!ow)k=5;
 const pk=k<0?PETS.findIndex(q=>q.k.test(n)):-1;
 if(pk>=0){const q=PETS[pk];return{x:L(q.n)+' ('+t('badgep')+'): '+L(q.d)+'\n'+(q.p==null?t('soonp'):t('a_pp')+' '+fmt(q.p))}}
 if(k>=0){const ch=CH[k];return{x:ch.n+': '+L(ch.d)+'\n'+(ch.p==null?t('a_np'):t('a_pp')+' '+fmt(ch.p))+'\n'+(ch.a?L(ch.a):t('soon').replace('{x}',ch.n))}}
 const li=[/tren|vias|vagon|train|trilho|nivel 1|level 1/,/armero|nivel 2|level 2/,/\bauto\b|carro|sumergid|sunken|submers|\bcar\b|nivel 3|level 3/].findIndex(r=>r.test(n));
 if(li>=0){const v=NV[li];return{x:L(v.t)+': '+L(v.d)+'\n'+(v.p==null?t('soonp'):t('a_pp')+' '+fmt(v.p))}}
 const oi=[/campesin|farmer|campones|cundiboy/,/ropa normal|casual|roupa normal/,/desconocid|stranger|desconhecid/,/vaquero|cowboy|vaqueiro/,/supervivient|survivor|sobreviv/,/payaso|clown|palhac/].findIndex(r=>r.test(n));
 if(oi>=0)return{x:L(VS[oi][0])+' '+t('a_ov').replace('{p}',fmt(VP))};
 if(h(/cornisa|eco marino|nasa|unity|cooperativ|\bcoop\b|4 jugadores|4 players|4 jogadores/))return{x:t('a_corn')};
 if(h(/black friday|descuento|oferta|discount|\bsale\b|desconto|promo|banner/))return{x:t('a_bf')};
 if(h(/estudio|studio|estudios|quienes son|quien(es)? (hace|hizo|crea)|who (are|made|makes)|quem (sao|faz|fez)|desarroll|develop|desenvolv/))return{x:t('a_studio')};
 if(h(/donde aparece|onde aparece|aparece|appear/))return{x:t('a_wh')};
 if(h(/pago|pagar|pagament|pay|payment|tarjeta|card|cartao|pse|paypal|pix|efectivo|cash|dinheiro|mercado|efecty|baloto|oxxo|referencia|reference/))
  return{x:t('a_pay').replace('{x}',c.n).replace('{m}',c.m.map(m=>t('m_'+m)).join(', '))+'\n'+(c.cash?t('a_cash').replace('{x}',c.cash):t('a_nocash'))};
 if(h(/comprar|compra|buy|purchase|carrito|cart|carrinho|recibo|receipt/))return{x:t('a_buy')};
 if(h(/pais|country|moneda|currency|moeda|idioma|language|divisa/))return{x:t('a_ct').replace('{c}',c.c)};
 if(h(/mascota|\bpets?\b|mascote|companer|companion|companheir/))return{x:t('a_pets2')+'\n'+PETS.map(q=>'• '+L(q.n)+' — '+L(q.d)+' ('+P(q.p)+')').join('\n')};
 if(ow)return{x:t('a_ou')+' '+VS.map(v=>L(v[0])).join(', ')+'.\n'+t('a_pp')+' '+fmt(VP)};
 if(h(/nivel|level|niveis/))return{x:t('a_lv')+'\n'+NV.map(v=>'• '+L(v.t)+' — '+P(v.p)).join('\n')};
 if(h(/personaje|character|personagem/))return{x:t('a_ch')+'\n'+CH.map(ch=>'• '+ch.n+' — '+(ch.p==null?t('ask'):fmt(ch.p))).join('\n')};
 if(h(/precio|cuesta|cuanto|costo|vale|price|cost|how much|preco|quanto/))return{x:t('a_pr').replace('{c}',c.c)+'\n'+NV.map(v=>'• '+L(v.t)+' — '+P(v.p)).join('\n')+'\n• '+t('n_vs')+' — '+fmt(VP)+'\n• '+t('n_pj')+' — '+t('ask')+'\n• '+t('n_ps')+' — '+PETS.map(q=>P(q.p)).filter((v,i,a)=>a.indexOf(v)==i).join(' / ')};
 if(h(/error|bug|problema|soporte|support|ayuda|help|falla|suporte|reportar|report|sugerencia|suggest/))return{x:t('a_sup'),go:'#contacto'};
 if(h(/roblox/))return{x:t('a_nrb')+'\n\n'+t('a_loop')};
 if(h(/juego|game|jogo|loop|terror|escape|que es|what is|o que e/))return{x:t('a_loop')+'\n\n'+t('a_corn')};
 return{x:t('a_fb'),go:'#contacto'}}
const hist=[];
function say(x,who,go){const m=document.createElement('div');m.className='mb '+who;m.textContent=x;
 if(go){const b=document.createElement('button');b.textContent=t('n_so');b.onclick=()=>{$('#ai').classList.remove('on');location.hash=go};m.appendChild(b)}
 $('#am').appendChild(m);$('#am').scrollTop=1e9}
async function ask(q){q=q.trim();if(!q)return;say(q,'u');hist.push({role:'user',content:q});$('#ain').value='';let r=null;
 if(AI_ENDPOINT){try{const res=await fetch(AI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.slice(-10),lang:LG,country:CC,context:kbText()})});const j=await res.json();if(j.reply)r={x:j.reply}}catch(e){}}
 if(!r)r=answer(q);setTimeout(()=>{say(r.x,'b',r.go);hist.push({role:'assistant',content:r.x})},AI_ENDPOINT?0:350)}
function chips(){const a=$('#ac');a.innerHTML='';['cq1','cq2','cq3','cq6','cq7','cq4','cq5'].forEach(k=>{const b=document.createElement('button');b.textContent=t(k);b.onclick=()=>ask(t(k));a.appendChild(b)})}
let aiOpen=false;
$('#aib').onclick=()=>{$('#ai').classList.toggle('on');if(!aiOpen){aiOpen=true;say(t('ai_hi'),'b')}if($('#ai').classList.contains('on'))$('#ain').focus()};
$('#aix').onclick=()=>$('#ai').classList.remove('on');
$('#aisb').onclick=()=>ask($('#ain').value);$('#ain').addEventListener('keydown',e=>{if(e.key=='Enter')ask($('#ain').value)});
