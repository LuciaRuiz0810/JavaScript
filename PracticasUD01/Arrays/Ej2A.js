let array_Aleatorio = [];
let array_pares = [];
let array_impares = [];
let array_final = [];
let suma_impar = 0;
let suma1 = 0;
let media1 = 0;
let media2 = 0;
let multi1 = 0;
let suma_impar_dos = 0;
let suma2 = 0;
let multi2 = 0;
let num_aleatorio = 0;

/*Creamos un array con 20 posiciones */
for (let x = 0; x < 20; x++) {

    /*Añadimos numeros aleatorios enteros a cada índice */
    num_aleatorio = Math.floor(Math.random() * 11);
    array_Aleatorio[x] = num_aleatorio;

}
console.log(array_Aleatorio);

array_Aleatorio.forEach(element => {
    if (element % 2 === 0) {
        array_pares.push(element);
    } else if (element % 2 != 0) {
        array_impares.push(element);
    }
});

/*Elimina el último elemento del array con pop y el primer elemento con slice*/
/*Splice coge el elemento que está entre la posición 0 y elimina 1 de cantidad (El 0 es el índice y el 1 la cantidad de elementos a eliminar) */
console.log('Array par Original:' + array_pares);
array_pares.pop();

/*OTRA OPCIÓN: array_pares.splice(array_pares.lenght -1, 1) para eliminar el último con splice */
array_pares.splice(0, 1);
console.log('Array pares sin 1º y último:' + array_pares)

/*IMPARES */
/*Si la longitud del array es impar, eliminamos el elemento del medio con  "splice(array_impares.length/2, 1)"*/
console.log('Array_impares Original: ' + array_impares)
if (array_impares.length % 2 !== 0) {
    array_impares.splice(array_impares.length / 2, 1);
    console.log('Array impares sin elementos centrales(IMPAR): ' + array_impares);

    /*Con foreach recorremos los elementos del array y los sumamos entre sí (suma_impar) */
    array_impares.forEach(element => {
        suma_impar = suma_impar + element;

    });
    /*Añadimos la suma al final del array */
    array_impares.push(suma_impar);
    console.log('Array impares sin elementos centrales(IMPAR) con SUMA: ' + array_impares);


    /*Creamos la suma de los elementos sin contar con la última posición */
    for (let x = 0; x < array_impares.length - 1; x++) {
        suma1 = suma1 + array_impares[x];
    }

    /*Sacamos la media de los valores del array ignorando la posición de la suma total para que no la incluya en la media */
    media1 = suma1 / (array_impares.length - 1);

    /*unshift añade el elemento al incio del array */
    array_impares.unshift(parseInt(media1.toFixed(2)));
    console.log('Array impares sin elementos centrales(IMPAR) con SUMA y MEDIA: ' + array_impares);

    /*Recorremos el array y cada multiplicacion la almacenamos y sustituimos el valor de i por la multi */

    array_impares.forEach((element, i) => {
        if (i > 0) {
            multi1 = element * media1;
            array_impares[i] = Math.floor(multi1);
        }
    });
    console.log('Array impares sin elementos centrales(IMPAR) con SUMA, MEDIA y MULTI: ' + array_impares);

    /*PARES */
    /*Si la longitud del array es PAR, dividimos la longitud por la mitad y eliminamos los dos elementos centrales*/
} else if (array_pares.length % 2 == 0) {
    array_impares.splice(array_pares.length / 2, 2);
    console.log('Array par sin elementos centrales (PARES): ' + array_pares);


    /*Con forEach recorremos el array y sumamos los elementos entre sí */
    array_pares.forEach(element => {
        suma_impar_dos = suma_impar_dos + element;
    });

    /*Añadimos la suma al final del array*/
    array_pares.push(suma_impar_dos);
    console.log('Array par sin elementos centrales (PARES) con suma: ' + array_pares)


    /*Creamos la suma de los elementos sin contar con la última posición */
    for (let x = 0; x < array_pares.length - 1; x++) {
        suma2 = suma2 + array_pares[x];
    }
    /*Sacamos la media de los valores del array ignorando la posición de la suma total para que no la incluya en la media */
    media2 = suma2 / (array_pares.length - 1);

    array_pares.unshift(parseInt(media2.toFixed(2)));
    console.log('Array impares sin elementos centrales(PARES) con SUMA y MEDIA: ' + array_pares);

    /*Recorremos el array y cada multiplicacion la almacenamos y sustituimos el valor de i por la multi */

    array_pares.forEach((element, i) => {
        if (i > 0) {
            multi2 = element * media2;
            array_pares[i] = Math.floor(multi2);
        }
    });
    console.log('Array PARES sin elementos centrales(PARES) con SUMA, MEDIA y MULTI: ' + array_pares);

}

/*Unimos los dos arrays */
array_final = array_impares.concat(array_pares);

/*Ordenamos los numeros de menor a mayor
de MAYOR a MENOR es -->  array_final.sort((a,b) => b- a); */
array_final.sort((a, b) => a - b);
console.log('Array FINAL ordenado: ' + array_final)

let array_sinRepetir = [];
let contador = 0;
let anterior = 0;

/*Creamos un array final donde no se encuentren elementos repetidos */
array_final.forEach(element => {
    /*En la primera vuelta se añadirá el elemento */
    if (contador == 0) {
        array_sinRepetir.push(element)
        anterior = element;
        contador = 1;
    }
/*En las siguientes vueltas guardará el elemento anterior para hacer la comparación, si es igual, no se añadirá y así
hasta que encuentre uno diferente */
    if(contador == 1){
    if (element !== anterior) {
        array_sinRepetir.push(element);
         anterior = element;
    }
    }
});
console.log('Array FINAL ordenado sin repetidos: ' + array_sinRepetir)

