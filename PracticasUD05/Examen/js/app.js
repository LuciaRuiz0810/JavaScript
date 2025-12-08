//código JS examen

import { validacion } from "./funciones.js";
import { obtener_datos } from "./API.js";

window.addEventListener('DOMContentLoaded', async () => {

    //Selección de elementos 
    const crear_orden = document.querySelector('#guardar-cliente')
    let mesa = document.querySelector('#mesa')
    let hora = document.querySelector('#hora')
    let valido = false
    const datos = await obtener_datos();
    //const datos =  obtener_datos();
    let array_pedido = []
    let array_inputs = []

    //Creación y validacion de la orden 
    crear_orden.addEventListener('click', (e) => {
        e.preventDefault()

        valido = validacion()

        //Si la validación es correcta se mostrará la información
        if (valido) {
            crear_orden.addEventListener('click', (e) => {
                e.preventDefault()

                const modalFormulario = document.querySelector('#formulario')
                const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
                modalBootstrap.hide();
                mostrar_oculto()
                pintar_resumen(mesa.value, hora.value, array_inputs)

                mesa.value = '';
                hora.value = ''


            })
        } else {
            const modalFormulario = document.querySelector('#formulario')
            const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
            modalBootstrap.show();
        }

    })


    //Mostrar la información oculata
    function mostrar_oculto() {
        const resumen_elemento = document.querySelector('#resumen')
        const platillos_elemento = document.querySelector('#platillos')

        resumen_elemento.className = 'resumen bg-light container mt-5 p-4'
        platillos_elemento.className = 'container bg-light mt-5 p-4'
        pintar_platillos()
    }

    //Pintar la lista de platillos (API)
    function pintar_platillos() {
         
             datos.forEach(platillo => {
            const contenido_platillo = document.querySelector('.contenido')

            const div_principal = document.createElement('div')
            div_principal.className = 'row py-3 border-top'

            contenido_platillo.appendChild(div_principal)

            const nombre = document.createElement('div')
            nombre.className = 'col-md-4'
            nombre.textContent = platillo.nombre;

            div_principal.appendChild(nombre)

            const precio = document.createElement('div')
            precio.className = 'col-md-3 fw-bold'
            precio.textContent = platillo.precio;

            div_principal.appendChild(precio)

            const categoria = document.createElement('div')
            categoria.className = 'col-md-3 fw-bold'
            categoria.textContent = String(platillo.categoria);
            div_principal.appendChild(categoria)

            const div_input = document.createElement('div')
            const input_cant = document.createElement('input')
            input_cant.className = 'form-control'
            div_input.className = 'col-md-2'
            div_input.appendChild(input_cant)
            div_principal.appendChild(div_input)
        });

        //Seleccionamos todos los inputs para luego recoger sus valores
        array_inputs = document.querySelectorAll('.form-control')


    }

    //Pintar el resumen
    function pintar_resumen(mesa, hora, array_inputs) {

            const div_cont_resumen = document.querySelector('.contenido.row')
            const div_resumen = document.createElement('div')
            div_resumen.className = 'col-md-6 card py-2 px-3 shadow'

            div_cont_resumen.appendChild(div_resumen)

            const titulo = document.createElement('h3')
            titulo.className = 'my-4 text-center'
            titulo.textContent = 'Consumiciones'
            div_resumen.appendChild(titulo)

            const mesa_p = document.createElement('p')
            mesa_p.className = 'fw-bold'
            mesa_p.innerHTML = `<span class="fw-normal">Mesa: ${mesa}</span>`
            div_resumen.appendChild(mesa_p)

            const hora_p = document.createElement('p')
            hora_p.className = 'fw-bold'
            hora_p.innerHTML = `<span class="fw-normal">Hora: ${hora}</span>`
            div_resumen.appendChild(hora_p)

            const elemento_ul = document.createElement('ul')
            elemento_ul.className = 'list-group'
            div_resumen.appendChild(elemento_ul)

            //Se recorren todos los inputs para recoger sus valores
            array_inputs.forEach(input => {

                input.addEventListener('input', (e) => {
                    e.preventDefault()

                    let valor_input = e.target.value;
                    console.log(valor_input)

                    //Si el input contiene algo se mostrará la información en Consumiciones
                    if (valor_input != '') {

                        const li = document.createElement('li')
                        li.className = 'list-group-item'
                        elemento_ul.appendChild(li)

                        const div_padre = e.target.parentElement.parentElement
                        console.log(div_padre)

                        const nombre = div_padre.querySelectorAll('div')[0]
                        const precio = div_padre.querySelectorAll('div')[1]

                        const nombre_mostrar = document.createElement('div')
                        nombre_mostrar.className = 'my-4'
                        nombre_mostrar.textContent = nombre.textContent
                        li.appendChild(nombre_mostrar)

                        const precio_mostrar = document.createElement('div')
                        precio_mostrar.className = 'fw-bold'
                        precio_mostrar.textContent = 'Precio:' + precio.textContent + "€"
                        li.appendChild(precio_mostrar)

                        const cantidad_mostrar = document.createElement('div')
                        cantidad_mostrar.className = 'fw-bold'
                        cantidad_mostrar.textContent = 'Cantidad:' + valor_input
                        li.appendChild(cantidad_mostrar)

                        const subtotal = document.createElement('div')
                        subtotal.className = 'fw-bold'
                        subtotal.textContent = 'Subtotal:' + (valor_input * precio.textContent) + "€"
                        li.appendChild(subtotal)

                        const boton_eliminar = document.createElement('button')
                        boton_eliminar.className = 'btn btn-danger'
                        boton_eliminar.textContent = 'Eliminar del pedido'
                        li.appendChild(boton_eliminar)

                        //Añadimos el pedido al array
                        array_pedido.push(nombre.textContent)

                        boton_eliminar.addEventListener('click', (e) => {
                            e.preventDefault()

                            const div_padre = e.target.parentElement
                            console.log(div_padre)
                            let input = div_padre.querySelectorAll('div')[3]

                            div_padre.remove()

                            //Eliminamos el pedido del array 
                            array_pedido.forEach(pedido => {
                                if (pedido == nombre_mostrar.textContent) {
                                    array_pedido = array_pedido.filter(pedido => pedido !== nombre_mostrar.textContent);
                                    //validacion_mostrar(array_pedido)
                                }
                            });

                        })
                    }

                })
            });
                //PROPINA

                const resumen = document.querySelector('#resumen')

                const formulario = document.createElement('form')
                formulario.className = 'col-md-6 formulario'
                resumen.appendChild(formulario)

                const divFormulario = document.createElement('div')
                divFormulario.className = 'card py-2 px-3 shadow'
                formulario.appendChild(divFormulario)

                const titulo_propina = document.createElement('h3')
                titulo_propina.textContent = 'Propina'
                titulo_propina.className = 'my-4 text-center'
                divFormulario.appendChild(titulo_propina)

                const contendor_radio = document.createElement('div')
                contendor_radio.className = 'form-check'
                divFormulario.appendChild(contendor_radio)

                
                const label_propina_10 = document.createElement('label')
                label_propina_10.className = 'form-check-label'
                label_propina_10.textContent = '10%'
                contendor_radio.appendChild(label_propina_10)

                const input_propina_10 = document.createElement('input')
                input_propina_10.type = 'radio'
                input_propina_10.className = 'form-check-input'
                input_propina_10.value = '10'
                contendor_radio.appendChild(input_propina_10)
           
                const label_propina_20 = document.createElement('label')
                label_propina_20.className = 'form-check-label'
                label_propina_20.textContent = '20%'
                contendor_radio.appendChild(label_propina_20)

                const input_propina_20 = document.createElement('input')
                input_propina_20.type = 'radio'
                input_propina_20.className = 'form-check-input'
                input_propina_20.value = '20'
                contendor_radio.appendChild(input_propina_20)

                const label_propina_50 = document.createElement('label')
                label_propina_50.className = 'form-check-label'
                label_propina_50.textContent = '20%'
                contendor_radio.appendChild(label_propina_50)

                const input_propina_50 = document.createElement('input')
                input_propina_50.type = 'radio'
                input_propina_50.className = 'form-check-input'
                input_propina_50.value = '20'
                contendor_radio.appendChild(input_propina_50)

                const propina_div = document.querySelector('card.py-2.px-3.shadow')
                
                const div_info = document.createElement('div')
                div_info.className = 'total-pagar my-5'
                propina_div.appendChild(div_info)

                const p_subtotal = document.createElement('p')
                p_subtotal.className = 'fs-4 fw-bold mt-2'
                p_subtotal.textContent ='Subtotal'
                div_info.appendChild(p_subtotal)

                  const p_propina = document.createElement('p')
                  p_propina.className ='fs-4 fw-bold mt-2'
                p_propina.textContent ='Propina'
                div_info.appendChild(p_propina) 

                  const p_ptotal= document.createElement('p')
                p_ptotal.className = 'fs-4 fw-bold mt-2'
                p_ptotal.textContent ='Total a pagar'
                div_info.appendChild(p_ptotal) 



        }


        //Si el array está vacío, volvera a su estado incial
        /*
        function validacion_mostrar(array_pedido){
              if (array_pedido.length == 0) {
            const resumen = document.querySelector('.col-md-6.card.py-2.px-3.shadow')
            const propinas = document.querySelector('.col-md-6.formulario')
            resumen.remove()
            propinas.remove()

              }else{
                pintar_resumen(mesa, hora, array_inputs)
              }
        }

*/

    }

)