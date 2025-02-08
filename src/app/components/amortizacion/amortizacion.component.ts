import { Component } from '@angular/core';
import { ConversionTasasService } from '../../services/conversion-tasas.service'; 

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrl: './amortizacion.component.css'
})


  export class AmortizacionComponent {

    constructor(private conversion: ConversionTasasService){}

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
      
      let amortizacion = this.calcularAmortizacion(i); // Calcula la amortización para esta fila
      let interes = this.calcularInteres(saldo); // Calcula el interés basado en el saldo anterior

      for (let j = 0; j < this.cols; j++) {
          if (j === 0) {
              this.table[i][j] = i; // Primera columna: Número de pago (0 hasta n)
          } else if (j === 1) {
              this.table[i][j] = saldo.toFixed(2); // Segunda columna: Saldo actual
          } else if (j === 2) {
              this.table[i][j] = interes.toFixed(2); // Tercera columna: Interés
          } else if (j === 3) {
              this.table[i][j] = amortizacion.toFixed(2); // Cuarta columna: Amortización
          } else {
              this.table[i][j] = `Fila ${i}, Col ${j}`;
          }
      }

      // Reducir saldo después del cálculo
      saldo = this.calcularNuevoSaldo(saldo, amortizacion);
  }
}

// Método para calcular la amortización (puede cambiar según el método de amortización)
calcularAmortizacion(pago: number): number {
  if (pago === 0) return 0; // La amortización inicial es 0
  return this.p / this.n; // Método de amortización constante (puedes cambiarlo)
}

// Método para calcular el interés
calcularInteres(saldo: number): number {
  //if (i != null) return  this.conversion.convertir(this.i,this.j,this.n,);  
  return saldo * (this.i / 100); // Se asume que la tasa ingresada es porcentual
}

// Método para calcular el nuevo saldo después de descontar la amortización
calcularNuevoSaldo(saldoAnterior: number, amortizacion: number): number {
  return saldoAnterior - amortizacion;
}



}