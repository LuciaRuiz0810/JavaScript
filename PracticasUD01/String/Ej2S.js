let texto = prompt("Escribe el texto a cifrar");
let numero_entero = Number (prompt("Escribe un número entero"));


do{
    /*Si lo introducido NO es un NUMERO salta la alerta y continua preguntando */
    /*Is Not a Number */
if(isNaN(numero_entero)){
    alert("Debes introducir un número entero!");
    numero_entero = Number (prompt("Escribe un número entero"));
}
}while(isNaN(numero_entero));

numero_entero = parseInt(numero_entero);

/*ACABAR */