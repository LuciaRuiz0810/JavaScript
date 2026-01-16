<script setup>
import Presupuesto from './components/Presupuesto.vue';
import { ref, reactive, onMounted, computed, watch } from 'vue';
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from './assets/nuevo-gasto.svg';
import Modal from './components/Modal.vue';
import { generarId } from './helpers/index.js';
import Gasto from './components/Gasto.vue';
import Filtro from './components/Filtro.vue';

const presupuesto = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const filtro = ref('')
//Array vacio
const gastos = ref([])

const modal = reactive({ //Reactive se usa para agrupaciones de datos (objetos)
  mostrar: false,
  animar: false
});

const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null,
  fecha: new Date()
})

//Solo se observa 'gastos' porque es la variable que cambia y el resto cambian a raiz de esta (disponible)
//nuevoGastos es el array de gastos actualizado
watch(gastos, (nuevoGastos) => {

  gastado.value = nuevoGastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0)

  disponible.value = presupuesto.value - gastado.value

  if (disponible.value < 0) {
    disponible.value = 0
  }
  //Se actualizan los valores en LocalStorage
  guardarLocalStorage()
}, { deep: true })

const guardarLocalStorage = () => {
  localStorage.setItem('gastos', JSON.stringify(gastos.value));

  if (presupuesto.value > 0) {
    localStorage.setItem('presupuesto', presupuesto.value.toString());
  }
}


onMounted(() => {
  //Cargar presupuesto desde localStorage
  const localStoragePresupuesto = localStorage.getItem('presupuesto');
  if (localStoragePresupuesto !== null) {
    presupuesto.value = Number(localStoragePresupuesto);
  }

  //Cargar gastos desde localStorage
  const localStorageGastos = localStorage.getItem('gastos');
  if (localStorageGastos !== null) {
    gastos.value = JSON.parse(localStorageGastos);
  }

  //Calcular disponible basado en presupuesto y gastos cargados
  const localStorageDisponible = localStorage.getItem('gastos');
  if (localStorageDisponible !== null) {
    disponible.value = JSON.parse(localStorageDisponible);
  }
});

//presupuestoInicial es el valor que obtiene definirPresupuesto
const definirPresupuesto = (presupuestoInicial) => {
  //Asignamos el valor a presupuesto
  presupuesto.value = presupuestoInicial;
  disponible.value = presupuestoInicial;
   localStorage.setItem('presupuesto', presupuestoInicial.toString());
}

//Muestra el modal en CREAR gasto
function mostrarModal() {
  gasto.id = null
  gasto.nombre = ''
  gasto.cantidad = ''
  gasto.categoria = ''
  gasto.fecha = new Date()

  modal.mostrar = true;

  //Abrir modal sin  valores asignados (se mostrá 'Añadir Gasto')
  setTimeout(() => {
    modal.animar = true;
  }, 500);
}

//oculta el modal
function ocultarModal() {
  modal.animar = false;

  setTimeout(() => {
    modal.mostrar = false;
  }, 500);
}

//Esta función comprueba si el gasto existe o no en el array y hace lo que corresponda (crearlo o editarlo)
function guardarGasto() {

  ocultarModal();
  console.log(gasto);

  if (gasto.id) {
    const posicion = gastos.value.findIndex(gastos => gastos.id === gasto.id)

    //Si la posición se encuentra, que actualice todos los valores menos la fehca.
    if (posicion !== -1) {
      gastos.value[posicion] = {
        ...gasto,
        fecha: gasto.fecha  //Se mantiene la fecha
      }
    }
  } else {
    gastos.value.push({
      ...gasto,          //copiamos los valores actuales
      id: generarId(),   //se genera el id
      fecha: new Date()
    })

  }
  //resetear formulario
  gasto.nombre = ''
  gasto.cantidad = ''
  gasto.categoria = ''
  gasto.id = null
  gasto.fecha = new Date()
}

function seleccionarGasto(id) {
  const gastoEditar = gastos.value.find(gasto => gasto.id === id)
  gasto.nombre = gastoEditar.nombre
  gasto.cantidad = gastoEditar.cantidad
  gasto.categoria = gastoEditar.categoria
  gasto.id = gastoEditar.id
  gasto.fecha = gastoEditar.fecha

  //Abrir modal con los valores asignados (se mostrá 'Guardar Cambios')
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 500);
}

//Elimar gastos existentes
function eliminar_gasto(id) {
  const gastos_nuevos = () => gastos.value.filter(element => element.id !== id);
  gastos.value = gastos_nuevos();
  console.log(gastos)
}

//Computed --> la variable se va transformado antes de devolver su valor
//Si el filtro contiene valor, se devuelve el array solo con la categoria del filtro, sino se devuelve el array original
const filtrado = computed(() => {
  if (filtro.value !== '') {
    return gastos.value.filter(element => element.categoria === filtro.value);
    ;
  } else {
    return gastos.value;
  }
})

function resetearApp(){
  //Limpiar localStorage
  localStorage.clear();
  
  presupuesto.value = 0;
  gastos.value = [];
  disponible.value = 0;
  gastado.value = 0;
  filtro.value = '';
  
  modal.mostrar = false;
  modal.animar = false;
}
</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>
      <!--v-if si el presupuesto es = 0, se mostrará el formulario, sino desaparecerá el componente del DOM-->
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="presupuesto == 0" @definir-presupuesto="definirPresupuesto" />
        <!--:presupuesto="presupuesto" 
       :presupuesto es el nombre que va a recibir el componente 
       "presupuesto"  es exactamente el nombre del state en App.vue-->
        <ControlPresupuesto v-else :presupuesto="presupuesto" :disponible="disponible" :gastos="gastos"
          :gastado="gastado"  @reset-app="resetearApp"/>
      </div> <!--Obtiene el valor enviado-->
    </header>

    <main>
      <Filtro v-if="presupuesto !== 0" v-model:filtro="filtro" />
      <div class="crear-gasto" v-if="presupuesto > 0">
        <img :src="iconoNuevoGasto" alt="icono nuevo gasto" @click="mostrarModal">
      </div>
      <!--Pasar objeto completo con :gasto="gasto" (SOLO LECTURA),
      Con v-model (LECTURA Y ESCRITURA)-->
      <Modal v-if="modal.mostrar == true" :modal="modal" @ocultar-modal="ocultarModal" @guardar-Gasto="guardarGasto"
        v-model:nombre="gasto.nombre" v-model:cantidad="gasto.cantidad" v-model:categoria="gasto.categoria"
        :disponible="disponible" :id="gasto.id" @eliminar-gasto="eliminar_gasto" />
      <div class="listado-gastos contenedor">

        <h2 v-if="presupuesto > 0"> {{ gastos.length > 0 ? 'Gastos:' : 'No hay gastos' }} </h2>
        <!--Se recorre el array y cada gasto encontrado se pasa al componente Gasto para obtener su información-->
        <Gasto v-for="gasto in filtrado" :gasto="gasto" @seleccionarGasto="seleccionarGasto" />
      </div>
    </main>
  </div>
</template>

<style>

:root {
    --azul: #3b82f6;
    --blanco: #FFF;
    --gris-claro: #F5F5F5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  header {
    background-color: var(--azul);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }

  .contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .sombra {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  .crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  .crear-gasto img {
    width: 5rem;
    cursor: pointer;
  }

  .listado-gastos {
    margin-top: 10rem;
  }

  .listado-gastos h2 {
    font-weight: 900;
    color: var(--gris-oscuro);
  }

  .fijar {
    overflow: hidden;
    height: 100vh;
  }
  </style>
