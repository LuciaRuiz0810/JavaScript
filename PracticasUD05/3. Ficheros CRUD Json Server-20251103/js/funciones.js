//funciones generales que pueden servir para varios ficheros

export class funciones {

    validacion(nombre, correo, tlf, empresa) {
        if (nombre !== '' && correo !== '' && tlf !== '' && empresa !== '') {
            if (document.querySelector('#bg-red-100')) {
                div_error.remove();
            }
            return true;


        } else {

            if (!document.querySelector('#bg-red-100')) {

                const div_error = document.createElement('div')
                const enviar = document.querySelector('input[type="submit"]').parentElement;
                div_error.className = 'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center'
                div_error.textContent = 'Error!: Todos los campos son obligatorios!'
                enviar.appendChild(div_error)

                setTimeout(() => {
                    div_error.remove();
                }, 3000);

                return false;
            }
        }
    }

}