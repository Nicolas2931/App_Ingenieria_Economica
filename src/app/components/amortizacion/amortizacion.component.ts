import { Component } from '@angular/core';
import { ConversionTasasService } from '../../services/conversion-tasas.service'; 
import { ServicioMensajesService } from '../../services/servicio-mensajes.service';
import { CalcularCuotaService } from '../../services/calcular-cuota.service';
import { Periodos } from '../../services/periodos.enum';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrl: './amortizacion.component.css'
})


  export class AmortizacionComponent {

    constructor(private servicio_mensajes:ServicioMensajesService, private servicio_tasa:ConversionTasasService, private servicio_cuota:CalcularCuotaService){}

    rows: number = 0;
    cols: number = 5;
    table: any[][] = [];
    
    // Variables para capturar valores de los inputs
    p: number = 0;
    tasas: number = 0;
    numPagos: number = 0;
    tipo1: boolean = false;
    tipo2: boolean = false;
  
    // Variables para las tasas de interés y periodos
    i: number = 0;
    j: number = 0;
    tasa_periodo: string = "MENSUAL";
    deshabilitarI: boolean = false;
    deshabilitarJ: boolean = false;
    
    
    // Variables para validaciones visuales (bordes rojos si hay error)
    error_i: boolean = false;
    error_j: boolean = false;
    
    // Variables para el número de periodos y su tipo
    n: number = 0;
    n_periodo: string = "MENSUAL";
    error_n: boolean = false;


generateTable() {
  this.table = [];
  let saldo = this.p; // El saldo inicial es el monto capturado

  for (let i = 0; i <= this.n; i++) { 
      this.table[i] = [];
      
      let cuota = this.servicio_cuota.calcular_A_P(this.p, this.i, this.n,);
      let interes = this.calcularInteres(saldo); 
      let amortizacion =  this.calcularamortizacion();
      

      for (let j = 0; j < this.cols; j++) {
          if (j === 0) {
              this.table[i][j] = i; // Primera columna: Número de pago (0 hasta n)
          } else if (j === 1) {
              this.table[i][j] = saldo.toFixed(2); // Segunda columna: Saldo actual
          } else if (j === 2) {
              this.table[i][j] = interes.toFixed(2); // Tercera columna: Interés
          } else if (j === 3) {
              this.table[i][j] = cuota.toFixed(2); // Cuarta columna: Amortización
          } else if (j === 4){
              this.table[i][j] = amortizacion.toFixed(2);
          } else {
              this.table[i][j] = `Fila ${i}, Col ${j}`;
          }
      }

      // Reducir saldo después del cálculo
      saldo = this.calcularNuevoSaldo(saldo, amortizacion);
  }
}

calcularamortizacion(){
  let amortizacion: number;
  let primeraIteracion = true; 
  let saldo = this.p;
  let cuota = this.servicio_cuota.calcular_A_P(this.p, this.i, this.n,);
  let interes = this.calcularInteres(saldo); 

for (let i = 0; i < this.n;i++){
  if (primeraIteracion) {
    amortizacion = 0;
    primeraIteracion = false;
  } else {
    amortizacion = cuota - interes;
  }
  return amortizacion;
}

}

// Método para calcular el interés
calcularInteres(saldo: number): number {
        if(this.i!== null && this.i !== undefined ){
          if(this.n_periodo != this.tasa_periodo){
            this.i = this.servicio_tasa.conversion_tasas((this.i/100),Periodos[this.tasa_periodo],Periodos[this.n_periodo]);
          }
          else{
            this.i=this.i/100;
          }
        }
        else{
          this.i=this.servicio_tasa.convertir({m:Periodos[this.n_periodo], n:Periodos[this.tasa_periodo], j:(this.j/100) }) 
          this.servicio_mensajes.mensaje_Exito("hola","i:" + this.i);
        }
  return saldo * this.i; 
}

// Método para calcular el nuevo saldo después de descontar la amortización
calcularNuevoSaldo(saldoAnterior: number, amortizacion: number): number {
  return saldoAnterior - amortizacion;
}



}