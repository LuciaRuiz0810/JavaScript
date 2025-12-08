

//Función para validar los campos del modal
export function validacion() {

    const form = document.querySelector('form')
    const alerta = document.querySelector('.invalid-feedback');

    if (!alerta) {
        let mesa = document.querySelector('#mesa')
        let hora = document.querySelector('#hora')

        if (mesa.value.trim() == '' || hora.value.trim() == '') {
            const div_error = document.createElement('div')
            div_error.className = 'invalid-feedback d-block text-center'
            div_error.innerHTML = 'AMBOS CAMPOS SON OBLIGATORIOS'
            form.appendChild(div_error)

            setTimeout(() => {
                div_error.remove()

            }, 1500);
            return false

        }else{
            return true
        }

    } 


}