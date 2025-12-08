
import { cursos } from "./curso.js";

let array_lista = [];

window.addEventListener('load', () => {
    let img
    let titulo
    let precio
    let id
    let contiene = false;

    const botones_agregar = document.querySelectorAll('.agregar-carrito')
    const lista = document.querySelector('tbody')
    const vaciar = document.querySelector('#vaciar-carrito')

    //Esto recupera los productos de localStorage para añadirlos al carrito
    //Si no contiene nada, lo mantiene como array
    array_lista = JSON.parse(localStorage.getItem('Producto')) || [];
    if (!Array.isArray(array_lista)) {
        array_lista = [];
    }

    pintar_Carrito()


    botones_agregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault()

            //Seleccionamos todos los elementos de ese card al que le hemos hecho click
            const seleccionado = e.target.closest('.card');

            id = e.target.getAttribute('data-id');
            img = seleccionado.querySelector('img').src
            titulo = seleccionado.querySelector('h4').textContent
            precio = seleccionado.querySelector('span').textContent

            //Buscar el id en el array por si existe, modificar la cantidad
            array_lista.forEach(prod => {
                if (prod.id == id) {
                    prod.cantidad = prod.cantidad + 1;
                    contiene = true;
                     const productoString = JSON.stringify(array_lista)
                    localStorage.setItem('Producto', productoString)

                }
            })
            //Si no existe se crea uno nuevo y se añade
            if (!contiene) {
                añadir()
            }

            pintar_Carrito();
        })
    })

    //Añadir el curso
    function añadir() {
         const curso_nuevo = new cursos(img, titulo, precio, id, 1);
        array_lista.push(curso_nuevo)
        const productoString = JSON.stringify(array_lista)
        localStorage.setItem('Producto', productoString)

    }

    function pintar_Carrito() {
        lista.innerHTML = ''
        array_lista.forEach(producto => {
            lista.innerHTML += ` <tr>
                                        <td>
                                             <img src = "${producto.imagen}" width = '100'>
                                                </td>
                                                <td>${producto.titulo}</td>
                                                <td>${producto.precio}</td>
                                                <td>${producto.cantidad}</td>
                                                <td>
                                                    <a href='#' class='borrar-curso' data-id="${producto.id}"> X </a>
                                                </td>
                                            </tr>`
        })

        const eliminar = document.querySelectorAll('.borrar-curso')
        //Evento eliminar a todos los botones
        eliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault()
                const curso = e.target.getAttribute('data-id')
                borrar(curso);
            })
        })
    }

    function borrar(curso) {
        //Filtra el array para borrar esa id
        array_lista = array_lista.filter(productos => String(productos.id) !== curso)
        const productoString = JSON.stringify(array_lista)
        localStorage.setItem('Producto', productoString)
        pintar_Carrito()
    }

    
    vaciar.addEventListener('click', (e) => {
        e.preventDefault()
        array_lista = [];
        localStorage.clear()
        pintar_Carrito()
    })

})