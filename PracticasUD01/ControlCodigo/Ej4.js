let aleatorio = Math.trunc(Math.random() * 11);
let user = '';
let contador_intentos = 0;
let otra_vez = true;


do {
    user = prompt("Del 1 al 10.... que número crees que estoy pensando?");

    if (user == null || user == '') {
        alert('El dato no es válido o has cancelado')
        let seguir = confirm('Deseas seguir jugando?')
        if (!seguir) {
            throw new Error('El usuario ha cancelado')
        }
    }

    let num_valido = Math.trunc(Number(user));

    if (isNaN(num_valido) || num_valido < 1 || num_valido > 10) {
        alert('El dato introducido NO es un NÚMERO y debe estar dentro del rango');
        continue;
    } else {
        if (num_valido > aleatorio) {
            contador_intentos++;
            alert(`Mi numero es menor, llevas ${contador_intentos} intentos!`)

        }
        if (num_valido < aleatorio) {
            contador_intentos++;
            alert(`Mi numero es mayor, llevas ${contador_intentos} intentos!`)

        }

        if (num_valido == aleatorio) {
            alert(`Enhorabuena has acertado, el número aleatorio era ${aleatorio} \n lo has adivinado en ${contador_intentos} intentos`)
            otra_vez = confirm('Deseas volver a jugar?')
            if (!otra_vez) {
                throw new Error('El usuario ha cancelado')
            } else {
                contador_intentos = 0;
            }
        }
    }

} while (otra_vez)


