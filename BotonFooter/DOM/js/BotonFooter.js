// @ts-nocheck
document.addEventListener("DOMContentLoaded", function(){

const boton_descubre =  document.querySelector(".btn-flotante");
boton_descubre.addEventListener("click", cambiar);
const footer_informacion = document.querySelector(".footer");

/*Función que cambiará el estilo y contenido del botón al contrario cuando el usuario le de click */
function cambiar(){

   if(boton_descubre.innerHTML == "X Cerrar"){
      boton_descubre.style.background ='#ffffffff';
      boton_descubre.style.color ='#000000ff';
      boton_descubre.textContent = "Descubre mas...";
      
      /*Cambiamos "bottom para que vuelva a su estado inicial" */
      footer_informacion.style.bottom = "-100%";

   }else{
       boton_descubre.style.background ='#ff0404ff';
       boton_descubre.textContent = "X Cerrar";
       boton_descubre.style.color ='#ffffffff';
       /*Cambiamos "bottom para que aparezca" */
       footer_informacion.style.bottom = "0%";
   }
}

});


