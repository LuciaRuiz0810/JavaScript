let numero = Number (prompt ("Introduce el número:"));
let hallar = Number (prompt ("¿Cuántas veces se hallará?"));
let resultado = 0;


console.log(" El número es " + numero + " se hallará " + hallar + " veces");

/*Bucle que realiza las operaciones según la cantidad de veces que indique el usuario (hallar) */
for(let x = 0; x < hallar; x++ ){
    resultado = (numero * 2);
    numero = resultado;
    console.log(numero);
}



