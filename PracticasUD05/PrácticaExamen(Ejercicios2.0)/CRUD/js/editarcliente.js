/*EDITAR UN REGISTRO:
  Todo lo relacionado con las dos fases de la edición
*/

//todo lo relacionado con la validación y llamada a función conexión API
import { funciones } from "./funciones.js";
import { api } from "./API.js";

class editar {

  nombre
  email
  telefono
  empresa

  constructor(nombre, email, telefono, empresa) {
    this.nombre = nombre
    this.email = email
    this.telefono = telefono
    this.empresa = empresa
  }

  recoger_id() {
    const parametrosURL = new URLSearchParams(window.location.search)
    //Si solo espero números usar parseInt, si hay letras quitarlo o dará Nan
    const id_cliente = parametrosURL.get('id')
    return id_cliente
  }

}

window.addEventListener('load', async () => {

  const boton_agregar = document.querySelector('input[type="submit"')
  const edit = new editar()
  const datos = new api()

  let nombre = ''
  let email = ''
  let telefono = ''
  let empresa = ''

  let id_cliente = edit.recoger_id();
  let array_datos = await datos.obtener_datos()

  array_datos.forEach(cliente => {

    //Recoger datos del cliente
    if (cliente.id == id_cliente) {

      nombre = cliente.nombre
      email = cliente.email
      telefono = cliente.telefono
      empresa = cliente.empresa
    }

  });
  //Escribir datos actuales
  let nombre_input = document.querySelector('#nombre').value = nombre
  let email_input = document.querySelector('#email').value = email
  let tlf_input = document.querySelector('#telefono').value = telefono
  let empresa_input = document.querySelector('#empresa').value = empresa

  boton_agregar.addEventListener('click', (e) => {
    e.preventDefault()
     const validar = new funciones()
        const texto = 'ERROR! Todos los campos son obligatorios'
        let valido = validar.validacion(texto)


    if (valido) {
      //Recoger nuevos valores
      const nombre = document.querySelector('#nombre').value
      const email = document.querySelector('#email').value
      const telefono = document.querySelector('#telefono').value
      const empresa = document.querySelector('#empresa').value
      
      //Crear el cliente actualizado
      const cliente = new editar(nombre, email, telefono, empresa)

      const nueva_llamada = new api()
      nueva_llamada.actualizar(cliente, id_cliente);
       window.location.href = 'index.html'
    }



  })






})