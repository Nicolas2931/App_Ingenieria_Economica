import { Component } from '@angular/core';
import { ServicioMensajesService } from '../../services/servicio-mensajes.service';
import { ConversionTasasService } from '../../services/conversion-tasas.service';
import { Periodos } from '../../services/periodos.enum';
import { CalcularCuotaService } from '../../services/calcular-cuota.service';

@Component({
  selector: 'app-anualidades',
  templateUrl: './anualidades.component.html',
  styleUrl: './anualidades.component.css'
})
export class AnualidadesComponent {
    S?:number;
    P?:number;
    A:number;
    i?: number;
    j?: number;
    n:number;
    n_periodo:string;
    tasa_periodo:string;


    error_S: boolean;
    error_P: boolean;
    error_A: boolean;
    error_i: boolean;
    error_j: boolean;
    error_n: boolean;

    constructor(private servicio_mensajes:ServicioMensajesService, private servicio_tasa:ConversionTasasService, private servicio_cuota:CalcularCuotaService){}
    

    // Getters para deshabilitar los campos
    get deshabilitarP(): boolean {
      return this.S !== undefined && this.S !== null;
    }

    get deshabilitarS(): boolean {
      return this.P !== undefined && this.P !== null;
    }

    get deshabilitarJ(): boolean {
      return this.i !== undefined && this.i !== null;
    }

    get deshabilitarI(): boolean {
      return this.j !== undefined && this.j !== null;
    }

    calcularAnualidad() {
      // Se hacen las validaciones de la información ingresada
      this.validaciones();
    
      // Si alguna variable de error está activada, se detiene el cálculo
      if (this.error_S || this.error_P || this.error_A || this.error_i || this.error_j || this.error_n) {
        return;
      }

      // Validar si todas las variables ya tienen un valor asignado
      if ((this.S != null || this.P != null) && this.A != null && (this.i != null || this.j != null) && this.n != null) {
        this.servicio_mensajes.mensaje_Error("Ups...", "Error: No se puede calcular ningún valor, ya que todos los valores están definidos.");
        return;
      }

      if(this.n_periodo == null && this.n_periodo  === undefined && this.tasa_periodo == null && this.tasa_periodo === undefined){
        this.servicio_mensajes.mensaje_Error("Ups...", "Error: Es necesario ingresar ya sea el tipo de interes o período.");
        return;
      }

      //Calcular la tasa

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
      
      this.j=undefined;
      
      // Caso 1: Calcular S (Valor Futuro) o P (Valor Presente)
      if (this.A != null && this.i != null && this.n != null) {
        this.S = this.servicio_cuota.calcular_S(this.A,this.i,this.n);
        this.P = this.servicio_cuota.calcular_P(this.A,this.i,this.n);
        this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `S (Valor Futuro) calculado: ${this.S} y P (Valor presente) calculado: ${this.P}`);
        return;
      }
    
      // Caso 2: Calcular n (Número de períodos)
      if ((this.S != null || this.P != null) && this.A != null && this.i != null) {
        this.n = Math.log((this.S * this.i / this.A) + 1) / Math.log(1 + this.i);
        this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `n (Número de períodos) calculado: ${this.n}`);
        return;
      }

      // Caso 3: Calcular A (Número de períodos)
      if ((this.S != null || this.P != null) && this.n != null && this.i != null) {
        if(this.S != null){
          this.A = this.servicio_cuota.calcular_A_S(this.S,this.i,this.n);
        }
        else{
          this.A = this.servicio_cuota.calcular_A_P(this.P,this.i,this.n);
        }
        this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `A (Anualidad) calculada: ${this.A}`);
        return;
      }

      this.i=this.i*100;

      // Si no se puede calcular ninguna variable
      this.servicio_mensajes.mensaje_Error("Ups...", "No hay suficientes datos para realizar el cálculo. Por favor, verifique los valores ingresados.");
    }
    


  validaciones(){
    // Reiniciar errores
    this.error_S = false;
    this.error_P = false;
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
    
    if (this.P != null && this.P !== undefined  && this.P <= 0) {
      this.error_P = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: El Valor a calcular (P) debe ser mayor a cero.");
      return;
    }
    
    if (this.A != null && this.A !== undefined && this.A <= 0) {
      this.error_A = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Anualidad (A) debe ser mayor a cero.");
      return;
    }
    
    if (this.i != null && this.i !== undefined  && (this.i <= 0 || this.i > 100)) {
      this.error_i = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (i) debe estar entre el 0% a 100%.");
      return;
    }
    
    if (this.j != null && this.j !== undefined && (this.j <= 0 || this.j > 100)) {
      this.error_j = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (j) debe estar entre el 0% a 100% (sin incluir el cero)");
      return;
    }
    if (this.n != null && this.n !== undefined && (this.n <= 0 || this.n>100)) {
      this.error_n = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: El número de períodos (n) debe estar entre cero y 100 períodos (sin incluir el cero).");
      return;
    }

  }
}
