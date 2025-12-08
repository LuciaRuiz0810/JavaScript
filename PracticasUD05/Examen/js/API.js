//ASYNC/AWAIT
export async function obtener_datos() {
        const url = 'http://localhost:4000/platillos'
        const f_url = await fetch(url)
        const obj = await f_url.json();
        return obj;
 }


 //FETCH
/*
 export function obtener_datos(){

 fetch('http://localhost:4000/platillos')

        .then(respuesta => respuesta.json())
        .then(datos => {
             const array_datos = datos
            return array_datos})

 }
*/



