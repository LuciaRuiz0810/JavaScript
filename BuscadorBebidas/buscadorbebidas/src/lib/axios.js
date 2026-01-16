import axios from "axios";

/*Fichero con la url base */
const api = axios.create({
        baseURL:'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api;