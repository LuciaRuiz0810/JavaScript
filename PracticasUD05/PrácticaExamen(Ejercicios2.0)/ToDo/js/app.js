import { validacion } from "./funciones.js";

let array_tareas;

window.addEventListener('load', () => {

    //Esto recupera las tareas de localStorage para añadirlos al carrito
    //Si no contiene nada, lo mantiene como array
    array_tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    if (!Array.isArray(array_tareas)) {
        array_tareas = [];
    }

    /*Si fuera objeto
    let tareas = JSON.parse(localStorage.getItem('Tareas')) || {};

    if (typeof tareas !== 'object' || tareas === null || Array.isArray(tareas)) {
      tareas = {}; // si no es un objeto válido
        }
    console.log(tareas);

    //Agregar/sobreescribir una nueva tarea (objeto)
        tareas['t3'] = "Aprender React";
        //obj
        tareas[id] = nuevaTarea;
    //eliminar
     delete tareas[id];
    //Actualizar
       localStorage.setItem('Tareas', JSON.stringify(tareas));
    */

    pintar_tareas()
    let input_tarea = document.querySelector('#tarea')
    let texto = ''

    //FORMULARIO SUBMIT CON INPUT
    const formulario = document.querySelector('#formulario');


    formulario.addEventListener('submit', (e) => {

        e.preventDefault()
        let valor = input_tarea.value.trim()

        //Devuelve otro array pero aplicando la condición a los elementos
        const array_comparativo = array_tareas.map(tarea => tarea.toLowerCase());
        let contenido_min = valor.toLowerCase();


        if (valor.trim() == '') {
            texto = 'NO HAS PUESTO NINGUNA TAREA...'
            validacion(texto)
        }
        else if (valor.trim().length > 30) {
            texto = 'LA TAREA ES DEMASIADO LARGA'
            validacion(texto)
        }
        else if (array_comparativo.includes(contenido_min.trim())) {
            texto = `${valor.trim()} YA EXISTE`
            validacion(texto)

        } else {
            input_tarea.value = ''
            array_tareas.push(valor.trim())
            pintar_tareas()

            const json = JSON.stringify(array_tareas)
            localStorage.setItem('Tareas', json);
        }
    })


    function pintar_tareas() {
 
        const lista_tareas = document.querySelector('#lista-tareas')
        lista_tareas.innerHTML = ''

        array_tareas.forEach(tarea => {
            lista_tareas.innerHTML += `<ul><li>${tarea} <p class="borrar-tarea">X</p></li>`
        });

        lista_tareas.innerHTML += '</ul>'

        let boton_x = document.querySelectorAll('.borrar-tarea')

        boton_x.forEach(boton => {

            boton.addEventListener('click', (e) => {
                e.preventDefault()
                let tarea = e.target.closest('li')
                let contenido = tarea.textContent;

                //Recoge solo el contenido del li (quita la X)
                contenido = contenido.split(" ")[0];
                array_tareas = array_tareas.filter(tareas => tareas !== contenido);
                tarea.remove()
                const json = JSON.stringify(array_tareas)
                localStorage.setItem('Tareas', json);
            })
        });
    }
})