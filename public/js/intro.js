// Pantalla de introducción (video de entrada)
(function(){var sp=document.getElementById("sp"),v=document.getElementById("spv"),d=0;
function end(){if(d)return;d=1;sp.classList.add("off");document.body.classList.remove("sp");setTimeout(function(){sp.remove()},900)}
v.addEventListener("ended",end);v.addEventListener("error",end);
v.play().catch(function(){});
["pointerdown","keydown","touchstart"].forEach(function(e){addEventListener(e,function(){v.muted=false;v.play().catch(function(){})},{once:true,passive:true})});
setTimeout(function(){if(!d&&v.paused&&v.currentTime==0)end()},4000);
setTimeout(end,25000)})()
