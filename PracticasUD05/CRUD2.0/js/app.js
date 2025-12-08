/*************************************************
 * ***********FICHERO PPAL DE JS******************
 *************************************************/
import {obtenerClientes, eliminarCliente} from './API.js';

const listado = document.querySelector('#listado-clientes');

//Nada más iniciar llamamos a la función que hará la carga de ctes
document.addEventListener('DOMContentLoaded', mostrarClientes);

//evento para eliminar clientes
listado.addEventListener('click', confirmarEliminar);

//NO sabemos cuanto va a tardar en ejecutarse la acción, por lo que 
//console.log(clientes) dará promise(pending) pq se ejecuta antes de que 
//todos los registros se hayan descargado.
//Solución:  console.log no se ejecutará hasta que obtenerClientes() 
//de los resultados
async function mostrarClientes(){
    try {
        const clientes = await obtenerClientes();
        // console.log(clientes);
        clientes.forEach(element => {
            //hacemos destructuring
            const {nombre, email, telefono, empresa, id} = element;

            const row = document.createElement('tr');
            row.innerHTML += `
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                    </td>
                `;

            listado.appendChild(row);
        });

    }catch (error){
        console.log(error)

    }
    
}


function confirmarEliminar(e){
    if (e.target.classList.contains('eliminar')){
        const clienteId = e.target.dataset.cliente;
        //console.log(clienteId);

        const confirmar = confirm("¿Deseas eliminar este cliente?");
        if (confirmar){
            eliminarCliente(clienteId);
        }
    }

}