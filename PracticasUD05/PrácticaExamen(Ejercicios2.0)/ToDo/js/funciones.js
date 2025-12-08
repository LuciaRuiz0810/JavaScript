export function validacion(texto) {

    const body = document.querySelector('#contenido')
    const alerta = document.querySelector('.error');

        if (!alerta) {

            const div_error = document.createElement('div')
            div_error.className = 'error'
            div_error.textContent = texto
            body.appendChild(div_error)

            setTimeout(() => {
                div_error.remove()

            }, 3000);
            return false
        }else {
           return true
    } 
    

}