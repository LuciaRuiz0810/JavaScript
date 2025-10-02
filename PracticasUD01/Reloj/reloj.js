
/*Cambiar letra TEMÁTICA */
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
document.head.appendChild(fontLink)

function mostrarReloj() {

    /*Obtenemos por el id los elementos de la hora y la fecha */
    const horaReloj = document.querySelector('#hora');
    const fechaReloj = document.querySelector('#fecha');
    const borde = document.querySelectorAll(".reloj-contenedor");
    const contenedor = document.querySelector('.reloj-contenedor');

    /*Decoración TEMÁTICA */
    horaReloj.style.color = 'rgba(0, 0, 0, 1)';
    fechaReloj.style.color = 'rgba(0, 0, 0, 1)';
    fechaReloj.style.fontFamily = "'Creepster', cursive";
    horaReloj.style.fontFamily = "'Creepster', cursive";
    horaReloj.style.backgroundColor = 'rgb(255, 140, 0)';
    fechaReloj.style.backgroundColor = 'rgb(255, 140, 0)';
    contenedor.style.backgroundColor = 'rgb(255, 140, 0)';

    /*Creamos las variables DATE de la hora y la fecha */
    let hora_final = new Date();
    let fecha_final = new Date();
    let fecha_halloween = new Date('2025-10-31');

    let texto_hora_final = '';

    /*toggle aplica la clase si no la tiene y viceversa, el elemento se debe obtener con querySelectorAll IMPORTANTE*/
        borde.forEach(element => {
            element.classList.toggle("animar")
        });
    
        fecha_final = new Date();
        /*Sacamos la diferencia entre las fechas*/
        let diferencia_fechas = fecha_halloween - fecha_final;

        /*Si la cuenta atrás finaliza, se informará */
        if (diferencia_fechas <= 0) {
            horaReloj.innerHTML = "¡Feliz Halloween!";
            fechaReloj.innerHTML = "La cuenta atrás ha terminado";
            clearInterval(cuenta_atras);
            return;
        }
        /*Calculamos el tiempo que hay en la diferencia de fechas */
        let segundos = Math.floor(diferencia_fechas / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let dias = Math.floor(horas / 24);

        /*Calculamos los restos */
        let segundosResto = segundos % 60;
        let minutosResto = minutos % 60;
        let horasResto = horas % 24;

        /*padStart hace que la cadena tenga al menos 2 caracteres, sino lo rellena con 0 al inicio*/
        segundosResto = String(segundosResto).padStart(2, '0');
        minutosResto = String(minutosResto).padStart(2, '0');
        horasResto = String(horasResto).padStart(2, '0');

        /* RELOJ NORMAL */
        /*Obtenemos la hora con toLocaleTimeString("es-ES") y lo almacenamos en un String
        let texto_hora_final = hora_final.toLocaleTimeString("es-ES");
        */

        /* RELOJ TEMÁTICA */
        /*Cambiamos la hora final por la cuenta atrás dividida en dias, horas, minutos y segundos */
        texto_hora_final = dias + "d " + horasResto + ":" + minutosResto + ":" + segundosResto;
        horaReloj.innerHTML = texto_hora_final;

        /*Esto se repetirá cada 1ms */
   


    /*Obtenemos la fecha con toLocaleDateString("es-ES"), cambiamos el formato de la fecha  y lo almacenamos en un String*/
    let texto_fecha_final = fecha_final.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short"

    }).replace(/\b\w/g, dias => dias.toUpperCase()); /*Esto hará que se cambie la primera letra de cada palabra a mayus*/
    
    /* RELOJ NORMAL */
    // fechaReloj.innerHTML = texto_fecha_final;

     /* RELOJ TEMÁTICA*/
     fechaReloj.innerHTML = "<strong>Halloween</strong>";


    /*Otra opción sería usar SetInterval */
    /*Repite la función cada 1ms */
    setTimeout(mostrarReloj, 1000)
    

   


}






