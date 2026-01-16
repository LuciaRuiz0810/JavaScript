import Header from "./components/header.jsx";
import Guitarra from "./components/Guitarra.jsx";
import { useEffect, useState } from "react";
import { db } from "./data/db.js";

function App() {

    //Recuperamos los datos de localStorage para poder iniciar el state
    // como corresponda según si tiene articulos o no
    const carritoInicial = () => {
        const localStorageCarrito = localStorage.getItem('carrito')
        //Si hay un carrito guardado en localStorage, lo recuperas y lo conviertes a array(parse)
        //Si no hay carrito (es null), empieza con un array vacío.
        return (localStorageCarrito != null) ? JSON.parse(localStorageCarrito) : [];
    }

    const [data] = useState(db);
    const [carrito, setCarrito] = useState(carritoInicial)

   //Añadimos el articulo nuevo al carrito en localStorage
   //useEffect ejecuta la función cada vez que cambie algo dentro de su lista de dependencias
   //en este caso 'carrito'
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    function anyadircarrito(articulo) {
        //Se busca dentro del array carrito el articulo clicado a través del id
        const articuloExiste = carrito.findIndex(element => articulo.id === element.id);

        if (articuloExiste >= 0) {
            //Copia del carrito (NO se puede modificar el ORIGINAL)
            const copiaCarrito = [...carrito];

            //Se agrega la cantidad al articulo existente en la COPIA
            copiaCarrito[articuloExiste].cantidad++;

            //Se modifica el estado del carrito con la copia modificada
            setCarrito(copiaCarrito);


        } else {
            //Se crea el atributo cantidad si la guitarra no existia
            //anteriormente
            articulo.cantidad = 1;
            setCarrito(carrito => [...carrito, articulo])
        }

    }

    function eliminarDelCarrito(id) {
        const nuevoCarrito = () => carrito.filter(element => element.id !== id);
        setCarrito(nuevoCarrito);
    }

    function disminuirCantidad(id) {
        const copiaCarrito = [...carrito];

        const articuloExiste = carrito.findIndex(element => element.id === id);

        if(copiaCarrito[articuloExiste].cantidad !== 1)
        //Se agrega la cantidad al articulo existente en la COPIA
        copiaCarrito[articuloExiste].cantidad--;

        //Se modifica el estado del carrito con la copia modificada
        setCarrito(copiaCarrito);
    }

    
    function aumentarCantidad(id) {

        const copiaCarrito = [...carrito];

        const articuloExiste = carrito.findIndex(element => element.id === id);

        //Se agrega la cantidad al articulo existente en la COPIA
        copiaCarrito[articuloExiste].cantidad++;

        //Se modifica el estado del carrito con la copia modificada
        setCarrito(copiaCarrito);

    }

    function vaciarCarrito(){
        setCarrito([])
    }

    return (
        <>

            <Header
                //Le pasamos el state carrito al header (para pintarlo dinamicamente)
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                disminuirCantidad={disminuirCantidad}
                aumentarCantidad={aumentarCantidad}
                vaciarCarrito = {vaciarCarrito}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map(element => (
                        <Guitarra
                            key={element.id}
                            guitarraObj={element}
                            anyadircarrito={anyadircarrito}
                        />
                    ))}

                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
