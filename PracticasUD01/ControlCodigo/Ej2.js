let filas = Number(prompt('Indica el número de filas:'));
let columnas = Number(prompt('Indica el número de columnas:'));
/*Seleccionamos el elemento tabla con su ID */
let table = document.getElementById("tabla")
/*Cadena vacía para construir primero el html*/ 
let html = "";

/*Bucle para las filas*/
for (let x = 0; x < filas; x++) {
    html += "<tr>";

    
/*Bucle para las columnas*/
    for (let y = 0; y < columnas; y++) {
        html += "<td>" + "Lucía" + "</td>";
    }
    html += "</tr>";
}

/*insertamos el contenido en el html de la tabla*/
table.innerHTML = html;