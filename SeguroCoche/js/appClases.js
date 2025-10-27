//Exportamos toda la clase poliza
export class Poliza {
    constructor(gama, año, cobertura, importe) {
        this._gama = gama,
            this._año = año,
            this._cobertura = cobertura,
            this._importe = importe
    }

    get gama() {
        return this._gama;
    }

    get año() {
        return this._año;
    }

    get cobertura() {
        return this._cobertura;
    }
    get importe() {
        return this._importe;
    }

    set importe(nuevo_importe){
        this._importe = nuevo_importe;
    }

    //Mostramos la información con el Pop up
   mostrarInfoHTML() {

        const titulo = document.querySelector('#staticBackdropLabel');
        titulo.textContent = "RESUMEN DE PÓLIZA"; 
        titulo.className = 'header col';
       
        const body = document.querySelector('.modal-body');
        const footer = document.querySelector('.modal-footer');
        
        //Limpiamos el contenido antes de cada llamada
        body.innerHTML = '';
        footer.innerHTML = '';

        //Div donde meteremos el cuerpo del modal
        const div_info = document.createElement('div');
        div_info.className = 'font-bold p-4'; //p-4 para el padding
        div_info.innerHTML = ` 
                             TIPO: ${this.gama} 
                             <br> <br>
                             AÑO: ${this.año} 
                             <br> <br>
                             COBERTURA: ${this.cobertura} 
                             <br> <br>
                             TOTAL: ${this.importe} €`;
        
        //Insertamos el contenido en el body
        body.appendChild(div_info);

        //Creación del botón
        const boton = document.createElement('button');
        boton.type = 'button'
        boton.className = 'btn btn-primary btn-raised col'
        boton.textContent = 'Cerrar'
        
        //Obtenemos el elemento modal
        const modalElement = document.querySelector('#modal');
        const modal = new bootstrap.Modal(modalElement, {})

        //Cuando se clique el botón se esconde y vuevle a su estado incial para poder meter los siguientes datos
        boton.addEventListener('click', () => {
            
             modal.hide();
             body.innerHTML = '';
             footer.innerHTML = '';
             titulo.className = 'modal-title fs-3 font-bold'
             titulo.id = 'staticBackdropLabel';
        });
        
        //Añadimos el botón al footer
        footer.appendChild(boton);

        //Mostramos el modal creado
        modal.show();

    }


    calcularSeguro() {
    let importe = 300;

    //Según la gama aplicamos un importe
    if (this.gama === 'Gama baja') {
        importe *= 1.05;
    } else if (this.gama === 'Gama media') {
        importe *= 1.15;
    } else if (this.gama === 'Gama alta') {
        importe *= 1.30;
    }

    //Sacamos la cantidad de años de diferencia hasta el atual
    const año = parseInt(this.año, 10);
    const antiguedad = 2025 - año;
    importe *= Math.pow(1.03, antiguedad);

    //Según la cobertura
    if (this.cobertura === 'Básico') {
        importe *= 1.30;
    } else if (this.cobertura === 'Completo') {
        importe *= 1.50;
    }

    //Llamada al setter para asignar el importe calculado
    this.importe = Math.round(importe);
}

} 




