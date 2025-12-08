export class crear_api{

    
async pixabay(busqueda,pagina) {
//Url limit=10, las 10 más importantes
const url = `https://pixabay.com/api/?key=52999076-a5f4a0eba9fe3b498ee00e409&q=${busqueda}&image_type=photo&per_page=40&page=${pagina}`
    const lista = await fetch(url)
    const datos = await lista.json();
    const array = datos;
    return array
}

}