/*Pedimos el número */
let numero_user = Number (prompt("Introduce el número:"));
let resultado1 = 0;
let resultado2 = 0;
let contador1= 0;

/*Definimos el rango no aceptado */
if(numero_user != 1 && numero_user != -1){

  /*Definimos el primer resultado como el número original para que la primera operación sea num_user * num_user. Si no
  hiciera esto, resultado1 valdría 0 constantemente */
  resultado1 = numero_user;

  /*Defino la condición. Siempre mejor con !== o === */
  while (resultado1 !== Infinity && resultado1 !== -Infinity) {
    /*Hacemos la operación */
  resultado2 = numero_user * resultado1;

  /*Imprimo la operación */
  console.log(numero_user + " x " + resultado1 + " = " + resultado2);
 
  if(resultado1 === Infinity){
    break;
  }

  /*Sustituyo el resultado inicial por el último obtenido para que se genere la siguiente multiplicación */
  resultado1 = resultado2;
  contador1++;
}

console.log("Han sido " +contador1 + " intentos");
}else{
  console.log("El número está fuera del rango");
}

