//todo lo relacionado con la validación y llamada a función conexión API
import { funciones } from "./funciones.js";
import { api } from "./API.js";
class nuevo {

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

}

window.addEventListener('load', () => {

    const boton_agregar = document.querySelector('input[type="submit"')



    boton_agregar.addEventListener('click', (e) => {
        e.preventDefault()
        const validar = new funciones()
        const texto = 'ERROR! Todos los campos son obligatorios'
        let valido = validar.validacion(texto)

        if (valido) {

            const nombre = document.querySelector('#nombre').value
            const email = document.querySelector('#email').value
            const telefono = document.querySelector('#telefono').value
            const empresa = document.querySelector('#empresa').value

            const cliente = new nuevo(nombre,email,telefono,empresa)

            const nueva_llamada = new api()
            nueva_llamada.añadir(cliente);
            window.location.href = 'index.html'
            

        }



    })






})