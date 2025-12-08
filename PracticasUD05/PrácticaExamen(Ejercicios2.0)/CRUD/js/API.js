//Acciones con la API de Json Server

import { funciones } from "./funciones.js";

export class api {

    async obtener_datos() {
        const url = 'http://localhost:4000/clientes'
        const f_url = await fetch(url)
        const obj = await f_url.json();
        return obj;

        /*Obj id
  Object.entries(obj).forEach(([codigo, producto]) => {
  console.log(`Código: ${codigo} → ${producto.nombre} - ${producto.precio}€`);
        */

  /*obj
   const productos = Object.values(obj);
    return productos; //devolvemos el array
  */
    }

    añadir(cliente) {
        const validar = new funciones()
        const url = 'http://localhost:4000/clientes'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-type': 'application/json'
            }

        }) /* Con try catch
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }
                
            })
            .catch(error => {
                const texto = 'ERROR! Fallo al conectar con la base de datos'
                validar.validacion(texto)
            });
    */  }

    eliminar(id) {
        const url = 'http://localhost:4000/clientes'
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    }

    actualizar(cliente, id) {
        const url = 'http://localhost:4000/clientes'
        fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}