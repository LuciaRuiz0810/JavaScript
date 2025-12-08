import {obtenerCliente, editarCliente} from './API.js';
import {mostrarAlerta, validar} from './funciones.js';

//****VARIABLES DEL FORMULARIO****/
const nombreInput = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const empresaInput = document.querySelector('#empresa');
const telefonoInput = document.querySelector('#telefono');
const idInput = document.querySelector('#id');

//RELLENAMOS EL FORMULARIO CON LOS DATOS DEL CLIENTE

//puede que el documento esté listo antes de que tengamos los datos de la bbdd
//esto nos daría un promise pending
//solución: async en la función padre y await en la que queremos que se pare
//la ejecución hasta que se haya concluido (tengamos los datos del cliente)
document.addEventListener('DOMContentLoaded', async () =>{
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = (parametrosURL.get('id'));
    const cliente = await obtenerCliente(idCliente);
   
    mostrarCliente(cliente);

    //Submit al formulario
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);
     
});

function mostrarCliente(cliente){
    //aplicamos destructuring
    console.log(cliente)
    const {nombre, empresa, email, telefono, id} = cliente;
    nombreInput.value = nombre;
    empresaInput.value = empresa;
    emailInput.value = email;
    telefonoInput.value = telefono;
    idInput.value = id;
}

function validarCliente(e){
    e.preventDefault();
     //creamos un objeto para comprobar de otra forma si algún cambpo está vacío
     const cliente = {
        //si la clave es igual al valor, se puede poner solo una vez
        nombre: nombreInput.value,
        email:emailInput.value,
        telefono:telefonoInput.value,
        empresa:empresaInput.value,
        id: (idInput.value)
    }

    console.log(cliente);

    //si no está completo el formulario: mensaje error
    if (!validar (cliente)){
        mostrarAlerta('Todos los campos son obligatorios', 'formulario');
        return;
    }

    //reescribe el objeto
    editarCliente(cliente);

}