import { defineStore } from "pinia";
import { onMounted, reactive, ref } from "vue";
import APIService from "@/services/APIService";



export const useBebidasStore = defineStore('bebidas', () => {
    
    const categorias = ref([]);
    const busqueda = reactive({
        nombre: "",
        categoria: ""});

    /*Se accede a los datos de la API*/
    onMounted(async () => {
        const {data: {drinks}} = await APIService.obtenerCategorias(busqueda);
        console.log(drinks)
        categorias.value  = drinks
    })

    function ObtenerRecetas(){
        console.log('api');
    }

    return{
        categorias,
        busqueda,
        ObtenerRecetas
    }


})