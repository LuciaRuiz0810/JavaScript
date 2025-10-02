let cad1 = "";
let cad2 = "";
/*Quitar espacios del principio y final */
cad1 = cad1.trim();
cad2 = cad2.trim();
let seguir = true;

/*Arrow function para comparar las cadenas */
const comparacion = (cad1, cad2) => {
    if (cad1 === cad2) {
        alert(cad1 + " y " + cad2 + " son iguales");
    } else {
        alert(cad1 + " y " + cad2 + " no son iguales");
    }
}

/*Bucle para seguir si el usuario le da a "Aceptar" */
while (seguir == true) {
    cad1 = prompt("Introduce la primera cadena");
    cad2 = prompt("Introduce la segunda cadena");
    comparacion(cad1, cad2);
    /*confirm se usa para saber si el usuario desea seguir o no. "Aceptar" o "Cancelar" */
    seguir = confirm("Desea comparar otras cadenas?");
}
