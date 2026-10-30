// Video principal: se reproduce solo, en bucle y sin controles
// video: se reproduce solo, en bucle, sin controles y sin forma de pausarlo
const vd=$('.vid video');vd.muted=true;vd.controls=false;vd.loop=true;const pl=()=>{vd.muted=true;vd.play().catch(()=>{})};
vd.addEventListener('pause',()=>setTimeout(pl,30));vd.addEventListener('ended',()=>{vd.currentTime=0;pl()});vd.addEventListener('timeupdate',()=>{if(vd.duration&&vd.currentTime>=vd.duration-.15){vd.currentTime=0;pl()}});vd.addEventListener('ratechange',()=>{vd.playbackRate=1});
document.addEventListener('visibilitychange',pl);setInterval(()=>{if(vd.paused&&!document.hidden)pl()},1000);
['pointerdown','touchstart','keydown','scroll'].forEach(ev=>addEventListener(ev,pl,{once:true,passive:true}));
try{['pause','stop','seekbackward','seekforward','seekto','previoustrack','nexttrack'].forEach(a=>{try{navigator.mediaSession.setActionHandler(a,pl)}catch(_){}})}catch(_){}
pl();
