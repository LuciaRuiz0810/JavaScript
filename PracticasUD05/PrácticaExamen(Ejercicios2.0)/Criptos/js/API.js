
export class crear_api{

    
async listar_monedas() {
//Url limit=10, las 10 más importantes
const url_monedas = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    const lista = await fetch(url_monedas)
    const datos = await lista.json();
    const array = datos.Data;
    return array
}



async listar_datos(cripto, moneda){
    const url_datos = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
    const lista = await fetch(url_datos)
    const datos = await lista.json();
    const array =datos.RAW[cripto][moneda];
    return array
}
}


