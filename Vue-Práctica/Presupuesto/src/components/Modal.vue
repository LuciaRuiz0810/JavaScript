<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img :src="cerrarModal" alt="CerrarModal" @click="$emit('ocultar-modal')">
        </div>
        <!--Si animar es true, añadirá la clase .contenedor-formulario.animar, si es false .contenedor-formulario.cerrar-->
        <div class="contenedor contenedor-formulario" :class="{ animar: modal.animar, cerrar: !modal.animar }">
            <form class="nuevo-gasto" @submit.prevent="validarGasto">
                <legend>{{ id ? 'Guardar Cambios' : 'Añadir Gasto' }}</legend>
                <!--Esto es lo que se ve dentro del slot en Alerta.vue-->
                <Alerta v-if="error">
                    {{ error }}
                </Alerta>

                <div class=campo>
                    <label for="nombre">Nombre Gasto :</label>
                    <input type="text" id="nombre" placeholder="Añade el nombre del Gasto" :value="nombre"
                        @input="$emit('update:nombre', $event.target.value)" />
                </div>
                <div class=campo>
                    <label for="cantidad">Cantidad :</label>
                    <input type="number" id="cantidad" placeholder="Añade la cantidad" :value="cantidad"
                        @input="$emit('update:cantidad', +$event.target.value)" />
                </div>

                <div class=campo>
                    <label for="categoria">Categoría :</label>
                    <select id="categoria" :value="categoria" @input="$emit('update:categoria', $event.target.value)">
                        <option value=""> -- Selecciona --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Cesta compra</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="gastos">Gastos Varios</option>
                    </select>
                </div>
                <input type="submit" :value="[id ? 'Guardar Cambios' : 'Añadir Gasto']">
            </form>
            <!--El botón solo se mostrará cuando exista el gasto previamente-->
            <button v-if="props.id !== null" type="button" class="btn-eliminar" @click="$emit('eliminar-gasto', props.id); $emit('ocultar-modal')" >
               Eliminar Gasto
            </button>
        </div>
    </div>
</template>

<script setup>
import Alerta from './Alerta.vue';
import { ref } from 'vue';
import cerrarModal from '../assets/cerrar.svg';
const emit = defineEmits(['ocultar-modal', 'update:nombre', 'update:cantidad', 'update:categoria', 'guardar-Gasto','eliminar-gasto']);

const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    id: {
        type: [String, null],
        required: true
    }
})

const error = ref('')
const cantidadAnterior = ref(props.cantidad)

function validarGasto() {
    let valido = true;
    error.value = ''

    //Campos obligatorios
    if (props.nombre == '' || props.categoria == "") {
        valido = false;
        error.value = 'TODOS LOS CAMPOS SON OBLIGATORIOS!';
        setTimeout(() => {
            error.value = ''
        }, 2000);
        return;
    }

    //verificar que la cantidad sea mayor que 0
    if (Number(props.cantidad) <= 0) {
        valido = false;
        error.value = 'LA CANTIDAD DEBE SER SUPERIOR A 0!';
        setTimeout(() => {
            error.value = ''
        }, 2000);
        return;
    }

    //Verificar presupuesto (EDITAR GASTO)
    if (props.id) {
        //Sumamos lo gastado anteriormente con lo disponible
        const Total = cantidadAnterior.value + props.disponible

        //Si la nueva cantidad introducida es mayor, salta el error
        if (Number(props.cantidad) > Total) {
            valido = false;
            error.value = 'HAS EXCEDIDO EL PRESUPUESTO';
            setTimeout(() => { error.value = '' }, 2000);
            return;
        }
    } else {
        //Si no existe el id, se crea un nuevo gasto y se comprueba que no exceda el presupuesto
        if (Number(props.cantidad) > props.disponible) {
            valido = false;
            error.value = 'HAS EXCEDIDO EL PRESUPUESTO';
            setTimeout(() => { error.value = '' }, 2000);
            return;
        }
    }

    //Si todo es válido, emitir el evento
    if (valido) {
        emit('guardar-Gasto')
    }
}
</script>

<style scoped>
.modal {
      position: absolute;
      background-color: rgb(0 0 0 / 0.9);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .cerrar-modal {
      position: absolute;
      right: 3rem;
      top: 3rem;
    }

    .cerrar-modal img {
      width: 3rem;
      cursor: pointer;
    }

    .contenedor-formulario {
      transition-property: all;
      transition-duration: 300ms;
      transition-timing-function: ease-in;
      opacity: 0;
    }

    .contenedor-formulario.animar {
      opacity: 1;
    }

    .contenedor-formulario.cerrar {
      opacity: 0;
    }

    .nuevo-gasto {
      margin: 10rem auto 0 auto;
      display: grid;
      gap: 2rem;
    }

    .nuevo-gasto legend {
      text-align: center;
      color: var(--blanco);
      font-size: 3rem;
      font-weight: 700;
    }

    .campo {
      display: grid;
      gap: 2rem;
    }

    .nuevo-gasto input,
    .nuevo-gasto select {
      background-color: var(--gris-claro);
      border-radius: 1rem;
      padding: 1rem;
      border: none;
      font-size: 2.2rem;
    }

    .nuevo-gasto label {
      color: var(--blanco);
      font-size: 3rem;
    }

    .nuevo-gasto input[type="submit"] {
      background-color: var(--azul);
      color: var(--blanco);
      font-weight: 700;
      cursor: pointer;
    }

    .btn-eliminar {
      border-radius: 1rem;
      border: none;
      padding: 1rem;
      width: 100%;
      background-color: #ef4444;
      font-weight: 700;
      font-size: 2.2rem;
      color: var(--blanco);
      margin-top: 10rem;
      cursor: pointer;
    }
    </style>

<style scoped>
    .presupuesto {
      width: 100%;
    }

    .campo {
      display: grid;
      gap: 2rem;
    }

    .presupuesto label {
      font-size: 2.2rem;
      text-align: center;
      color: var(--azul);
    }

    .presupuesto input[type="number"] {
      background-color: var(--gris-claro);
      border-radius: 1rem;
      padding: 1rem;
      border: none;
      font-size: 2.2rem;
      text-align: center;
    }

    .presupuesto input[type="submit"] {
      background-color: var(--azul);
      border: none;
      padding: 1rem;
      font-size: 2rem;
      text-align: center;
      margin-top: 2rem;
      color: var(--blanco);
      font-weight: 900;
      width: 100%;
      transition: background-color 300ms ease;
    }

    .presupuesto input[type="submit"]:hover {
      background-color: #1048A4;
      cursor: pointer;
    }
</style>