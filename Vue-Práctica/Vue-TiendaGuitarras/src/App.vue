<script setup>
import { ref, reactive, onMounted } from 'vue';
import { db } from './data/guitarras';
import { watch } from 'vue';
import Guitarra from './components/Guitarra.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


const guitarras = ref([])
const carrito = ref([])
const guitarra = ref({})


//Le da el valor al array cuando se monte
onMounted(() => {
    guitarras.value = db; //ref
    //El valor de la guitarra promocional será la guitarra en la posición 2 del array guitarras
    guitarra.value = guitarras.value[2]

    const localStorageCarrito = localStorage.getItem('carrito')
    if (localStorageCarrito !== null) {
        carrito.value = JSON.parse(localStorageCarrito)
    }
})

const guardarLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

watch(carrito, () => {
    guardarLocalStorage()
}, {
    deep: true
}
)


const agregar_carrito = (guitarra) => {
    const articuloExiste = carrito.value.findIndex(articulos => articulos.id === guitarra.id);

    if (articuloExiste >= 0) {
        //Copia del carrito (NO se puede modificar el ORIGINAL)
        const copiaCarrito = [...carrito.value];

        //Se agrega la cantidad al articulo existente en la COPIA
        copiaCarrito[articuloExiste].cantidad++;

        carrito.value = copiaCarrito;

    } else {
        guitarra.cantidad = 1;
        carrito.value.push(guitarra);
    }

}

const decrementarCantidad = (guitarra) => {
    const articuloIndex = carrito.value.findIndex(articulos => articulos.id === guitarra.id);

    if (articuloIndex >= 0) {
        //Copia del carrito
        const copiaCarrito = [...carrito.value];

        if (copiaCarrito[articuloIndex].cantidad > 1) {
            // Si la cantidad es mayor a 1, solo decrementa

            copiaCarrito[articuloIndex].cantidad--;

            //La copia sustituye el carrito original
            carrito.value = copiaCarrito;
        }
    }
}

const incrementarCantidad = (guitarra) => {
    const articuloIndex = carrito.value.findIndex(articulos => articulos.id === guitarra.id);

    if (articuloIndex >= 0) {
        const copiaCarrito = [...carrito.value];
        //Incrementa la cantidad del articulo
        copiaCarrito[articuloIndex].cantidad++;
        carrito.value = copiaCarrito;
    }
}

const vaciarCarrito = () => {
    carrito.value = ([])
}

const eliminarProducto = (guitarra) => {
    const nuevoCarrito = () => carrito.value.filter(element => element.id !== guitarra.id);
    carrito.value = nuevoCarrito()
}

</script>

<template>
    <Header :carrito="carrito" @decrementarCantidad="decrementarCantidad" @incrementarCantidad="incrementarCantidad"
        :guitarra="guitarra" @agregar-carrito="agregar_carrito" @vaciarCarrito="vaciarCarrito"
        @eliminarProducto="eliminarProducto" />

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <!--Aplicamos la directiva dentro del componente donde está el html para imprimir las guitarras
            Guitarra.vue; Esto :guitarra = "guitarra" pasa la informacion al componente-->
            <Guitarra v-for="guitarra in guitarras" :guitarra="guitarra" :key="guitarra.id"
                @agregar-carrito="agregar_carrito" />
        </div>
    </main>

    <Footer />



</template>

<style></style>
