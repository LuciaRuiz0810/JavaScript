//función que muestra alerta: 
//2 parámetros (mensaje y elemento del DOM: tenemos distintas htmls)
export function mostrarAlerta(mensaje, elementoDOM){
    
    const alerta = document.querySelector('.bg-red-100');
    //miramos si ya existe un elemento con esa clase: ya habría una alerta
    if (!alerta){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded', 
        'max-w-lg','mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        
        //Personalizamos errores según sean en formulario (añadir/editar)
        if (elementoDOM === "formulario"){
            const formulario = document.querySelector('#formulario');
            formulario.appendChild(alerta);
        }else { //o en pantalla principal (obtener ctes o borrar clientes)
            const table = document.querySelector('table');
            table.appendChild(alerta);
        }
        

        setTimeout(() =>{
            alerta.remove();
        }, 3000);
    }
}

export function validar(obj){
    //Object.values crea un array y every verifica si los elementos de un array 
    //cumplen una condición (devuelve booleano)
    //devuelve false si algún campo está vacío
    return Object.values(obj).every(input => input !== "");

}