/*=====================================================
BUENOS AIRES RP
PANEL RRHH
app.js
=====================================================*/

const form=document.getElementById("loginForm");

const mensaje=document.getElementById("mensaje");

const usuario=document.getElementById("usuario");

const password=document.getElementById("password");

function mostrarMensaje(texto,color){

mensaje.innerHTML=texto;

mensaje.style.color=color;

}

function togglePassword(){

const input=document.getElementById("password");

const icon=document.querySelector(".show-password i");

if(input.type==="password"){

input.type="text";

icon.className="fa-solid fa-eye-slash";

}else{

input.type="password";

icon.className="fa-solid fa-eye";

}

}

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const btn=document.querySelector(".login-button");

btn.disabled=true;

btn.innerHTML="<i class='fa-solid fa-spinner fa-spin'></i> Iniciando sesión...";

mostrarMensaje("", "#ffffff");

try{

const respuesta=await fetch("/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

usuario:usuario.value,

password:password.value

})

});

const datos=await respuesta.json();

if(datos.ok){

mostrarMensaje(

"<i class='fa-solid fa-circle-check'></i> Acceso autorizado.",

"#00ff88"

);

setTimeout(()=>{

location.href="/panel";

},900);

}else{

mostrarMensaje(

"<i class='fa-solid fa-circle-xmark'></i> "+datos.error,

"#ff5555"

);

btn.disabled=false;

btn.innerHTML="<i class='fa-solid fa-right-to-bracket'></i> Ingresar al Panel";

}

}catch(error){

mostrarMensaje(

"<i class='fa-solid fa-triangle-exclamation'></i> Error de conexión con el servidor.",

"#ff5555"

);

btn.disabled=false;

btn.innerHTML="<i class='fa-solid fa-right-to-bracket'></i> Ingresar al Panel";

}

});

}

window.addEventListener("load",()=>{

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition=".4s";

document.body.style.opacity="1";

},100);

});

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

if(form){

form.requestSubmit();

}

}

});

document.addEventListener("mousemove",(e)=>{

const circles=document.querySelectorAll(".background-circle");

circles.forEach((circle,index)=>{

const speed=(index+1)*0.008;

const x=(window.innerWidth/2-e.clientX)*speed;

const y=(window.innerHeight/2-e.clientY)*speed;

circle.style.transform=`translate(${x}px,${y}px)`;

});

});
