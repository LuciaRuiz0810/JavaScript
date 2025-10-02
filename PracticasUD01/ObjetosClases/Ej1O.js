let min = Number(prompt('Introduce el mínimo'))
let max = Number(prompt('Introduce el máximo'))

/*Comprobaciones para que el número sea válido */
while (min > max || max < min || isNaN(min) || isNaN(max)) {

    /*Si No Es un Número, vuelve a preguntar */
    if (isNaN(min) || isNaN(max)) {
        alert('Debes introducir un número!')
        min = Number(prompt('Introduce el mínimo;'))
        max = Number(prompt('Introduce el máximo;'))
    }

    if (min > max) {
        alert('El mínimo debe ser menor que max!')
        min = Number(prompt('Introduce el mínimo;'))
        max = Number(prompt('Introduce el máximo;'))
    }
    if (max > min) {
        break;
    }
}

/*Cramos un objeto con las propiedades min y max */
const objeto = {
    minimo: min,
    maximo: max,
    _vector: [],

    /*Dentro creamos un getter donde se generará el vector */
    get vector() {
        /*Crear array */
        const pruebaArray = [];
        let contador = 0;
        /*Rellenar array */
        for (x = min; x <= max; x++) {
            pruebaArray[contador] = x;
            contador++;
        }
        return pruebaArray;

/*importante: , */
    },

    /*Set dentro del objeto para crear otro array aleatorio */
    /*Debemos pasar un parámetro aunque no se use "prueba" */
    set vector(prueba) {
        const nuevoVector = [];
        /*Asignamos números aleatorios en 5 posiciones */
        for (let x = 0; x < 5; x++) {
            nuevoVector[x] = Math.floor(Math.random() * 101);
        }
        /*Asignamos el nuevo vector a la propiedad _vector */
        this._vector = nuevoVector;

        /*... “desempaqueta” los elementos del array como argumentos separados */
        const minimo2 = Math.min(...this._vector);
        const maximo2 = Math.max(...this._vector);

        console.log('Vector aleatorio:', this._vector);
        console.log('Mínimo:', minimo2);
        console.log('Máximo:', maximo2);
    }
}

/*Para mostrar la información de un objeto, se debe hacer como si fuera en árbol */
console.log('El array con intervalo es: ' + objeto.vector)
console.log('El mínimo es: ' + objeto.minimo)
console.log('El máximo es: ' + objeto.maximo)

/*Asignamos un valor a vector para llamar al set*/ /*DUDA*/
objeto.vector = [];



