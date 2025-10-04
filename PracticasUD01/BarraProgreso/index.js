// @ts-nocheck

/*Seleccionamos los elementos e inicializamos un contador */
let color_barra = document.querySelector('.barraFront');
let contador_porcentaje = document.querySelector('.contador');
let contador_barra = 1;

/*Función que aumenta el progreso */
function barra_progreso(){
    
    /*El ancho del color y el % irá a aumentando según el contador */
     color_barra.style.width = contador_barra + '%';
     contador_porcentaje.innerHTML = contador_barra + '%';
     /*Si el contador llega a 100 detiene la función */
     if(contador_barra == 100){
        return;
    }
     contador_barra++;
}
/*La función se ejecutará cada 60ms */
setInterval(barra_progreso, 60);