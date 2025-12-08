import { crear_api } from "./API.js";
import { funciones_ } from "./funciones.js";

window.addEventListener('load', async () => {

    const cripto = document.querySelector('#criptomonedas');
    const moneda = document.querySelector('#moneda');
    const padre_boton = document.querySelector('input[type="submit"]');
    const resultado = document.querySelector('#resultado')

    const nueva_funcion = new funciones_()
    const nueva_api = new crear_api();
    let simbolo = '';
    

    //Llama a listar_monedas. Saca la info de la api y devuelve el array
    const monedas = await nueva_api.listar_monedas();
    pintar_monedas(monedas)


    //Función para mostrar las monedas
    function pintar_monedas(monedas) {
        monedas.forEach(element => {
            const info = element.CoinInfo;
            let nombre = info.FullName;
            let codigo = info.Name;

            const option = document.createElement('option')
            option.textContent = nombre
            option.value = codigo
            cripto.appendChild(option);
        });
    }

    //Función para mostrar las monedas
    function pintar_info(datos_Api, valor_moneda) {
   
        switch (valor_moneda) {
            case 'USD':
                simbolo = '$'
                break;
            case 'JPY':
               simbolo = '¥'
                break;
             case 'EUR':
                simbolo = '€'
                 break;
            case 'GBP':
                simbolo = '£'
                 break;
            default:
                break;
        }
            resultado.innerHTML = ''
            let precio = datos_Api.PRICE;
            let dia_alto = datos_Api.HIGHDAY
            let dia_bajo = datos_Api.LOWDAY
            let pcp = datos_Api.CHANGE24HOUR
            let actu = datos_Api.LASTUPDATE

            const div = document.createElement('div')
            const precio_ = document.createElement('h4')
            precio_.textContent = 'El precio es: ' +simbolo + precio;
            div.appendChild(precio_)
            resultado.appendChild(div)

              const dia_alto_ = document.createElement('p')
            dia_alto_.textContent = 'El precio más alto del día: '+simbolo + dia_alto;
            div.appendChild(dia_alto_)

             const dia_bajo_ = document.createElement('p')
            dia_bajo_.textContent = 'El precio más bajo del día: ' +simbolo + dia_bajo;
            div.appendChild(dia_bajo_)

            
             const pcp_ = document.createElement('p')
            pcp_.textContent = 'Variación últimas 24h: ' + dia_bajo;
            div.appendChild(pcp_)

            const actu_ = document.createElement('p')
            actu_.textContent = 'Última actualización: ' + actu;
            div.appendChild(actu_)
    };
    
    padre_boton.addEventListener('click', async (e) => {
        e.preventDefault()
        let valor_cripto = cripto.value;
        let valor_moneda = moneda.value;
         const datos_Api = await nueva_api.listar_datos(valor_cripto,valor_moneda);
        let valido = nueva_funcion.validacion(valor_cripto, valor_moneda)
        
        if (valido) {
           await pintar_info(datos_Api, valor_moneda)
        }
    })


})


