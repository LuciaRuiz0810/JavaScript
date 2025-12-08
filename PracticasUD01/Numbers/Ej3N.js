let numerobase = prompt("Introduce el número:");
let numeroCorrecto = "";


while (
    !(numerobase.startsWith('0b') || numerobase.startsWith('0x') || numerobase.startsWith('0o'))
    || numerobase.includes('-')
) {
    if (numerobase.includes('-')) {
        alert("El número debe ser positivo!");
    } else {
        alert("Debes indicar el formato al que quieres pasarlo! (0b, 0x, 0o)");
    }
    numerobase = prompt("Introduce el número con prefijo (0b, 0x, 0o):");
}

/*Pasar a binario (2) */
function binario(numeroCorrecto) {
    let binario = numeroCorrecto.toString(2);
    return binario;
}

/*Pasar a hex (16) */
function hexadecimal(numeroCorrecto) {
    let hex = numeroCorrecto.toString(16);
    return hex;
}

/*Pasar a octal (8) */
function octal(numeroCorrecto) {
    let oct = numeroCorrecto.toString(8);
    return oct;
}

/*Esta expresión elimina las posiciones que indiquemos (slice)*/
if (numerobase.includes('0x')) {
    numeroCorrecto = numerobase.slice(2);
    console.log('Hex: ' + hexadecimal(numeroCorrecto));
}

if (numerobase.includes('0b')) {
    numeroCorrecto = numerobase.slice(2);
    console.log('Binario: ' + binario(numeroCorrecto));
}


if (numerobase.includes('0o')) {
    numeroCorrecto = numerobase.slice(2);
    console.log('Octal: ' + octal(numeroCorrecto));
}
