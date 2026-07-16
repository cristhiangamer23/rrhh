/*=================================================
BUENOS AIRES RP
PANEL RRHH
panel.js
=================================================*/

const modal=document.getElementById("modalPostulacion");

const cerrarModal=document.getElementById("cerrarModal");

const tabla=document.getElementById("tablaPostulaciones");

const buscar=document.getElementById("buscarPostulacion");

const filtro=document.getElementById("filtroEstado");

const actividad=document.getElementById("actividad");

const actualizar=document.getElementById("actualizar");

/*======================================
ABRIR MODAL
======================================*/

document.addEventListener("click",(e)=>{

if(e.target.closest(".btn-ver")){

modal.style.display="flex";

}

});

/*======================================
CERRAR MODAL
======================================*/

cerrarModal.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

}

/*======================================
BUSCADOR
======================================*/

buscar.addEventListener("keyup",()=>{

const texto=buscar.value.toLowerCase();

const filas=tabla.querySelectorAll("tr");

filas.forEach(fila=>{

const contenido=fila.innerText.toLowerCase();

fila.style.display=

contenido.includes(texto)

?

""

:

"none";

});

});

/*======================================
FILTRO
======================================*/

filtro.addEventListener("change",()=>{

const valor=filtro.value;

const filas=tabla.querySelectorAll("tr");

filas.forEach(fila=>{

if(valor===""){

fila.style.display="";

return;

}

const estado=fila.querySelector(".estado");

if(!estado)return;

fila.style.display=

estado.classList.contains(valor)

?

""

:

"none";

});

});

/*======================================
ESTADÍSTICAS
======================================*/

function actualizarEstadisticas(){

const filas=tabla.querySelectorAll("tr");

document.getElementById("totalPostulaciones").innerHTML=filas.length;

document.getElementById("revision").innerHTML=document.querySelectorAll(".revision").length;

document.getElementById("aceptadas").innerHTML=document.querySelectorAll(".aceptado").length;

document.getElementById("rechazadas").innerHTML=document.querySelectorAll(".rechazado").length;

}

actualizarEstadisticas();

/*======================================
BOTÓN ACTUALIZAR
======================================*/

actualizar.onclick=()=>{

location.reload();

}

/*======================================
BOTONES DEL MODAL
======================================*/

document.querySelectorAll(".btn-aceptar").forEach(btn=>{

btn.onclick=()=>{

alert("La postulación fue aceptada.");

}

});

document.querySelectorAll(".btn-rechazar").forEach(btn=>{

btn.onclick=()=>{

alert("La postulación fue rechazada.");

}

});

document.querySelectorAll(".btn-pendiente").forEach(btn=>{

btn.onclick=()=>{

alert("La postulación quedó pendiente.");

}

});

document.querySelectorAll(".btn-cancelar").forEach(btn=>{

btn.onclick=()=>{

if(confirm("¿Cancelar esta postulación?")){

modal.style.display="none";

}

}

});

/*======================================
TIMELINE
======================================*/

function agregarActividad(texto){

const item=document.createElement("div");

item.className="timeline-item";

item.innerHTML=`

<div class="timeline-icon">

<i class="fa-solid fa-clock"></i>

</div>

<div class="timeline-content">

<h3>${texto}</h3>

<span>${new Date().toLocaleString()}</span>

</div>

`;

actividad.prepend(item);

}

/*======================================
API
======================================*/

async function cargarPostulaciones(){

try{

const respuesta=await fetch("/api/postulaciones");

if(!respuesta.ok)return;

const datos=await respuesta.json();

console.log(datos);

}catch(error){

console.log("API aún no conectada.");

}

}

cargarPostulaciones();

/*======================================
LOGOUT
======================================*/

document.getElementById("logout").onclick=async()=>{

const salir=confirm("¿Cerrar sesión?");

if(!salir)return;

try{

await fetch("/logout",{

method:"POST"

});

}catch{}

location.href="/";

}

/*======================================
ANIMACIÓN
======================================*/

document.querySelectorAll(".card").forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(25px)";

setTimeout(()=>{

card.style.transition=".5s";

card.style.opacity="1";

card.style.transform="translateY(0)";

},index*120);

});

console.log("Buenos Aires RP | Panel RRHH iniciado");
