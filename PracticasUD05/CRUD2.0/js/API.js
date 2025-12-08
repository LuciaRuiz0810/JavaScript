
import {mostrarAlerta} from './funciones.js';
//url del proyecto(bbdd)
const url = 'http://localhost:2000/clientes';
const errorPers ="Fallo al conectar con la base de datos"

//para crear nuevo cliente
export const nuevoCliente = async cliente =>{
    //console.log(cliente);
    try {
        //por defecto fetch ejecuta GET: obtener datos del servidor
        //añadimos a fetch un argumento que es un objeto de configuración
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        //Mandamos al usuario a la página ppal en la que se mostrará 
        //el listado de clientes.    
        window.location.href = 'index.html';
    }catch (error){
        //console.log(error);
        mostrarAlerta(errorPers, 'formulario');
    }
}

//obtiene todos los clientes --> dos await
export const obtenerClientes = async () => {
    try{
        //por defecto fetch envia GET
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    }catch(error){
        console.log(errorPers);
        mostrarAlerta(errorPers, 'table');
    }
}


// eliminar cliente
export const eliminarCliente = async id =>{
    try{
        await fetch (`${url}/${id}`, {
            method:'DELETE'
        });
    }catch(error){
        console.log(errorPers);
         mostrarAlerta(errorPers, 'table');
    }
}

//obtener un cliente por su ID
export const obtenerCliente = async id =>{
    try{
        //usamos método GET con id para obtener info
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente;
    }catch(error){
        console.log(errorPers);
        mostrarAlerta(errorPers, 'formulario')
    }
}

//Actualiza un registro
export const editarCliente = async cliente => {
    //console.log(cliente);
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //llevamos al usuario a la pantalla ppal
        window.location.href = 'index.html';
    }catch(error){
        console.log(errorPers);
        mostrarAlerta(errorPers, 'formulario')
    }
}