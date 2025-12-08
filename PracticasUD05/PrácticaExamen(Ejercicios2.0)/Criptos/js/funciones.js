export class funciones_ {


    validacion(moneda, cripto) {

        const div_error = document.createElement('div')
        const form = document.querySelector('#formulario');
        if (moneda.trim() == '' || cripto.trim() == '') {
            if (!document.querySelector('.error')) {
                div_error.className = 'error'
                div_error.textContent = 'AMBOS CAMPOS SON OBLIGATORIOS';
                form.appendChild(div_error)
                return false;
            }
            ;

            setTimeout(() => {
                div_error.remove();
            }, 3000);

        } else {
            div_error.remove();
            return true;
        }
    }



}