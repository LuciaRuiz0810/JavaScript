window.addEventListener('load', function () {

    //Elementos
    const boton_resultados = document.querySelector('input[type="submit"]');
    const select_valor = document.querySelector('#moneda');
    const select_cripto = document.querySelector('#criptomonedas')
    const div_resultado = document.querySelector('#resultado')
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';


    let tipo_moneda = "";
    let tipo_cripto = "";


    fetch(url)
        .then(datos => {
            let Fullname = datos.Fullname
            let Name = datos.Name
        })

    boton_resultados.addEventListener('click', (e) => {

        e.preventDefault()
        tipo_cripto = select_cripto.value;
        tipo_moneda = select_valor.value

        console.log(tipo_cripto, tipo_moneda)

        if (tipo_cripto == "" || tipo_moneda == "") {

            if (!document.querySelector('.error')) {
                div_error = document.createElement('div');
                div_error.className = 'error'
                div_error.textContent = 'AMBOS CAMPOS SON OBLIGATORIOS';
                div_resultado.appendChild(div_error);

                setTimeout(() => {
                    div_error.remove()
                }, 2000);

                return;
            }


        }else{
            if(document.querySelector('.error')){
                div_error.remove();
            }
        }

        console.log(tipo_cripto, tipo_moneda)

    });










})