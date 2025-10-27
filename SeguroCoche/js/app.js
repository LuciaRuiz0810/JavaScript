//importamos la clase Poliza del archivo appClases.js
import { Poliza } from "./appClases.js";

window.addEventListener('load', function () {

    //Selección de elementos
    const select_año = document.querySelector('#year');
    const select_gama = document.querySelector('#gama');
    const div_resultado = document.querySelector('#resultado');
    const enviar_boton = document.querySelector('button[type="submit"]');
    const select_seguro = document.querySelectorAll('input[name="tipo"]');


    //Obtenemos el año actual
    let hoy = new Date();
    const año_actual = hoy.getFullYear();
    let array_años = [];

    //Creamos la lista de los años 
    for (let x = 0; x < 20; x++) {
        let añadir_año = año_actual - x;
        array_años.push(añadir_año);
    }

    //Recorremos el array y en cada año añadimos otro option al select
    array_años.forEach(año => {
        const nueva_option = document.createElement('option');
        nueva_option.textContent = año;
        select_año.appendChild(nueva_option);

    });


    //Función para crear la alerta
    function alerta() {
        const div_error = document.createElement('div');
        div_error.className = "mt-10 error";
        div_error.textContent = "Todos los campos son OBLIGATORIOS";
        div_resultado.after(div_error);
    }


    //Función para borrar la alerta
    function borrar_alerta() {
        const error = document.querySelector('.error');
        error.remove();
    }

    //Función para saber que gama se ha escogido a través del valor
    function sacar_gama(valor_gama) {
        if (valor_gama == '1') {
            return "Gama baja"
        }
        if (valor_gama == '2') {
            return "Gama media"
        }
        if (valor_gama == '3') {
            return "Gama alta"
        }
    }


    //Evento para enviar
    enviar_boton.addEventListener('click', (e) => {
        e.preventDefault();

        //Leer valores
        const valor_gama_actual = select_gama.value;
        const contenido_año_actual = select_año.value;

        //Comprobar cual está marcado y guardamos su valor
        let contenido_seguro_actual = '';
        //Recorremos los radio y se guardará el valor del que esté marcado
        select_seguro.forEach(radio => {
            if (radio.checked) {
                contenido_seguro_actual = radio.value;
            }
        });

        //Si los campos están vacios, saltará la alerta durante 3s
        if (valor_gama_actual === "" || contenido_año_actual === "" || contenido_seguro_actual === "") {
            //Si el documento no contiene la clase error, y las cadenas están vacias saltará la alerta
            //Evita errores duplicados
            if (!document.querySelector('.error')) {
                alerta();
                setTimeout(() => {
                    borrar_alerta();
                }, 3000);
            }
            return;
        }

        //Sacamos el contenido de gama
        const contenido_gama_actual = sacar_gama(valor_gama_actual); 


        //Creamos la nueva poliza
        const nueva_poliza = new Poliza(contenido_gama_actual, contenido_año_actual, contenido_seguro_actual, 300);
        //Calculamos el importe
        nueva_poliza.calcularSeguro();
        //Mostramos la información
        nueva_poliza.mostrarInfoHTML();
        
        
    });










});