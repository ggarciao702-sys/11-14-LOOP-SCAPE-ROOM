// Acceso al panel de datos: al tocar el logo del inicio se abre una ventana que pide la contraseña
// y, si es correcta, muestra las tablas reales de la base de datos (es la página admin.html).
(function(){
const sello=document.getElementById('sello'),pnl=document.getElementById('pnl'),fr=document.getElementById('pnl-f');
const abrir=()=>{fr.src='admin.html?'+Date.now();pnl.hidden=false;document.body.style.overflow='hidden'};
const cerrar=()=>{pnl.hidden=true;fr.removeAttribute('src');document.body.style.overflow=''};
sello.addEventListener('click',abrir);
sello.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();abrir()}});
document.getElementById('pnl-x').addEventListener('click',cerrar);
pnl.addEventListener('click',e=>{if(e.target===pnl)cerrar()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!pnl.hidden)cerrar()});
})();
