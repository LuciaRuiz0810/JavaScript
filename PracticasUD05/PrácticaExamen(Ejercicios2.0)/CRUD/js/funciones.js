//funciones generales que pueden servir para varios ficheros

export class funciones {

    validacion(texto) {
            const boton_agregar = document.querySelector('input[type="submit"]').parentElement;

            const nombre = document.querySelector('#nombre')
            const email = document.querySelector('#email')
            const telefono = document.querySelector('#telefono')
            const empresa = document.querySelector('#empresa')
            
            const alerta = document.querySelector('.bg-red-100');
          

            if (nombre.value.trim() == '' || email.value.trim() == '' || telefono.value.trim() == '' || empresa.value.trim() == '') {

                if (!alerta) {

                    const div_error = document.createElement('div')
                    div_error.className = 'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center'
                    div_error.textContent = texto
                    boton_agregar.appendChild(div_error)

                    setTimeout(() => {
                        div_error.remove()
                        
                    }, 3000);
                    return false
                }
            } else {
                return true
            }

        }
    }







