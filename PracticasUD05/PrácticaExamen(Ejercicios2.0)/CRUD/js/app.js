//inicia la aplicación. Puede contener alguna función complementaria
import { api } from "./API.js";
window.addEventListener('load', async () => {


    const listado_clientes = document.querySelector('#listado-clientes')


    const nueva = new api();
    let array_datos = await nueva.obtener_datos();
    pintar_clientes(array_datos);



    function pintar_clientes(array_datos) {

        array_datos.forEach(cliente => {

            const fila = document.createElement('tr')
            fila.className = 'px-6 py-4 whitespace-no-wrap border-b bordergray-200'

            const celda = document.createElement('td')
            listado_clientes.appendChild(fila)
            fila.appendChild(celda);

            celda.textContent = cliente.nombre;
            celda.innerHTML += `<br><p class = text-sm leading-10 text-gray-700>${cliente.email}</p>`
            celda.className = 'text-sm leading-5 font-medium text-gray-700 text-lg font-bold'

            const celda_tlf = document.createElement('td')
            celda_tlf.textContent = cliente.telefono;
            celda_tlf.className = 'text-gray-700 '
            fila.appendChild(celda_tlf);

            const celda_empresa = document.createElement('td')

            celda_empresa.textContent = cliente.empresa;
            celda_empresa.className = 'text-gray-600 bordergray-200'
            fila.appendChild(celda_empresa);
            let id = cliente.id;

            const celda_acc = document.createElement('tr')
            celda_acc.innerHTML = `<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>`

            fila.appendChild(celda_acc);
        });

        const lista_eliminar = document.querySelectorAll('.eliminar')
        eliminar(lista_eliminar)
    }


    function eliminar(array_botones) {
        array_botones.forEach(boton => {
            boton.addEventListener('click', (e) => {

                //Recoger id
                const idCliente = e.target.dataset.cliente;

                if (confirm('¿Deseas eliminar este cliente?')) {
                    const llamada_eliminar = new api()
                    llamada_eliminar.eliminar(idCliente)
                }

            });
        })
    }


})  