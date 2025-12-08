//Acciones con la API de Json Server

export class api_nueva {

    añadir(cliente, url) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    eliminar(id, url) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    }

    actualizar(cliente, url,id) {
          fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        }
        
    async obtenerDatos(url) {
        try {
            //Obtenemos resultados
            const api = await fetch(url)
            let datos = await api.json()
            return datos;
        } catch (error) {
            console.error(error)
        }

    }

}
