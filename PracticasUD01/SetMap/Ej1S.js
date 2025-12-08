const miSet_uno = new Set([]);
const miSet_dos = new Set([]);
let respuesta_user = '';
let valida = false;
const abc = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ';


do {

    respuesta_user = prompt('Letras ("L") o números("N")?')
    if (respuesta_user == null) {
        alert('Has cancelado, el programa no seguirá')
        throw new Error('El usuario ha cancelado')
    }

    if (respuesta_user !== 'L' && respuesta_user !== 'l' && respuesta_user !== 'n' && respuesta_user !== 'N') {
        alert('Valor no válido!');
        continue;

    } else {
        valida = true;
    }

} while (!valida)


if(respuesta_user == 'n' || respuesta_user  == 'N'){

    /*Si usara for set ominitiria los valores duplicados y no se haria del size indicado */
    /* while asegura que hasta que no sea de size 20 no acabará el bucle, por lo tanto
    tendrá 20 valores diferentes*/

    while(miSet_uno.size < 10){
        let aleatorio = Math.round(Math.random() * 21)
        miSet_uno.add(aleatorio);
    }
       
     while(miSet_dos.size < 10){
        let aleatorio = Math.round(Math.random() * 21)
        miSet_dos.add(aleatorio);
     } 

} 


if(respuesta_user == 'l' || respuesta_user == 'L'){
      while(miSet_uno.size < 10){
        let numero_al = Math.floor(Math.random() * abc.length)
        let aleatorio = abc[numero_al]
        miSet_uno.add(aleatorio);
    }

      while(miSet_dos.size < 10){
        let numero_al = Math.floor(Math.random() * abc.length)
        let aleatorio = abc[numero_al]
        miSet_dos.add(aleatorio);
    }
}

console.log(miSet_uno)
console.log(miSet_dos)
console.log('La unión de los conjuntos es:')
/*Spread operator para unir dos sets en uno */
const conjunto = new Set([...miSet_uno, ...miSet_dos]);
console.log(conjunto)
console.log('Los elementos comunes son:')

/*Recorremos para comprobar elemento por elemento si también están en el segundo */
const comunes = new Set([])
miSet_uno.forEach((element) => {
    if(miSet_dos.has(element)){
        comunes.add(element)
    }
});

console.log(comunes)
console.log('Los elementos del primer conjunto que no están en el segundo son:')

/*Recorremos para comprobar elemento por elemento si no están en el segundo */
const no_Estan = new Set([])
miSet_uno.forEach((element) => {
    if(!miSet_dos.has(element)){
        no_Estan.add(element)
    }
});
console.log(no_Estan)