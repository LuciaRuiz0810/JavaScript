
let salarioActual = Number ( prompt('Introduce tu salario actual:'))
let numHijos = Number (prompt('Introduce la cantidad de hijos:'))
let edad = Number (prompt('Introduce tu edad:'))
let Nombre =  prompt('Introduce tu nombre:')



switch (true) {
    case (salarioActual < 1000 && edad < 30 && numHijos > 0):
        salarioActual = 1200;
        alert(`Tu salario actual es: ${salarioActual}`);
        break;

    case (salarioActual < 1000 && edad < 30 && numHijos === 0):
        salarioActual = ((salarioActual * 5) / 100) + salarioActual;
        alert(`Tu salario actual es: ${salarioActual}`);
        break;

    case (edad >= 35 && edad <= 45 && salarioActual < 1250 && numHijos > 1):
        salarioActual = ((salarioActual * 10) / 100) + salarioActual;
        alert(`Tu salario actual es: ${salarioActual}`);
        break;

    case (edad >= 35 && edad <= 45 && salarioActual < 1250 && numHijos > 4):
        salarioActual = ((salarioActual * 15) / 100) + salarioActual;
        alert(`Tu salario actual es: ${salarioActual}`);
        break;

    case (edad > 45 && salarioActual < 2000):
        salarioActual = ((salarioActual * 15) / 100) + salarioActual;
        alert(`Tu salario actual es: ${salarioActual}`);
        break;

    case (edad > 45 && salarioActual <= 2000):
        alert('Tu salario es mayor que 2000!');
         break;
    default: 
    alert('holi');
        break;
}





