window.addEventListener('load', function () {

    //Selección de elementos
    const input_busqueda = document.querySelector('#termino')
    const boton = document.querySelector('.mt-5')
    const div_result = document.querySelector('#resultado')
    const paginacion = document.querySelector('#paginacion')
    const key = '52999076-a5f4a0eba9fe3b498ee00e409'

    let array_Datos = [];
    let generadorPaginas;
    let total_result;

    //Generador para que devuelva la cantidad de paginas
    function* generadorDePaginas() {
        let pagina = 1;
        while (true) {
            yield pagina; //Cada vez que se llame al generador, se detendrá aquí y devolverá el número de la página
            pagina++;
        }
    }

    //Evento click
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        let busqueda = input_busqueda.value.trim();

        //Si el input contiene texto
        if (busqueda !== '') {
            //Se limpian los resultados anteriores y la paginación
            div_result.innerHTML = '';
            paginacion.innerHTML = '';

            //Nuevo generador para los nuevos resultados
            //Variable que se usará para pasar de página
            generadorPaginas = generadorDePaginas();

            //Sacamos la pagina y si el generador ha terminado (true) o no (false)
            const { value: pagina, done } = generadorPaginas.next();

            //Si el generador no ha terminado (false) que busque los siguientes resultados
            if (!done) {
                //Función para filtrar los resultados
                buscarResultados(busqueda);
            }

        };
    });

    //Función que define como se van a mostrar los resultados
    function mostrarResultados() {
        div_result.innerHTML = '';
        //Se recorre el array con los elementos que coinciden con la búsqueda del usuario
        array_Datos.forEach(datos => {
       
            //Se crean tantos divs como resultados hayan
            const div_pricipal = document.createElement('div')
            div_pricipal.innerHTML = ''
            div_pricipal.className = 'w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3'
            div_result.appendChild(div_pricipal)
            const div_2 = document.createElement('div')
            div_2.className = 'bg-white'
            div_pricipal.appendChild(div_2);


            const img = document.createElement('img')
            img.src = datos.previewURL
            img.alt = 'img'
            img.className = 'w-full'
            div_2.appendChild(img)

            const div_info = document.createElement('div')
            div_info.className = 'p-4'
            div_2.appendChild(div_info)


            const div_likes = document.createElement('div')
            div_likes.className = 'font-bold'
            div_likes.innerHTML = datos.likes + ` <span class = font-light>/Me gusta</span>`
            div_info.appendChild(div_likes)

            const div_vistas = document.createElement('div')
            div_vistas.className = 'font-bold'
            div_vistas.innerHTML = datos.views + `<span class = font-light>/Veces Vista</span>`
            div_info.appendChild(div_vistas)

            const div_res = document.createElement('div')
            div_res.className = 'block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1'
            div_res.innerHTML = `<a href="${datos.largeImageURL}">VER IMAGEN</a>`
            div_info.appendChild(div_res)

        }
        )
    }

    //Función que filtra los resultados a través de las url según la búsqueda del usuario
    function buscarResultados(busqueda) {

        //Saca el valor de la siguiente pagina (1,2,3....)
        const pagina = generadorPaginas.next().value;
        //URL con key, busqueda y la pagina (page)
        //page=${pagina} devuelve atomátimanete los siguientes 40 resultados
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=40&page=${pagina}`;

        //Función para buscar los datos en la api
        obtenerDatos(url, busqueda)
    }

    //Con ASYNC/AWAIT
    //async --> devuelve automáticamente una promesa
    //await --> espera el resultado de una promesa antes de seguir
    async function obtenerDatos(url, busqueda) {
        try {
            //Obtenemos resultados
            const api = await fetch(url)
            const datos = await api.json()

            array_Datos = datos.hits;
            console.log(array_Datos);

            //Sacamos los resultados totales 
            total_result = datos.totalHits

            //Mostramos los resultados de array_Datos
            mostrarResultados();

            //Creamos la siguiente pagina a través de la búsqueda y los resultados totales
            boton_pag(busqueda, total_result);

        } catch (error) {
            console.error(error)
        }

    }
    function boton_pag(busqueda, total_result) {

        //Math.ceil Redondea hacia arriba
        //Sacamos la cantidad de paginas que hay
        let cant_result = Math.ceil(total_result / 40);

        //Limpiamos la paginación anterior
        paginacion.innerHTML = '';

        //Creamos tantos botones como páginas hayan
        for (let i = 0; i < cant_result; i++) {
            const boton_pag = document.createElement('button');
            boton_pag.textContent = `${i}`;
            boton_pag.className = 'bg-yellow-400 px-4 py-1 mr-2 font-bold mb-4 rounded';
            paginacion.appendChild(boton_pag);

            //Evento click a cada botón
            boton_pag.addEventListener('click', () => {

                //Esto sube al inicio de la página cada vez que se pasa de página
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' //Animación
                });

                //El generador avanza a la siguiente página
                generadorPaginas.next();
                //Cada vez que se clique a una nueva pagina, se buscarán los resultados de la siguiente página
                buscarResultados(busqueda);
            });
        }





    }
})




