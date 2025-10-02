let comensales = Number(prompt("¿Con cuántos comensales contamos?"));
let mayores = Number(prompt("¿Cuántos son mayores de 65 años?"));
let ninios = Number(prompt("¿Cuántos son niños? (menores de 10 años)"))
let suma_2 = mayores + ninios;
let opcion = 0;
let contador_2 = 0;
let elegidos = mayores;
let com_menu1 = 0;
let com_menu2 = 0;
let com_menu3 = 0;

/*Función que imprime el menú */
function menú() {

    console.log("Opciones para menús de adultos:");
    console.log("1-Menú del día: " + "12.5");
    console.log("2-Menú del día PREMIUM " + "17.45");
    console.log("3-Menú Buffet Libre: " + "23.85");
    console.log("NOTA: Todos los precios son sin IVA");
}

/*Función para mostrar las cantidades */
function info1(elegidos, contador) {

    console.log("De momento lleva " + contador + " menús elegidos...");
    console.log("Le quedan " + elegidos + " por elegir");
}

/*Función para mostrar las elecciones de los usuarios */
function info3(comensales, ninios, mayores, com_menu1, com_menu2, com_menu3) {
    console.log("Contamos con un total de " + comensales + ": " + ninios + " niños " + "y " + mayores + " adultos");
    console.log("Los menús que se servirán son los siguientes:");
    console.log(com_menu1 + " Menú/s del día");
    console.log(com_menu2 + " Menú/s del día PREMIUM");
    console.log(com_menu3 + " Menú BUFFET");
    console.log(ninios + " Menú/s infantiles");

}

/*Mostrar descuento MAYORES*/
function info4(mayores) {

    console.log("Debe saber que " + mayores + " menús se beneficiarán de un 15% de descuento \n respecto al menú de adultos por ser +65 años")
    console.log("\n NOTA: El descuento será aplicado a los menús más económicos")
}

/* Mostrar descuento NIÑOS*/
function info5(ninios) {
    console.log("Los menús infantiles tienen un precio de 9.25€ + IVA")
    console.log("En su caso se le aplicará a " + ninios + " menús")
}

/*Funcion final */
function info6(com_menu1, com_menu2, com_menu3) {
   

    let m1 = com_menu1 * 12.5;
    let m2 = com_menu2 * 17.45;
    let m3 = com_menu3 * 23.85;
    let m4 = ninios * 9.25;

    /*Aplicar descuento al más barato */
    if(m1 > 0){
        m1 = m1 - ((m1*15)/100)  ;
        }

    if(m2 > 0 && m1 === 0){
        m2 = m2 - ((m2*15)/100)  ;
        }

    if(m3 > 0 && m1 === 0 && m2 === 0){
        m3 =  m3 -((m3*15)/100) ;
        }

        /*Suma del total, sacar IVA y apliarlo */
    let total = m1 +m2 + m3;
    let iva = ((total * 10) / 100);
    let total_iva = total + iva;

    /*Mostrar final */
    /*Tofixed --> Decimales / ToPrecision --> total dígitos */
    console.log("Los menús que se servirán son los siguientes:");
    console.log(com_menu1 + " Menús del dia x 12,5€.........." + m1.toFixed(2) + "€")
    console.log(com_menu2 + " Menús del dia PREMIUM x 17,45€.........." + m2.toFixed(2) + "€");
    console.log(com_menu3 + " Menús del dia BUFFET x 23,85€.........." + m3.toFixed(2) + "€");
    console.log(ninios + " Menú infantil x 9.25€.........." + m4.toFixed(2) + "€");
    console.log("TOTAL: " + total.toFixed(2));
    console.log("IVA (10%): " + iva.toFixed(2));
    console.log("TOTAL IVA: " + total_iva.toPrecision(6) + "€");

}

/*Condición si no cuadran las cantidades, salta alerta (para que lo vea el user) y salta error para que se detenga el programa */
if (suma2 > comensales) {
    alert("Error: La cantidad de comensales es menor!.");
    throw new Error("Error: La cantidad de comensales es menor!.");
   

} else if( suma_2 == comensales) {

    /*Ejecución normal usando las funciones */
    menú();
    info1(elegidos, contador_2);
    com_menu1 = Number(prompt("¿Cuántos comensales desean el menú 1? (12,5€)"));

    /*Calcular los menús que faltan por elegir y la cantidad elegida */
    if (com_menu1 > 0) {

        elegidos = elegidos - com_menu1;
        contador = com_menu1;
    }
    info1(elegidos, contador_2);
    com_menu2 = Number(prompt("¿Cuántos comensales desean el menú 2? (17,45€)"));

    if (com_menu2 > 0) {
        elegidos = elegidos - com_menu2;
        contador = com_menu2;
    }
    info1(elegidos, contador_2);

    com_menu3 = Number(prompt("¿Cuántos comensales desean el menú 3? (23,85€)"));
    if (com_menu3 > 0) {
        elegidos = elegidos - com_menu3;
        contador = com_menu3;
    }

    info3(comensales, ninios, mayores, com_menu1, com_menu2, com_menu3);

    /*Condciones para saber que información de descuentos mostrar */
    if (mayores > 0) {
        info4(mayores);
    }
    if (ninios > 0) {
        info5(ninios);
    }

    info6(com_menu1, com_menu2, com_menu3);
}