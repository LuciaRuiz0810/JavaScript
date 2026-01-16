import api from "@/lib/axios";

/*Funciones con las diferentes llamadas a la api según el endpoint */
export default{
    
    obtenerCategorias({categoria, nombre}){
        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    }
}