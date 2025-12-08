// @ts-nocheck
window.addEventListener('load', function () {

    function alertas(numero) {
        //Tailwind sintaxis --> class="bg-red-600 text-white p-2 text-center"
        const div_email = document.querySelector('.flex.flex-col.space-y-2');
        const div_cc = document.querySelector('.flex.flex-col.space-y-2:nth-child(2)')
        const div_asunto = document.querySelector('.flex.flex-col.space-y-2:nth-child(3)');
        const div_mensaje = document.querySelector('.flex.flex-col.space-y-2:nth-child(4)');


        if (numero == 1) {
            //Si no existe la clase dentro de div la creamos para mostrar la alerta
            if (!div_email.querySelector('.alerta-email')) {
                const alerta = document.createElement('div');
                alerta.className = 'bg-red-600 text-white p-2 text-center alerta-email';
                alerta.textContent = 'El EMAIL NO es válido!';
                //Añadimos el div alerta como hijo del div email
                div_email.appendChild(alerta);
            }
        }

        if (numero == 2) {


            if (!div_asunto.querySelector('.alerta-asunto')) {
                const alerta = document.createElement('div');
                alerta.className = 'bg-red-600 text-white p-2 text-center alerta-asunto';
                alerta.textContent = 'El ASUNTO NO es válido!';
                div_asunto.appendChild(alerta);
            }
        }

        if (numero == 3) {

            if (!div_mensaje.querySelector('.alerta-mensaje')) {
                const alerta = document.createElement('div');
                alerta.className = 'bg-red-600 text-white p-2 text-center alerta-mensaje';
                alerta.textContent = 'El MENSAJE NO es válido!';
                div_mensaje.appendChild(alerta);
            }

        }

        if (numero == 4) {

            if (!div_cc.querySelector('.alerta-cc')) {
                const alerta = document.createElement('div');
                alerta.className = 'bg-red-600 text-white p-2 text-center alerta-cc';
                alerta.textContent = 'El CC NO es válido!';
                div_cc.appendChild(alerta);
            }

        }

    }

    function ocultarAlertas(numero) {
        if (numero === 1) {
            const alerta = document.querySelector('.alerta-email');
            if (alerta) {
                alerta.remove(); //Eliminamos la alerta del email
            }
        }
        if (numero === 2) {
            const alerta = document.querySelector('.alerta-asunto');
            if (alerta) {
                alerta.remove(); //Eliminamos la alerta del asunto
            }
        }
        if (numero === 3) {
            const alerta = document.querySelector('.alerta-mensaje');
            if (alerta) {
                alerta.remove(); //Eliminamos la alerta del mensaje
            }
        }
        if (numero === 4) {
            const alerta = document.querySelector('.alerta-cc');
            if (alerta) {
                alerta.remove(); //Eliminamos la alerta del cc
            }
        }

    }

    //Creamos el objeto que iremos rellenando dinámicamente conforme vayan pasando las validaciones
    let formulario_info = {
        email: '',
        asunto: '',
        mensaje: '',
        cc: ''
    };


    let resultado_email = false;
    let resultado_asunto = false;
    let resultado_mensaje = false;
    //Al ser opcional, se incializa como true
    let resultado_cc = true;


    //Recogemos lo que el usuario introduce en el input
    let contenido_email = '';
    //Hacemos la comprobación dentro del evento, sino saldría al recargar la página la alerta directamente
    const email = document.querySelector('#email');


    //blur hace la validación cuando el usuario está fuera del input (ha terminado de escribir)
    email.addEventListener('blur', (e) => {
        //Recogemos el valor del input
        contenido_email = e.target.value;

        //Si el contenido al quitarle los espacios es una cadena vacia, saltará la alerta ya que es obligatorio
        if (contenido_email.trim() == '') {
            formulario_info.email = '';
            resultado_email = false;
            alertas(1);

        } else {
            //Si no es una cadena vacía se comprueba que cumpla el formato de email
            const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            resultado_email = regex.test(contenido_email);

            //Si no lo cumple salta la alerta y no guardará nada en el objeto
            if (!resultado_email) {
                formulario_info.email = '';
                resultado_email = false;
                alertas(1);


            } else {
                //Si lo cumple, cambia a true, se oculta la alerta y guarda el valor en el objeto
                resultado_email = true;
                formulario_info.email = contenido_email;
                ocultarAlertas(1);
            }
        }
        //Ejecutamos el validar form para saber si se puede habilitar el botón o no
        validar_form();

    });

    //AMPLIACIÓN

    //Seleccionamos el formulario
    const form = document.querySelector('#formulario');
    //Seleccionamos el padre del div asunto
    const div_asunto = document.querySelector('#asunto').parentElement;
    //Creamos el nuevo div con las mismas caracteristicas que los anteriores
    const nuevo_div = document.createElement('div')
    //Añadimos las clase del div
    nuevo_div.className = 'flex flex-col space-y-2';
    //Añadimos el contenido de dentro del div
    nuevo_div.innerHTML = ` <label for="cc" class="font-regular font-medium">CC:</label>
                    <input id="cc" type="text" name="cc" placeholder="Destino copia, opcional" class="border border-gray-300 px-3 py-2 rounded-lg"/>`

    //En el formulario insertamos el nuevo div antes que el div asunto
    form.insertBefore(nuevo_div, div_asunto);

    let contenido_cc = '';
    //Seleccionamos el elemento cc previamente definido
    const cc = document.querySelector('#cc');
    //Creamos el evento con blur
    cc.addEventListener('blur', (e) => {
        contenido_cc = e.target.value;

        //Si no es una cadena vacía hacemos la comprobación
        if (contenido_cc.trim() !== '') {

            const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            resultado_cc = regex.test(contenido_cc);
            //Si es false, salta la alerta
            if (!resultado_cc) {
                //Resultado pasa a ser false
                resultado_cc = false;
                formulario_info.cc = '';
                alertas(4)

            } else {
                //Si lo cumple, vuelve a true, se oculta la alerta y guarda el contenido en el objeto
                resultado_cc = true;
                formulario_info.cc = contenido_cc;
                ocultarAlertas(4);

            }
        }
        //Validamos el formulario según el contenido de cc ya que no es obligatorio
        validar_form(contenido_cc);
    })

    //Repetimos las comprobaciones pero con asunto y con mensaje
    let contenido_asunto = '';
    const asunto = document.querySelector('#asunto');

    //Input para que nada más empiece a escribir el usuario se quite el error, solo saltará si lo deja vacío
    asunto.addEventListener('input', (e) => {
        contenido_asunto = e.target.value
        resultado_asunto = false;

        if (contenido_asunto.trim() != '') {
            resultado_asunto = true;
            formulario_info.asunto = contenido_asunto;
            ocultarAlertas(2);

        } else {
            resultado_asunto = false;
            formulario_info.asunto = '';
            alertas(2);
        }
        validar_form();
    });



    const mensaje = document.querySelector('#mensaje');
    let contenido_mensaje = '';

    mensaje.addEventListener('input', (e) => {
        contenido_mensaje = e.target.value;
        resultado_mensaje = false;

        if (contenido_mensaje.trim() != '') {
            resultado_mensaje = true;
            formulario_info.mensaje = contenido_mensaje;
            ocultarAlertas(3)


        } else {
            resultado_mensaje = false;
            formulario_info.mensaje = '';
            alertas(3);
        }

        validar_form();
    });


    //Función para validar el formulario
    function validar_form(contenido_cc) {

        //Si el contenido del cc contiene un texto, también se incluye en el filtro, si alguno de ellos no lo pasa, enviar se deshabilita
        if (contenido_cc != '') {
            if (resultado_email && resultado_asunto && resultado_mensaje && resultado_cc) {
                //Habilitamos el botón
                enviar_boton.disabled = false;
                //Eliminamos la opacidad
                enviar_boton.classList.remove('opacity-50');

            } else {
                //Si alguno es false, el botón permanecerá deshabilitado
                enviar_boton.disabled = true;
                enviar_boton.classList.add('opacity-50');
            }

        } else {
            //Si cc no contiene nada, al no ser obligatorio, solo deberán pasar el filtro los campos obligatorios
            if (resultado_email && resultado_asunto && resultado_mensaje) {

                //Habilitamos el botón
                enviar_boton.disabled = false;
                //Eliminamos la opacidad
                enviar_boton.classList.remove('opacity-50');

            } else {
                //Si alguno es false, el botón permanecerá deshabilitado
                enviar_boton.disabled = true;
                enviar_boton.classList.add('opacity-50');
            }
        }
    }


    //Evento que escucha el clic en el botón enviar
    const enviar_boton = document.querySelector('button[type="submit"]');
    enviar_boton.addEventListener('click', enviar);


    //Función para enviar el formulario
    function enviar(e) {
        e.preventDefault();

        //Seleccionamos el elemento spinner y le quitamos el hidden para hacerlo visible
        const spinner = document.querySelector('#spinner');
        spinner.classList.remove('hidden');
        //Hacemos que se muestre despues de enviar
        spinner.innerHTML = `<div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>`;


        //Después de 3s, lo volvemos a ocultar y mostramos que el mensaje ha sido enviado
        setTimeout(() => {
            spinner.classList.add('hidden');
            //Seleccionamos el formulario y al final añadimos un div indicando que se ha enviado correctamente
            const form = document.querySelector('#formulario');
            const mensaje_enviado = document.createElement('div');
            mensaje_enviado.className = "bg-green-500 text-white p-2 text-center";
            mensaje_enviado.textContent = 'El mensaje ha sido enviado';
            form.appendChild(mensaje_enviado);

            //Después de otros 3s el mensaje se eliminará y el formulario volverá a su estado inicial
            setTimeout(() => {
                mensaje_enviado.remove();
                form.reset();

            }, 3000);
        }, 3000);

        //Comprobación de que el objeto ha recogido la información bien
        console.log(formulario_info);
        resetear();
    };

    //Seleccionamos el botón de resetear
    const btnReset = form.querySelector('button[type="reset"]');

    //Cuando se haga clic, se limpiarán las alertas y el objeto, de esta manera el usuario empezará de 0
    btnReset.addEventListener('click', resetear);

    function resetear() {

        ocultarAlertas(1);
        ocultarAlertas(2);
        ocultarAlertas(3);
        ocultarAlertas(4);

        formulario_info = {
            email: '',
            asunto: '',
            mensaje: '',
            cc: ''
        };

        // Reiniciar estados de validación
        resultado_email = false;
        resultado_asunto = false;
        resultado_mensaje = false;
        resultado_cc = true; // porque es opcional

        // Deshabilitar botón
        enviar_boton.disabled = true;
        enviar_boton.classList.add('opacity-50');


    }

});