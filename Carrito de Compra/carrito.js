// @ts-nocheck

let array_Carrito;

document.addEventListener("DOMContentLoaded", function () {

    //Esto recupera los productos de localStorage para añadirlos al carrito
    //Si no contiene nada, lo mantiene como array
    array_Carrito = JSON.parse(localStorage.getItem('Producto')) || [];
    if (!Array.isArray(array_Carrito)) {
        array_Carrito = [];
    }

    //Mostramos el carrito nada más iniciar la página
    //Esto mostrará directamente los productos que ya estaban almacenados en localStorage gracias a la comprobación anterior
    mostrarCarrito();

    function crear_curso(e) {
        /*e.target → el elemento HTML donde ocurrió el clic */
        e.preventDefault(); // para que no suba al inicio de la página

        //Accedemos al padre mas cercano donde se encuentra la imagen.
        const curso_seleccionado = e.target.closest('.card');

        //seleccionamos el src de la img, y el contenido de titulo y precio
        const imagen = curso_seleccionado.querySelector('.imagen-curso.u-full-width').src;
        const Titulo = curso_seleccionado.querySelector('.info-card h4').textContent;
        const Precio = curso_seleccionado.querySelector('.u-pull-right ').textContent;


        //Seleccionamos el id de ese (e) curso
        /*Se debe usar e.target.getAttribute('data-id') o e.target.dataset.id porque es data-id*/
        const Id = e.target.getAttribute('data-id');


        /*Objeto Literal */
        const curso = {
            Id: Id,
            imagen: imagen,
            Titulo: Titulo,
            Precio: Precio,
            Cantidad: 1
        };


        //Buscamos si existe el id en el array
        const buscarCurso = array_Carrito.find(item => item.Id === curso.Id);

        //Si existe, sumará uno la cantidad del curso ya existente del array
        if (buscarCurso) {
            buscarCurso.Cantidad++;

        } else {
            //Si no existe lo incuirá en el array
            array_Carrito.push(curso);


        }

        //Volvemos a mostrar el carrito
        mostrarCarrito();

        //Actualizamos el localStorage con los nuevos productos introducidos
        const json = JSON.stringify(array_Carrito)
        localStorage.setItem('Producto', json);
        console.log(window.localStorage)
    }


    function mostrarCarrito() {
        //Seleccionamos el elemento del carrito
        const lista_carrito = document.querySelector('.u-full-width');
        //Borramos el contenido
        lista_carrito.innerHTML = ` <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>`;

        //Volvemos a pintar la lista a través del array ya que es donde las cantidades están actualizadas
        //Si lo pintaramos directamente desde los cursos, la cantidad siempre sería 1
        //Debemos recorrer el array para ir mostrando la información de cada curso
        array_Carrito.forEach(curso => {
            lista_carrito.innerHTML += `<tr><td><img src ="${curso.imagen}" width = '100'></td>
        <td>${curso.Titulo}</td><td>${curso.Precio}</td><td>${curso.Cantidad}</td>  <td>
                                                    <a href='#' class='borrar-curso' data-id="${curso.Id}"> X </a>
                                                </td>`;
        });


    }


    function borrar(x) {
        x.preventDefault();
        const lista_carrito = document.querySelector('.u-full-width');
        //Seleccionamos el id del elemento a elimminar
        const id_eliminar = x.target.getAttribute('data-id');

        //Actualizamos el array excluyendo el curso con el id anterior
        array_Carrito = array_Carrito.filter(productos => String(productos.Id) !== id_eliminar)

        //Volvemos a mostrar el carrito
        mostrarCarrito();
        
        //Actualizamos el localStorage pero sin el producto eliminado
        const json = JSON.stringify(array_Carrito)
        localStorage.setItem('Producto', json)
        console.log(window.localStorage)


    };

    function vaciar(v) {
        v.preventDefault();
        //Seleccionamos el carrito
        const lista_carrito = document.querySelector('.u-full-width');
        //Vaciamos el array
        array_Carrito = [];
        //Escribimos las secciones
        lista_carrito.innerHTML = ` <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>`;


        //Actualizamos el localStorage con el array vacio
        const json = JSON.stringify(array_Carrito)
        localStorage.setItem('Producto', json)
        console.log(window.localStorage)

    }
    //Seleccionamos todos los botones con la clase ".agregar-carrito"
    const botones_cursos = document.querySelectorAll(".agregar-carrito");

    /*recorre todos los botones y hace que todos escuchen el clic y ejecuten la función */
    botones_cursos.forEach(botones => {
        botones.addEventListener('click', crear_curso);


    });

    //Seleccionamos la tabla
    const tabla = document.querySelector('.u-full-width');

    //La tabla siempre va a existir en la página, por lo tanto, desde aqui podemos ir identificando los botones de elimnar nuevos
    // 'e' es el elemento exacto donde se hizo el click
    //e.target.classList.contains('borrar-curso') --> Si el elemento contiene la clase 'borrar-curso' se ejectua la función borrar
    //A borrar le pasamos el elemento clicado 'e'
    /*Esto se debe hacer porque los botones se van creando después, esto significa que si usara querySelectorAll al principio
     me daría una lista vacía y los que se vayan creando después no los verá y por lo tanto no funcionarán.*/
    tabla.addEventListener('click', function (e) {
        if (e.target.classList.contains('borrar-curso')) {
            borrar(e);
        };



    });

    //Seleccionamos el botón vaciar carrito
    const vaciar_carrito = document.querySelector('#vaciar-carrito');
    vaciar_carrito.addEventListener('click', vaciar);












});




