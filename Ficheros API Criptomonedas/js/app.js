window.addEventListener('load', function () {

    //Elementos seleccionados
    const boton_resultados = document.querySelector('input[type="submit"]');
    const select_valor = document.querySelector('#moneda');
    const select_cripto = document.querySelector('#criptomonedas')
    const div_resultado = document.querySelector('#resultado')
    const body = document.querySelector('body')
    const url_desplegable = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    let criptosDisponibles = [];

    let signo = '';
    let tipo_moneda = "";
    let tipo_cripto = "";

    //devuelve una promesa con un objeto Response
    fetch(url_desplegable)

        //devuelve otra promesa que resuelve el contenido convertido en JSON (objeto JS).
        .then(respuesta => respuesta.json())


        //Accede al campo DATA donde se encuentra el array
        .then(datos => {
            const array_datos = datos.Data
            criptosDisponibles = datos.Data
            //Se recorre el array
            array_datos.forEach(criptos => {

                //DESTRUCTURING --> Sacamos los datos de FullName y Name de cada array
                const { FullName, Name } = criptos.CoinInfo;

                //Se crea el elemento option
                const nuevo_option = document.createElement('option');
                nuevo_option.value = FullName;
                nuevo_option.textContent = Name;
                select_cripto.appendChild(nuevo_option);
            });
        })

        .catch(error => console.log('Error:', error));



    function mostrarInfoHTML(Price, Highday, Lowday, ChangePCP24hour, Lastupdate) {

        //Selección de signo    
        if (tipo_moneda == 'Eur') { signo = '€' }
        if (tipo_moneda == 'USD') { signo = '$' }
        if (tipo_moneda == 'JYP') { signo = '¥' }
        if (tipo_moneda == 'GBP') { signo = '£' }


        const div_info = document.querySelector('#resultado');
        //Limpiamos el div antes de volver a mostrar información
        div_info.innerHTML = '';
        const precio = document.createElement('h4');
        precio.textContent = 'El Precio es: ' + signo + ' ' +Price.toFixed(2);
        const alto = document.createElement('p');
        alto.textContent = 'Precio más alto del dia: ' + signo + ' '  + Highday.toPrecision(6);
        const bajo = document.createElement('p');
        bajo.textContent = 'Precio más bajo del dia: ' + signo + ' ' + Lowday.toPrecision(6);
        const ultimas_horas = document.createElement('p');
        ultimas_horas.textContent = 'Variación últimas 24h: ' + ChangePCP24hour.toPrecision(3) + '%';
        const actualizacion = document.createElement('p');
        actualizacion.textContent = 'última actualización: ' + new Date(Lastupdate * 1000).toLocaleString();

        //
        div_info.appendChild(precio)
        div_info.appendChild(alto)
        div_info.appendChild(bajo)
        div_info.appendChild(ultimas_horas)
        div_info.appendChild(actualizacion)

    }

    //Evento click
    boton_resultados.addEventListener('click', (e) => {

        e.preventDefault()
        //Obtención de valores
        tipo_cripto = select_cripto.value;
        tipo_moneda = select_valor.value

        
        //Manejo del error
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

            //Si ambos campos tienen valores se elimina el error
        } else {
            if (document.querySelector('.error')) {
                div_error.remove();
            }

            //Buscamos la criptomoneda seleccionada dentro del array
            //Debe coincidir el FullName con el tipo_cripto seleccionado por el usuario
            const cripto = criptosDisponibles.find(moneda => moneda.CoinInfo.FullName === tipo_cripto);
            //Obtenemos los valores de la cripto seleccionada DESTRUCTING
            const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cripto.RAW.USD;
            //Mostramos la información
            mostrarInfoHTML(PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE);
        }



    });










})