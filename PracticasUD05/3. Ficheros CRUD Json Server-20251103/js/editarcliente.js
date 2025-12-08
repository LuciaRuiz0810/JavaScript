/*EDITAR UN REGISTRO:
  Todo lo relacionado con las dos fases de la edición
*/

//Importar las clases
import { funciones } from "./funciones.js";
import { api_nueva } from "./API.js";

export class editar_cliente {

  constructor(nombre, correo, telefono, empresa) {
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.empresa = empresa;
  }

  recoger_id() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');
    return idCliente;
  }
}

// Código que se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:4000/clientes';
  const llamada_api = new api_nueva();
  
  // Obtener el ID del cliente de la URL
  const editar = new editar_cliente();
  const idCliente = editar.recoger_id();
  
  if (!idCliente) {
    console.error('No se encontró ID del cliente');
    return;
  }

  // Cargar los datos del cliente
  try {
    const cliente = await llamada_api.obtenerDatos(`${url}/${idCliente}`);
    
    // Rellenar el formulario con los datos del cliente
    document.querySelector('#nombre').value = cliente.nombre;
    document.querySelector('#email').value = cliente.email;
    document.querySelector('#telefono').value = cliente.telefono;
    document.querySelector('#empresa').value = cliente.empresa;
    document.querySelector('#id').value = cliente.id;
  } catch (error) {
    console.error('Error al cargar el cliente:', error);
  }

  // Manejar el envío del formulario
  const formulario = document.querySelector('#formulario');
  
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const empresa = document.querySelector('#empresa');
    const id = document.querySelector('#id');

    let valor_nombre = nombre.value.trim();
    let valor_email = email.value.trim();
    let valor_tlf = telefono.value.trim();
    let valor_empresa = empresa.value.trim();

    const valido = new funciones();
    const validez = valido.validacion(valor_nombre, valor_email, valor_tlf, valor_empresa);

    if (validez) {

      const clienteActualizado = {
        nombre: valor_nombre,
        email: valor_email,
        telefono: valor_tlf,
        empresa: valor_empresa,
        id: id.value
      };

      try {

         llamada_api.actualizar(clienteActualizado, url, id.value);
        // Redirigir a la página principal después de actualizar
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    }
  });
});