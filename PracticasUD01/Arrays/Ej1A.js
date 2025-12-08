const lista1 = [];
let elementos = '';
let continuar = true;
do {
    elementos = prompt('Introduce elementos:')

    /*Primero filtramos que el valor no sea nulo, sino  "null" entrará en lista1 y dará error en filter*/
    if (elementos == null || elementos == '') {
        continuar = false;
    } 

    /*Introducimos los elementos válidos al array*/
     lista1.push(elementos);

    /*Si continuar es true seguirá el bucle*/
} while (continuar == true)


/*.Filter, crea un nuevo array filtrado a partir del original */
/* !valor.trim().includes(' ') --> Los valores que contengan espacios entre medias serán exlcuidos (!)*/
/* !/\d/.test(valor) --> Los valores que contengan números se excluirán (!)*/
/*valor && evita errores con null */
let nuevo = lista1.filter(valor => valor && !valor.trim().includes(' ') &&  !/\d/.test(valor));

/*.sort lo ordena alfábeicamente */
/*Localcompare coge los pares (a,b), alfabéticamente => a.localcompare(b)/...  descendente => b.localcompare(a) */
nuevo.sort((a,b)  => b.localeCompare(a));


/*Imprimimos el array ya ordenado*/
/*foreach recorre los elementos, la i es el índice (0,1,2,3)*/
nuevo.forEach((elementos, i) => {
    console.log(`El elemento ${i} es: ${elementos}`);
})
