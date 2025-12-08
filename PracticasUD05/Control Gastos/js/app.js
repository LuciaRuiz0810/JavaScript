window.addEventListener('load', function () {

    //Validación
    let presupuesto_valido = true;
    let presupuesto = '';
    let contenido = false; 
    let cantidad_valida = false; 


    let interfaz_nueva = new interfaz();
    
    do {
        presupuesto = prompt('¿Cuál es tu presupuesto?');
        //Si no es un número salta la alerta
        if (isNaN(presupuesto) || Number(presupuesto) <= 0 || presupuesto.trim() === '') { // Validación mejorada
            alert('El valor debe ser númerico y mayor que cero.');
            presupuesto_valido = false;


        } else {
            //Sino, pasa a true y le quitamos espacios
            presupuesto_valido = true;
            presupuesto = presupuesto.trim(); // Asignación de trim() a la variable
        }
    } while (!presupuesto_valido)


    //Seleccion de elementos
    const presupuesto_p = document.querySelector('#total');
    const restante_p = document.querySelector('#restante');
    const gasto_input = document.querySelector('#gasto');
    const cantidad_input = document.querySelector('#cantidad');
    const boton = document.querySelector('button[type="submit"]')


    //Asignación inicial
    presupuesto_p.textContent = presupuesto;
    restante_p.textContent = presupuesto;
    
    //Creamos un nuevo presupuesto
    let presupuesto1 = new presupuestoClase(Number(presupuesto));

    let valor_gasto = "";
    let valor_cantidad = "";

    //Obtenemos los valores de gasto y cantidad
    gasto_input.addEventListener('input', (e) => {
        valor_gasto = e.target.value;

    })

    cantidad_input.addEventListener('input', (e) => {
        valor_cantidad = e.target.value;

    })
    
    //Botón de agregar
    boton.addEventListener('click', (e) => {
        e.preventDefault(); // Detenemos el envío del formulario

        // Variables limpias y numéricas para la validación
        const nombre_gasto = valor_gasto.trim();
        const cantidad_gasto= Number(valor_cantidad);
        
        // Reset de flags para la validación actual
        contenido = true;
        cantidad_valida = true;

        //Si todos los campos están vacios salta el error 1
        if (valor_cantidad === "" || nombre_gasto === "") {
            contenido = false;
            interfaz_nueva.validarError(1);
            return; 
        } 
        
        //Si la cantidad no es un número salta el error 2
        if (isNaN(cantidad_gasto) || cantidad_gasto <= 0) { 
            cantidad_valida = false;
            interfaz_nueva.validarError(2);
            return; 
        }


        //si la cantidad es correcta Y hay contenido
        if (cantidad_valida && contenido) {

            //Creamos el nuevo gasto con nombre, cantidad e id
            const nuevoGasto = {
                nombre: nombre_gasto,
                cantidad: cantidad_gasto,
                id: Date.now() 
            };
            
            //Les pasamos el objeto gasto al array
            presupuesto1.gasto_añadir_array(nuevoGasto);

            //Añadimos el gasto a la lista
            interfaz_nueva.añadirgasto(nuevoGasto.cantidad, nuevoGasto.nombre, nuevoGasto.id);

            //Restamos el nuevo gasto de la cantidad de restante
            interfaz_nueva.restargasto(nuevoGasto.cantidad);
            
            //Calculamos el total para saber que color corresponde a restante
            let gastos_totales = presupuesto1.calcularGastosTotales(); 

            //Función para cambiar el color según los gastos
            interfaz_nueva.cambiarColor(gastos_totales);
            
            //Mensaje de validación de éxito al añadir el gasto
            interfaz_nueva.validarError(3);
            
            //Reiniciamos el formulario 
            gasto_input.value = '';
            cantidad_input.value = '';
            valor_gasto = ''; 
            valor_cantidad = ''; 
        }


    });


    //Seleccionamos el listado que siempre existe en el DOM
    const listado = document.querySelector('#gastos')

    //Evento click
    listado.addEventListener('click', function (e) {
        e.preventDefault();

        //Seleccionamos el elemento más cercano con la clase .bg-danger, (el botón)
        const botonEliminar = e.target.closest('.bg-danger');

        if (botonEliminar) {
            //Obtenemos el li más cercano
            const li_a_eliminar = botonEliminar.closest('li');
            //Obtenemos su id
            const id_gasto = li_a_eliminar.id;

            //Obtenemos el div de dentro del li que contiene la clase .bg-primary
            const div_monto_gasto = li_a_eliminar.querySelector('.bg-primary');

            //Ese contenido lo pasamos a número y le quitamos € y los espacios
            const monto_a_devolver = parseFloat(div_monto_gasto.textContent.replace('€', '').trim());
            
            //Eliminamos el gasto del array pasandole el ID
            presupuesto1.eliminarGasto(id_gasto);

            //Eliminamos el li del DOM
            li_a_eliminar.remove();

            //Le pasamos el monto que se ha eliminado y por lo tanto se debe devolver a restante
            interfaz_nueva.sumar_gasto(monto_a_devolver);
            
            // Recalculamos el color del presupuesto restante
            interfaz_nueva.cambiarColor(presupuesto1.calcularGastosTotales());
        }
    });
});