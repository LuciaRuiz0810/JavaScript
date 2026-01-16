<template>
    <div class="gasto sombra">
        <img :src="diccionarioIconos[gasto.categoria]" alt="Icono gasto" class="icono">
        <div class="detalles">
            <p class="categoria">{{ gasto.categoria }}</p>
            <p class="nombre" @click="$emit('seleccionarGasto' , gasto.id)">{{ gasto.nombre }} (haz click para editar)</p>
            <p class="fecha"><span>{{ formatearFecha(gasto.fecha) }}</span></p>
            <p class="fecha">{{ formatearCantidad(gasto.cantidad) }}</p>
        </div>
        <p class="cantidad"></p>

    </div>
</template>

<script setup>
import { reactive } from 'vue';
import IconoAhorro from '../assets/icono_ahorro.svg';
import IconoCasa from '../assets/icono_casa.svg';
import IconoComida from '../assets/icono_comida.svg';
import IconoGastos from '../assets/icono_gastos.svg';
import IconoOcio from '../assets/icono_ocio.svg';
import IconoSalud from '../assets/icono_salud.svg';
import IconoSuscripciones from '../assets/icono_suscripciones.svg';
import {formatearFecha, formatearCantidad} from '../helpers/index.js';


const diccionarioIconos = reactive({ //Reactive se usa para agrupaciones de datos (objetos)
    ahorro: IconoAhorro,
    casa: IconoCasa,
    comida: IconoComida,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
});

const props = defineProps({
    gasto: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['seleccionarGasto']);
</script>

<style scoped>
.gasto {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .contenido {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .icono {
      width: 5rem;
    }

    .detalles p {
      margin: 0 0 1rem 0;
    }

    .categoria {
      color: var(--gris);
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: 900;
    }

    .nombre {
      color: var(--gris-oscuro);
      font-size: 2.4rem;
      font-weight: 700;
      cursor: pointer;
    }

    .fecha {
      color: var(--gris-oscuro);
      font-size: 1.6rem;
      font-weight: 900;
    }

    .fecha span {
      font-weight: 400;
    }

    .cantidad {
      font-size: 3rem;
      font-weight: 900;
      margin: 0;
    }
</style>