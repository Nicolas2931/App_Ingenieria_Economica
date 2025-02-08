import { Component } from '@angular/core';
import { ServicioMensajesService } from '../../services/servicio-mensajes.service';
import { ConversionTasasService } from '../../services/conversion-tasas.service';
import { CalcularCuotaService } from '../../services/calcular-cuota.service';
import { Periodos } from '../../services/periodos.enum';

interface ITableRow {
  periodo: number;
  saldo: number;
  interes: number;
  cuota: number;
  incremento: number;
}

@Component({
  selector: 'app-capitalizacion',
  templateUrl: './capitalizacion.component.html',
  styleUrl: './capitalizacion.component.css'
})
export class CapitalizacionComponent {
  S?: number;
  P?: number;
  A: number;
  i?: number;
  j?: number;
  n: number;
  n_periodo: string;
  tasa_periodo: string;
  tabla: ITableRow[] = [];

  error_S: boolean;
  error_A: boolean;
  error_i: boolean;
  error_j: boolean;
  error_n: boolean;

  constructor(
    private servicio_mensajes: ServicioMensajesService,
    private servicio_tasa: ConversionTasasService,
    private servicio_cuota: CalcularCuotaService
  ) { }


  // Getters para deshabilitar los campos
  get deshabilitarJ(): boolean {
    return this.i !== undefined && this.i !== null;
  }

  get deshabilitarI(): boolean {
    return this.j !== undefined && this.j !== null;
  }

  calcularCapitalizacion() {
    // Se hacen las validaciones de la información ingresada
    this.validaciones();

    // Si alguna variable de error está activada, se detiene el cálculo
    if (this.error_S || this.error_A || this.error_i || this.error_j || this.error_n) {
      return;
    }

    // Validar si todas las variables ya tienen un valor asignado
    if ((this.S != null) && this.A != null && (this.i != null || this.j != null) && this.n != null) {
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: No se puede calcular ningún valor, ya que todos los valores están definidos.");
      return;
    }

    if (this.n_periodo == null && this.n_periodo === undefined && this.tasa_periodo == null && this.tasa_periodo === undefined) {
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: Es necesario ingresar ya sea el tipo de interes o período.");
      return;
    }

    //Calcular la tasa

    if (this.i !== null && this.i !== undefined) {
      if (this.n_periodo != this.tasa_periodo) {
        this.i = this.servicio_tasa.conversion_tasas((this.i / 100), Periodos[this.tasa_periodo], Periodos[this.n_periodo]);
      }
      else {
        this.i = this.i / 100;
      }
    }
    else {
      this.i = this.servicio_tasa.convertir({ m: Periodos[this.n_periodo], n: Periodos[this.tasa_periodo], j: (this.j / 100) })
    }

    this.j = undefined;

    // Caso 3: Calcular A (Número de períodos)
    if ((this.S != null) && this.n != null && this.i != null) {
      if (this.S != null) {
        this.A = this.servicio_cuota.calcular_A_S(this.S, this.i, this.n);
      }
      this.tabla = this.calcular_tabla();
      this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `A (Anualidad) calculada: ${this.A}`);
      return;
    }
    

    // Si no se puede calcular ninguna variable
    this.servicio_mensajes.mensaje_Error("Ups...", "No hay suficientes datos para realizar el cálculo. Por favor, verifique los valores ingresados.");
  }

  calcular_tabla(): ITableRow[] {
    let tabla: ITableRow[] = [];
    let saldo = this.A;
    let periodo = 0;
    let interes = 0;
    let cuota = this.A;
    let incremento = this.A;

    tabla.push({
      periodo: periodo,
      saldo: saldo,
      interes: interes,
      cuota: cuota,
      incremento: incremento
    });

    for (let i = 1; i < this.n; i++) {
      periodo++;
      interes = saldo * this.i;
      incremento = cuota + interes;
      saldo += incremento
      
      tabla.push({
        periodo: periodo,
        saldo: saldo,
        interes: interes,
        cuota: cuota,
        incremento: incremento
      });
      
    }

    return tabla.map(row => ({
      periodo: row.periodo,
      saldo: parseFloat(row.saldo.toFixed(2)),
      interes: parseFloat(row.interes.toFixed(2)),
      cuota: parseFloat(row.cuota.toFixed(2)),
      incremento: parseFloat(row.incremento.toFixed(2))
    }));
  }

  validaciones() {
    // Reiniciar errores
    this.error_S = false;
    this.error_A = false;
    this.error_i = false;
    this.error_j = false;
    this.error_n = false;

    // Validaciones
    if (this.S != null && this.S !== undefined && this.S <= 0) {
      this.error_S = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: El Valor a calcular (S) debe ser mayor a cero.");
      return;
    }

    if (this.A != null && this.A !== undefined && this.A <= 0) {
      this.error_A = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Anualidad (A) debe ser mayor a cero.");
      return;
    }

    if (this.i != null && this.i !== undefined && (this.i <= 0 || this.i > 100)) {
      this.error_i = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (i) debe estar entre el 0% a 100%.");
      return;
    }

    if (this.j != null && this.j !== undefined && (this.j <= 0 || this.j > 100)) {
      this.error_j = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (j) debe estar entre el 0% a 100% (sin incluir el cero)");
      return;
    }
    if (this.n != null && this.n !== undefined && (this.n <= 0 || this.n > 100)) {
      this.error_n = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: El número de períodos (n) debe estar entre cero y 100 períodos (sin incluir el cero).");
      return;
    }

  }
}
