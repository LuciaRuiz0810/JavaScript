class presupuestoClase {

   
    _presupuesto;
    _restante;
    _gastos = [];

    constructor(importe) {
        this._presupuesto = importe;
        this._restante = importe;
    }
    
    
    set presupuesto(nuevo_presupuesto){
        this._presupuesto = nuevo_presupuesto;
    }

    set restante(nuevo_restante){
        this._restante = nuevo_restante;
    }

   
    get presupuesto(){
        return this._presupuesto;
    }
    
    get restante(){
        return this._restante;
    }
    
    get gastos(){
        return this._gastos;
    }

    //Añadimos el gasto al array (objeto)
    gasto_añadir_array(nuevo_gasto){
       this._gastos.push(nuevo_gasto);
    }

    //Eliminamos el gasto del array
    eliminarGasto(id_a_eliminar){ 
        const id_num = Number(id_a_eliminar); 
        
        //filtramos el array, excluyendo el objeto con el ID que coincida
        this._gastos = this._gastos.filter(gasto => gasto.id !== id_num);
       
    }
    
    //funció para calcular los gastos totales, se recorre el array y las cantidades se suman entre si
    calcularGastosTotales() {
        let gastos_totales = 0;
        this._gastos.forEach(gasto => {
            gastos_totales += gasto.cantidad; // Suma la propiedad 'cantidad'
        });
        return gastos_totales;
    }
}