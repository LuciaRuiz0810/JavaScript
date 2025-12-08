
import {mostrarAlerta, validar} from './funciones.js';
import { nuevoCliente } from './API.js';

const formulario = document.querySelector("#formulario");
formulario.addEventListener('submit', rellenarCliente);


export function rellenarCliente(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    //creamos un objeto para comprobar de otra forma si algún cambpo está vacío
    const cliente = {
        //si la clave es igual al valor, se puede poner solo una vez
        nombre, // = nombre: nombre,
        email,
        telefono,
        empresa
    }

    //si no está completo el formulario: mensaje error
    if (!validar (cliente)){
        mostrarAlerta('Todos los campos son obligatorios', 'formulario');
        return;
    }
    console.log(cliente)
    //si es ok, damos de alta el cliente (fichero A)
     nuevoCliente(cliente);   
} 


