let array_lista_tareas;

window.addEventListener('load', function () {

    //Esto recupera las tareas de localStorage para añadirlos al carrito
    //Si no contiene nada, lo mantiene como array
    array_lista_tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    if (!Array.isArray(array_lista_tareas)) {
        array_lista_tareas = [];
    }

    
    //Elementos seleccionados
    const textArea = document.querySelector('#tarea');
    const boton_submit = document.querySelector('input[type="submit"]');
    const lista_tareas = document.querySelector('#lista-tareas');

    const body = document.querySelector('body');
    const div_error = document.createElement('div');
    div_error.className = 'error'
      
    let contenido = "";

    //Mostrarmos las tareas al inicio, si el array está vacío, no mostrará nada
    mostrarTareas();

    //Evento para mostrar las tareas
    boton_submit.addEventListener('click', añadir_tareas);

    function añadir_tareas(e) {

        e.preventDefault();
        //Recogemos el contenido del textArea
        contenido = textArea.value.trim(); // 

        //generamos el array de comparación en minúsculas a partir del array original
        const array_comparativo = array_lista_tareas.map(tarea => tarea.toLowerCase());
        
        //almacenamos el contenido en mínusculas para poder compararlo
        let contenido_min = contenido.toLowerCase();
        
        //Si el contenido es una cadena vacía
        if (contenido == "") {
            errores(1);
        
        //Si es mas largo que 30 caracteres
        } else if (contenido.length > 30) {
            errores(2)
        }  
        //Si el array comparativo ya contiene ese contenido
        else if (array_comparativo.includes(contenido_min)) { 
            errores(3);

        } else {
            //Reseteamos el textArea
            textArea.value = '';
            
            //Añadimos la nueva tarea
            array_lista_tareas.push(contenido); 
            mostrarTareas();
            
            const json = JSON.stringify(array_lista_tareas)
            localStorage.setItem('Tareas', json);
            console.log(window.localStorage)
        }
    }

    function errores(tipo_error) {
        if (tipo_error == 1) {
            div_error.textContent = 'NO HAS PUESTO NINGUNA TAREA...'
        }
        if (tipo_error == 2) {
            div_error.textContent = 'LA TAREA ES DEMASIADO LARGA...'
        }
        if (tipo_error == 3) {
            div_error.textContent = `"${contenido}" YA EXISTE...`
        }

        body.appendChild(div_error);

        setTimeout(() => {
            div_error.remove();
        }, 3000);

    }


    lista_tareas.addEventListener('click', (e) => {

        //Seleccionamos el elemento "borrar-tarea"
        const eliminar = e.target.closest('.borrar-tarea')
        //Si existe, eliminamos el li más cercano
        if (eliminar) {
            const li_eliminar = eliminar.closest('li')
            
           
            //eliminamos el botón para que el textContent del li sea solo la tarea
            eliminar.remove(); 

            //Sacamos la tarea (ya sin la 'X' porque la eliminamos antes)
            const contenido_li = li_eliminar.textContent.trim(); 

            //Eliminamos el li del DOM
            li_eliminar.remove();

            //Filtramos para generar el nuevo array sin esa tarea
            array_lista_tareas = array_lista_tareas.filter(tareas => tareas !== contenido_li);

            console.log(array_lista_tareas);

            mostrarTareas();

            const json = JSON.stringify(array_lista_tareas)
            localStorage.setItem('Tareas', json);
            console.log(window.localStorage)

        }

    })


    function mostrarTareas() {

        //Antes de mostrar la lista, limpiamos
        lista_tareas.innerHTML = '';

        //Si el array tiene valores
        if (array_lista_tareas.length > 0) {

            //Crea el elemento ul siempre que vuelve a pintar la lista
            const ul = document.createElement('ul');

            //Recorre el array
            array_lista_tareas.forEach(tarea => {
                //A cada tarea le añade un li, el nombre de la tarea y el div X para poder borrarla
                const nuevo_li = document.createElement('li');
                nuevo_li.textContent = tarea;

                const boton_borrar = document.createElement('div');
                boton_borrar.className = 'borrar-tarea margin-left-10';
                boton_borrar.textContent = 'X';
                //Añadimos el boton al li y el nuevo li al ul
                nuevo_li.appendChild(boton_borrar);
                ul.appendChild(nuevo_li);
            });

            //Añadimos el ul a la lista
            lista_tareas.appendChild(ul);
        }
    }


});