class Punto{
    static contador = 1;
    constructor(nombre, x, y){
        this.nombre = nombre;
        this.x = x;
        this.y = y
    }

/*FUNCIÓN ESTATICA : debemos llamar al objeto creado en el programa principal "Prueba"*/
    static informacion(Punto){
        return alert(`Nombre: ${Punto.nombre} Coordenada_x: ${Punto.x} , Coordenada_y: ${Punto.y}`)
    }

    /*Crea una copia del objeto que le pasemos y le cambiamos el nombre a Punto2*/
     copiar_obj(obj_nuevo) {
        Punto.contador++;
        let copia = structuredClone(obj_nuevo);
        copia.nombre = `Punto${Punto.contador}`
        return copia;
    }

    /*Permite cambiar varias propiedades a la vez pasandole las nuevas */
    /*No se le pasa de nuevo el objeto porque es redundante y da error, se usa simplemente this */
    cambiar_propiedades( x_nuevo, y_nuevo){
        Object.assign(this, {x : x_nuevo, y : y_nuevo})
    }

    /*Compara si las coordenadas de ambos objetos son iguales */
    comparacion_iguales(obj_1, obj_2){

        if(obj_1.x == obj_2.x && obj_1.y == obj_2.y){
            return true;
        }else{
            return false;
        }
    }

    /*Pasamos un obj de tipo Punto jutno con el valor a sumar, almacenamos creamos y devolvemos */

    sumar(obj){
        Punto.contador++;
        /*Valor aleatorio entre -1 y 10 a la baja*/
        let nuevo_valor_x = Math.floor((Math.random()* 12) -1);
        /*Valor aleatorio entre -1 y 10 a la alta*/
        let nuevo_valor_y = Math.round((Math.random()* 12) -1);
        let x_nuevo = obj.x + nuevo_valor_x;
        let y_nuevo = obj.y + nuevo_valor_y;
        let nuevo_punto = new Punto('__', x_nuevo, y_nuevo)
        nuevo_punto.nombre = `Punto${Punto.contador}`
        return nuevo_punto;
    }
    /**
 (p2.x - p1.x) → diferencia de las coordenadas x.

(p2.y - p1.y) → diferencia de las coordenadas y.

** 2 → eleva al cuadrado cada diferencia.

Math.sqrt(...) → saca la raíz cuadrada de la suma, que es la distancia.

     */
   static Obtener_distancia(primer_obj, segund_obj){
        let distancia = Math.sqrt(
            (primer_obj.x - segund_obj.x) ** 2 + (segund_obj.y - primer_obj.y) ** 2
        )
        return distancia;
    }
}

/*SI NO FUERA ESTÁTICO : */

/**
 
class Punto {
    constructor(nombre, x, y) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
    }

    informacion() {
        return `Nombre: ${this.nombre} Coordenada_x: ${this.x}, Coordenada_y: ${this.y}`;
    }
}

let prueba = new Punto('Punto1', 3, 2);
console.log(prueba.informacion());

 */


let user_x_comprobar = '';
let user_y_comprobar = '';
let user_y = 0;
let user_x = 0;
let valido_y = false;
let valido_x = false;

/*EJEMPLO ORDEN BUCLE */
/*Bucle hasta que los valores sean válidos */
    // Pedir coordenada X
do{
let user_x_comprobar = prompt('Indica las coordenadas de x (-1 y 10):');
    if (user_x_comprobar === null) {
        alert('Has CANCELADO, el programa no continuará!');

        /*Hace que se detenga el programa completamente */
         throw new Error('Usuario canceló');
    }
    user_x = Number(user_x_comprobar);
    if (user_x < -1 || user_x > 10 || isNaN(user_x)) {
        alert('El valor no es válido!');
        continue; // vuelve al inicio del bucle
    }else{
        valido_x = true;
    }
}while(!valido_x)
    
    
do{
 let user_y_comprobar = prompt('Indica las coordenadas de y (-1 y 10):');
    if (user_y_comprobar === null) {
        alert('Has CANCELADO, el programa no continuará!');
        throw new Error('Usuario canceló');
    }
    user_y = Number(user_y_comprobar);
    if (user_y < -1 || user_y > 10 || isNaN(user_y)) {
        alert('El valor no es válido!');
        continue; // vuelve al inicio del bucle
    }else{
        valido_y = true;
    }
}while(!valido_y)
    // Pedir coordenada Y
   

    // Si ambos valores son válidos
    user_x = Math.trunc(user_x);
    user_y = Math.trunc(user_y);
    

console.log(`Coordenadas válidas: X=${user_x}, Y=${user_y}`);


/*Introducir el objeto del que queremos sacar la información ya que el método es estático */
let punto1 = new Punto('Punto1', user_x, user_y);
Punto.informacion(punto1);

let punto2 = punto1.copiar_obj(punto1)
/*Esto se utiliza para que al copiarlo, también se añada como instancia de punto
y poder usar los métodos de la clase */
/*OTRA OPCIÓN: Crear un nuevo objeto directamente y asignar las mismas propiedades */
Object.setPrototypeOf(punto2, Punto.prototype);
Punto.informacion(punto2)

let confirmar = confirm('Desea modificar las coordenadas de "Punto2"?');
let nueva_x = 0;
let nueva_y = 0;
/*Si el usuario acepta pide nuevas coordenadas */
if(confirmar){
    nueva_x =Number(prompt('Introduce la nueva coordenada x'))
    nueva_y = Number (prompt('Introduce la nueva coordenada_y'))
    nueva_x = Math.round(nueva_x)
    nueva_y = Math.round(nueva_y);

    /*Si son iguales a las anteriores crea un nuevo punto sumandole valores aleatorios */
        if(nueva_x == user_x && nueva_y == user_y){
            let crear_punto = punto1.sumar(punto1);
            Punto.informacion(crear_punto);
            /*Obtenemos la distancia entre el punto1 y el nuevo */
            let distancia = Punto.Obtener_distancia(punto1, crear_punto);
            alert(`La distancia entre los puntos ${punto1.nombre} --> (${punto1.x}, ${punto1.y})\n 
            ${crear_punto.nombre} --> (${crear_punto.x}, ${crear_punto.y}) es de ` + distancia.toFixed(2))

        }else{
            /*Si son coordenadas diferentes, solo reemplaza las anteriores por las nuevas */
            punto2.cambiar_propiedades(nueva_x, nueva_y)
            Punto.informacion(punto2);
             let distancia = Punto.Obtener_distancia(punto1, punto2);
            alert(`La distancia entre los puntos ${punto1.nombre} --> (${punto1.x}, ${punto1.y})\n 
            ${punto2.nombre} --> (${punto2.x}, ${punto2.y}) es de ` + distancia.toFixed(2))
        }

}else{
     nueva_x =Number(prompt('Introduce la nueva coordenada x'))
    nueva_y = Number (prompt('Introduce la nueva coordenada_y'))
    nueva_x = Math.round(nueva_x)
    nueva_y = Math.round(nueva_y);

    /*Si cancela, se debe modificar uno de los puntos y mostrar la distancia */
      punto2.cambiar_propiedades(nueva_x, nueva_y)
            Punto.informacion(punto2);
             let distancia = Punto.Obtener_distancia(punto1, punto2);
            alert(`La distancia entre los puntos ${punto1.nombre} --> (${punto1.x}, ${punto1.y})\n 
            ${punto2.nombre} --> (${punto2.x}, ${punto2.y}) es de ` + distancia.toFixed(2))

}
