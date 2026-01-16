<template>
    <form action="" class="presupuesto" @submit.prevent="validarPresupuesto">
        <!--Esto es lo que se ve dentro del slot en Alerta.vue-->
        <Alerta v-if="error">
            {{ error }}
        </Alerta>

        <div class="campo">
            <label for="nuevo-presupuesto">Definir Presupuesto</label>
            <input v-model="presupuestoInicial" type="number" id="nuevo-presupuesto" class="nuevo-presupuesto"
                placeholder="Indica tu presupuesto">
        </div>
        <input type="submit" value="Aceptar">

    </form>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Alerta from './Alerta.vue';


const presupuestoInicial = ref(0)
const error = ref('')


const emit = defineEmits(['definir-presupuesto'])

//Función que valida el presupuesto introducido
const validarPresupuesto = () => {
    //Reinicia el valor del error
    error.value = ''

    //Si el presupuesto es menor o igual que 0, le da valor a error, por lo tanto, se mostrará en el slot
    if (presupuestoInicial.value <= 0) {
        error.value = 'El presupuesto introducido es incorrecto!';

        setTimeout(() => {
            presupuestoInicial.value = 0;
            error.value = ''
        }, 3000);

        return;
    }   //Envia el valor de presupuestoInicial a App
    emit('definir-presupuesto', presupuestoInicial.value)
}

</script>

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