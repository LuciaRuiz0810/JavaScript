//todo lo relacionado con la validación y llamada a función conexión API

//Importar la clase funciones
import { funciones } from "./funciones.js";
import { api_nueva } from "./API.js";

export class nuevo_cliente {

    constructor(nombre, email, telefono, empresa) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono
        this.empresa = empresa
    }
}


document.addEventListener('DOMContentLoaded', () => {

const url = 'http://localhost:4000/clientes';

const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const empresa = document.querySelector('#empresa');
const formulario = document.querySelector('#formulario')


formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    let valor_nombre = nombre.value.trim()
    let valor_email = email.value.trim()
    let valor_tlf = telefono.value.trim()
    let valor_empresa = empresa.value.trim()

    const valido = new funciones()
    const validez = valido.validacion(valor_nombre, valor_email, valor_tlf, valor_empresa)

    if (validez) {
        const cliente = new nuevo_cliente(valor_nombre, valor_email, valor_tlf, valor_empresa)
        const llamada_api = new api_nueva()
        llamada_api.añadir(cliente, url);
        //Redirige a la página principal
        window.location.href = 'index.html'
    }

})

})
/*

*/