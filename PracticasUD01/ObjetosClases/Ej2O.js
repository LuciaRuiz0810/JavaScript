/*Clase padre Persona */
class Persona {

    static contadorpersonas = 1;

    constructor(_idpersona, _nombre, _apellido, _edad) {
        /*Incrementa automáticamente y asigna el número a ese objeto creado */
        this._idpersona =  Persona.contadorpersonas++;
        this._nombre = _nombre
        this._apellido = _apellido
        this._edad = _edad
    }

    getidpersona() {
        return this._idpersona;
    }

    getnombre() {
        return this._nombre
    }

    setnombre(nuevo_nombre) {
        this._nombre = nuevo_nombre;
    }

    getapellido(){
        return this._apellido
    }

    setapellido(nuevo_apellido){
        this._apellido = nuevo_apellido
    }

    getedad(){
        return this._edad
    }

    setedad(nueva_edad){
        this._edad = nueva_edad
    } 

    toString(){
        /*Usar return para despues poder usar console.log y se imprima bien, sino saltará undifined entre lineas */
        return `${this._idpersona}: La persona ${this._nombre} ${this._apellido}, Edad: ${this._edad}`
    }
}

class empleado extends Persona{

    static contadorEmpleados = 1;

  constructor(_idpersona, _nombre, _apellido, _edad, _idEmpleado, _sueldo) {
        super(_idpersona, _nombre, _apellido, _edad);
        /*Incrementa automáticamente y asigna el número a ese objeto creado */
        this.idEmpleado = empleado.contadorEmpleados++;
        this._sueldo = _sueldo;
    }

get_idEmpleado(){
    return this.idEmpleado
}

get_sueldo(){
    return this._sueldo;
}

set_sueldo(nuevo_sueldo){
    this._sueldo = nuevo_sueldo;
}

toString(){
    /*Usar return para despues poder usar console.log y se imprima bien, sino saltará undifined entre lineas */
    return `${this._idpersona}: Empleado ${this._nombre} ${this._apellido}, de edad ${this._edad}, Empleado: ${this.idEmpleado} Salario ${this._sueldo}`
}

}

class clientes extends Persona{
        static contador_clientes = 1;

    constructor(_idpersona, _nombre, _apellido, _edad,_idcliente, _fecharegistro){
        super(_idpersona, _nombre, _apellido, _edad)
        /*Incrementa automáticamente y asigna el número a ese objeto creado */
        this._idcliente =clientes.contador_clientes++;
        this._fecharegistro = _fecharegistro;
        
    }

    getidcliente(){
        return this._idcliente;
    }

    get_fecharegistro(){
        return this._fecharegistro;
    }

    set_fecharegistro(nuevo_registro){
        this._fecharegistro = nuevo_registro;
    }

    toString(){
        /*Usar return para despues poder usar console.log y se imprima bien, sino saltará undifined entre lineas */
       return `${this._idpersona}:  ${this._nombre}  ${this._apellido} Edad: ${this._edad}, Cliente: ${this._idcliente}, Fecha Alta: ${this._fecharegistro}`
    }
}

/*Creamos objetos de diferentes clases */
let persona1 = new Persona(1, 'Pepe', 'García', 50);
let persona2 = new Persona(2, 'Laura', 'Ruiz', 30);
let empleado1 = new empleado(3, 'Adri', 'Morales', 66, 'EMP001', 1000);
let empleado2 = new empleado(4, 'María', 'Salvador', 33, 'EMP002', 15122);
let cliente1 = new clientes (5, 'Javier', 'González', 22, 5, 15022025);
let cliente2 = new clientes (6, 'Pablo', 'Azorín', 10 , 5, 16022025);

console.log(persona1.toString());
console.log(persona2.toString());
console.log(empleado1.toString());
console.log(empleado2.toString());
console.log(cliente1.toString());
console.log(cliente2.toString());
