
let rango_min = ''
let rango_max = ''

let incio = 0
let final = 0

let valido_m = false;

let prueba_map = new Map();
let contador_cant_uno = 0;
let contador_cant_dos= 0;
let contador_cant_tres= 0;
let contador_cant_cuatro= 0;
let contador_cant_cinco= 0;
let contador_cant_seis= 0;
let contador_cant_siete= 0;
let contador_cant_ocho= 0;
let contador_cant_nueve= 0;
let contador_cant_diez= 0;

function rango_minimo() {

    do {
        rango_min = prompt('Indica el mínimo del rango de números:')
        if (rango_min == null) {
            alert('El programa no continuará')
            throw new Error('El usuario ha cancelado')
        }
        incio = Number(rango_min)
        if (isNaN(incio)) {
            alert('Debe ser un valor!');
            continue;
        }

        if (!isNaN(incio)) {
            valido_m = true;
            break;
        }
    } while (!valido_m)

    return incio;
}

function rango_maximo() {
    valido_m = false;
    do {

        rango_max = prompt('Indica el máximo del rango de números:')
        if (rango_max == null) {
            alert('El programa no continuará')
            throw new Error('El usuario ha cancelado')
        }
        final = Number(rango_max)

        if (isNaN(final)) {
            alert('Debe ser un valor!');
            continue;
        }

        if (!isNaN(final)) {
            valido_m = true
            break;
        }
    } while (!valido_m)

    return final;
}

let rango_min_final = 0
let rango_max_final = 0
/*Primero sacamos el rango */
rango_min_final = rango_minimo()
rango_max_final = rango_maximo()

/*Si no tiene sentido se informa y se vuelve a pedir */
while (rango_max_final < rango_min_final) {
    alert('El rango debe tener sentido!')
    rango_min_final = rango_minimo()
    rango_max_final = rango_maximo()
}

let repeticiones = ''
let final_reps = 0

valido_m = false;

do {

    repeticiones = prompt('Indica las repeticiones')
    if (repeticiones == null) {
        alert('El programa no continuará')
        throw new Error('El usuario ha cancelado')
    }
    final_reps = Number(repeticiones)

    if (isNaN(final_reps)) {
        alert('Debe ser un valor!');
        continue;
    }

    if (!isNaN(final_reps)) {
        valido_m = true
        break;
    }
} while (!valido_m)

/*Creamos un map de números aleatorios entre el 1-10 las veces que el usuario ha pedido */
/*Número dentro de RANGO: let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min; */
for(let x = 0; x < final_reps; x++){
    let aleatorio_num = Math.round((Math.random() * rango_max_final - rango_min_final + 1) + rango_min_final)
    prueba_map.set(x,aleatorio_num);
}


for(let [clave,valor] of prueba_map){
if(valor == 1){
    contador_cant_uno++;
}
if (valor == 2){
    contador_cant_dos++;
}

if(valor == 3){
    contador_cant_tres++;
}
if(valor == 4){
    contador_cant_cuatro++;
}
if(valor == 5){
    contador_cant_cinco++;
}
if(valor == 6){
    contador_cant_seis++;
}

if(valor == 7){
    contador_cant_siete++;
}
if(valor == 8){
    contador_cant_ocho++;
}
if(valor == 9){
    contador_cant_nueve++;
}
if(valor == 10){
    contador_cant_diez++;
    prueba_map.get(10) + 1
}
}
/*ARREGLAR 
for(let [clave, valor] of prueba_map){
    document.write(`Número ${clave}: ${valor}`)
}
    */
document.write('Número 1: ' + contador_cant_uno)
document.write('Número 2: ' + contador_cant_dos)
document.write('Número 3: ' + contador_cant_tres)
document.write('Número 4: ' + contador_cant_cuatro)
document.write('Número 5: ' + contador_cant_cinco)
document.write('Número 6: ' + contador_cant_seis)
document.write('Número 7: ' + contador_cant_siete)
document.write('Número 8: ' + contador_cant_ocho)
document.write('Número 9: ' + contador_cant_nueve)
document.write('Número 10: ' + contador_cant_diez)