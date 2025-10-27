class interfaz {

    //Valiadaciones según el error que se obtenga
    validarError(tipo_error) {

        const restante_p = document.querySelector('#restante');
        //Obtenemos el número de la cantidad
        const cantidad_restante = restante_p.textContent.replace('€', '').trim(); 
        const boton = document.querySelector('button[type="submit"]');
        const form = document.querySelector('.form-group');


        //Si es el error 1 y no existe otro error, saltará
        if (!document.querySelector('.text-center.alert.alert-danger') && tipo_error == 1) {
            const div_error = document.createElement('div');
            div_error.className = 'text-center alert alert-danger'
            div_error.textContent = 'Ambos campos son obligatorios'
            form.before(div_error);

            setInterval(() => {
                div_error.remove();
            }, 3000);
        }
         //Si es el error 2 y no existe otro error, saltará
        if (!document.querySelector('.text-center.alert.alert-danger') && tipo_error == 2) {
            const div_error = document.createElement('div');
            div_error.className = 'text-center alert alert-danger'
            div_error.textContent = 'Importe NO válido';
            form.before(div_error);
            setInterval(() => {
                div_error.remove();
            }, 3000);
        }
        //Si es el error 3 y no existe otro error ni validación, saltará el mensaje success
        if (!document.querySelector('.text-center.alert.alert-danger') && !document.querySelector('.text-center.alert.alert-success') && tipo_error == 3) {
            const div_valido = document.createElement('div');
            div_valido.className = 'text-center alert alert-success'
            div_valido.textContent = '!Gasto añadido correctamente!'
            form.before(div_valido);

            setInterval(() => {
                div_valido.remove();
            }, 3000);
        }

        //Si la cantidad_restante al darle al botón de agregar es menor que 0 y el error es el 4, se informará
        if (cantidad_restante < 0 && tipo_error==4) {
            const div_error = document.createElement('div');
            div_error.className = 'text-center alert alert-danger';
            div_error.textContent = 'PRESUPUESTO AGOTADO!!';
            form.before(div_error);
            
            setInterval(() => {
                div_error.remove();
            }, 3000);

            
       
        }

        //Si la cantidad es menor que 0 el botón se deshabilitará
         if (cantidad_restante < 0) {
            boton.disabled = true;
            boton.classList.add('opacity-50');
        } else {
            // Sino, se habilita (si el restante volvió a ser positivo al sumar un gasto
            boton.disabled = false;
            boton.classList.remove('opacity-50');
        }
    }
    
    //Función para añadir gastos
    añadirgasto(nuevo_gasto, nombre_gasto, id_gasto) { 
        //Creamos un nuevo li cada vez que se añada un gasto y se añaden sus propiedades
        const ul_listado = document.querySelector(".list-group");
        const nuevo_li = document.createElement('li');
        nuevo_li.className = 'list-group-item d-flex justify-content-between align-item-center'
        nuevo_li.id = id_gasto; 
        nuevo_li.textContent = nombre_gasto;

        //Creamos el div del gasto
        const nuevo_div = document.createElement('div');
        nuevo_div.className = 'd-flex justify-content-between align-items-center bg-primary  text-white';
        nuevo_div.textContent = nuevo_gasto + "€";
        
        ul_listado.appendChild(nuevo_li); 
        nuevo_li.appendChild(nuevo_div)

        //Creamos el botón borrar dentro del li
        const boton_borrar = document.createElement('button');
        boton_borrar.className = 'd-flex justify-content-between align-items-center bg-danger text-white'
        boton_borrar.textContent = 'Borrar X'
        nuevo_li.appendChild(boton_borrar);
    }


    //Función para restar el gasto y mostrarlo
    restargasto(nuevo_gasto) {
        let restante_p = document.querySelector('#restante');
        //Modificamos el contenido de restante
        let contenido_restante = parseInt(restante_p.textContent);
        restante_p.textContent = contenido_restante - nuevo_gasto;
        //Validamos la cantidad restante
        this.validarError(4); 
    }

    //Función para sumar el gasto y mostrarlo
    sumar_gasto(gasto_eliminado) {
        let restante_p = document.querySelector('#restante');
        //Modificamos el contenido de restante
        let contenido_restante = parseInt(restante_p.textContent);
        restante_p.textContent = contenido_restante + parseInt(gasto_eliminado, 10);
        //Validamos la cantidad restante
        this.validarError(4); 
    }

    //Cambiamos el color según el total de gastos que hayan
    cambiarColor(total_gastos) {
        
        let div_colores_Restante = document.querySelector('.restante');
        let presupuesto = document.querySelector('#total').textContent;
        presupuesto = parseInt(presupuesto, 10);
        const amarillo = (presupuesto * 50) / 100;
        const rojo = (presupuesto * 75) / 100;

        div_colores_Restante.className = 'restante alert alert-success'; 
        
        if (total_gastos > amarillo) {
            div_colores_Restante.className = 'restante alert alert-warning'
        }

        if (total_gastos > rojo) {
            div_colores_Restante.className = 'restante alert alert-danger'
        }
    }
}