//inicia la aplicación. Puede contener alguna función complementaria

import { api_nueva } from "./API.js";



document.addEventListener('DOMContentLoaded', () => {


  const url = 'http://localhost:4000/clientes';

  const tbody = document.querySelector('#listado-clientes')
  const nueva_api = new api_nueva()
  let id = 0;


  //Función para cargar los datos cuando se obtengan
  async function cargar_Datos() {
    tbody.innerHTML = '';
    let datos = await nueva_api.obtenerDatos(url);
    return datos;
  }

  //Función que recoge los datos cuando estén disponibles
  async function datos() {
    let datos = await cargar_Datos()
    //Pintamos los clientes
    pintar_clientes(datos)
  }

  datos()

  function pintar_clientes(datos) {
    //Acceder a los datos del array
    datos.forEach(element => {

      const fila = document.createElement('tr');
      tbody.appendChild(fila)
      const celda_nombre = document.createElement('td');
      celda_nombre.className = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-700 text-lg font-bold'
      celda_nombre.textContent = element.nombre
      fila.appendChild(celda_nombre)

      const email = document.createElement('p')
      email.className = 'text-sm leading-10 text-gray-600'
      email.textContent = element.email
      celda_nombre.appendChild(email)

      const celda_tlf = document.createElement('td');
      celda_tlf.className = "text-gray-700"
      celda_tlf.textContent = element.telefono;
      fila.appendChild(celda_tlf)

      const celda_empresa = document.createElement('td');
      celda_empresa.className = "text-gray-600"
      celda_empresa.textContent = element.empresa;
      fila.appendChild(celda_empresa)

      id = element.id;
      const celda_acciones = document.createElement('td');
      celda_acciones.innerHTML = `<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5"> <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a> <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a></td>`
      fila.appendChild(celda_acciones)

   

    })

       //Recogemos los botones eliminar
      let array_eliminar = document.querySelectorAll('.eliminar');
      evento_eliminar(array_eliminar)
  }
  //Función que añade un evento click a cada botón
  function evento_eliminar(array_eliminar) {
    array_eliminar.forEach(element => {
      element.addEventListener('click', (e) => {

        e.preventDefault();

        //dataset accede al id de data-cliente del botón eliminar
        const idCliente = e.target.dataset.cliente;
        const nueva_api = new api_nueva();
        //Ventana para confirmar la eliminación del cliente
        if (confirm("¿Deseas eliminar este cliente?")) {
          nueva_api.eliminar(idCliente, url)
          e.target.closest('tr').remove();

        } else {
          console.log('Cancelado')
        }
      });
    });
  }








});










