import { crear_api } from "./API.js";

window.addEventListener('load', async () => {

    const input = document.querySelector('#termino');
    const buscar = document.querySelector('input[type ="submit"]')
    const resultado = document.querySelector('#resultado')
    const paginacion = document.querySelector('#paginacion')
    let pixabay_result;
    let total
    let contador = 0;

    const nueva_api = new crear_api()

    buscar.addEventListener('click', async (e) => {
        e.preventDefault()
        pixabay_result = await nueva_api.pixabay(input.value);
        total = pixabay_result.totalHits
        crear_paginacion(total)
    })

    async function pintar_fotos(pixabay_result) {
            resultado.innerHTML = ''
        pixabay_result.forEach(result => {
            const div_plantilla = document.createElement('div')
            div_plantilla.className = 'w-1/2 md:w-1/3 lg:w:1/4 mb-4 p-3'

            const div_info = document.createElement('div')
            div_info.className = 'bg-white'

            div_plantilla.appendChild(div_info)

            const div_img = document.createElement('div')
            div_img.className = 'w-full'
            div_img.innerHTML = `<img src=${result.previewURL} alt="img">`;

            div_info.appendChild(div_img);

            const div_info_2 = document.createElement('div')
            div_info_2.className = 'p-4'
            div_info.appendChild(div_info_2)

            const div_likes = document.createElement('p')
            div_likes.className = 'font-bold'
            div_likes.innerHTML = result.likes + `<span class= font-light> /Me gusta</span`
            div_info_2.appendChild(div_likes)

            const div_views = document.createElement('p')
            div_views.className = 'font-bold'
            div_views.innerHTML = result.views + `<span class= font-light> /Veces Vista</span`
            div_info.appendChild(div_views)

            const div_ver_img = document.createElement('p')
            div_ver_img.className = 'block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1'
            div_ver_img.innerHTML = `<p><a href= "${result.largeImageURL}">VER IMAGEN<p>`
            div_info.appendChild(div_ver_img)

            resultado.appendChild(div_plantilla)

        });
    }


    function crear_paginacion(total) {
        let cantidad_pag = total / 40;
    
        pintar_fotos(pixabay_result.hits, contador)
        contador++

        for (let i = 1; i < cantidad_pag; i++) {
            const boton = document.createElement('button')
            boton.className = 'bg-yellow-400 px-4 py-1 mr-2 Font-bold mb-4 rounded'
            boton.textContent = i
            paginacion.appendChild(boton)

            boton.addEventListener('click', async (e) => {
                e.preventDefault()
                if (contador != 0) {
                    const nueva_url = new crear_api()
                    let pagina = boton.textContent
                    let pixabay = await nueva_url.pixabay(input.value, pagina);

                    pintar_fotos(pixabay.hits)
                }
            })
        }
    }
})