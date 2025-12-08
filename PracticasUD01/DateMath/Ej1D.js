let fecha1 = prompt('Introduce la primera fecha (dd/mm/aaaa):');
let fecha2 = prompt('Introduce la segunda fecha (dd/mm/aaaa):');
let valido1 = true;
let valido2 = true;
let valido = true;
let fecha2_valida; // ← corregido: no asignar Date
let año_dif = 0;
let fecha1_valida; // ← corregido: no asignar Date

do {
    /*Extraemos los valores de la cadena de texto, los pasamos a números y comprobamos */
    let diaStr1 = fecha1.substring(0, 2);
    let mesStr1 = fecha1.substring(3, 5);
    let añoStr1 = fecha1.substring(6, 10);

    let año1 = Number(añoStr1);
    let mes1 = Number(mesStr1);
    let dia1 = Number(diaStr1);

    if (!isNaN(dia1) && dia1 >= 1 && dia1 <= 31 && !isNaN(mes1) && mes1 >= 1 && mes1 <= 12 && !isNaN(año1) && año1 >= 1900 && año1 <= 2025 && fecha1[2] === '/' && fecha1[5] === '/') {
        valido = true;
    } else {
        valido1 = false;
    }
    /*Si la fecha no es válida, se informa y se vuelve a preguntar */
    if (!valido1) {
        console.log('La fecha 1 no es correcta!');
        valido = false;
        fecha1 = prompt('Introduce la primera fecha (dd/mm/aaaa):');
    }

    /*Extraemos los valores de la cadena de texto, los pasamos a números y comprobamos */
    let diaStr2 = fecha2.substring(0, 2);
    let mesStr2 = fecha2.substring(3, 5);
    let añoStr2 = fecha2.substring(6, 10);
    let año2 = Number(añoStr2);
    let mes2 = Number(mesStr2);
    let dia2 = Number(diaStr2);

    if (!isNaN(dia2) && dia2 >= 1 && dia2 <= 31 && !isNaN(mes2) && mes2 >= 1 && mes2 <= 12 && !isNaN(año2) && año2 >= 1900 && año2 <= 2025 && fecha2[2] === '/' && fecha2[5] === '/') {
        valido = true;
    } else {
        valido2 = false;
    }

    /*Si la fecha no es válida, se informa y se vuelve a preguntar */
    if (!valido2) {
        valido = false;
        console.log('La fecha 2 no es correcta!');
        fecha2 = prompt('Introduce la segunda fecha (dd/mm/aaaa):');
    }

    /*Si ambas fechas son correctas, creamos la fecha en formato date */
    if (valido) {
        fecha1_valida = new Date(año1, mes1 - 1, dia1);
        fecha2_valida = new Date(año2, mes2 - 1, dia2);
        break;
    }

} while (!valido || !valido2);

/*Math.abs devuelve siempre el valor positivo, no hay que hacer comprobaciones */
console.log(fecha1_valida);
console.log(fecha2_valida);


/*FUNCIÓN: saca los dias de diferencia entre las fechas */

function diferencia_dias(fecha1,fecha2){
/*Calculamos los milisegundos que tiene un dia */
let ms_por_dia = 1000 * 60 * 60 * 24;
/*Restamos para calcular la diferencia de milisegundos en las fechas */
let diferencia_fecha = Math.abs(fecha1.getTime() - fecha2.getTime());

//Calculamos cuantos dias son esos milisegundos
año_dif = Math.floor(Math.abs((diferencia_fecha/ms_por_dia)));

return año_dif;
}

let dias = diferencia_dias(fecha1_valida,fecha2_valida);

console.log(`Entre ${fecha1} y ${fecha2} hay ${dias} dias`);


/*CALCULAR DIAS MESES Y AÑOS */

/*Dividimos los dias entre 365 para sacar los años */
let años = Math.floor(dias/365);
/*El resto de la operación anterior serán los dias que quedan */
let dias_restantes =  dias%365
/*Con esos dias calculamos los meses */
let meses = Math.floor(dias_restantes / 30);
/*Con el resto de los dias anteriores sabemos cuantos dias quedan sueltos */
let dias_final = dias_restantes % 30;

console.log(`${años} años, ${meses} meses, ${dias_final} dias`)