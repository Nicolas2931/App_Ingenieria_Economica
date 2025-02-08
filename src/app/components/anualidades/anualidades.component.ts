import { Component } from '@angular/core';
import { ServicioMensajesService } from '../../services/servicio-mensajes.service';

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
    n_periodo:String;
    tasa_periodo:String;


    error_S: Boolean;
    error_P: Boolean;
    error_A: Boolean;
    error_i: Boolean;
    error_j: Boolean;
    error_n: Boolean;

    constructor(private servicio_mensajes:ServicioMensajesService){}
    

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

      if(this.n_periodo  != null && this.n_periodo  !== undefined && this.tasa_periodo != null && this.tasa_periodo !== undefined){

      }

      if(this.n_periodo == this.tasa_periodo){
        
      }
    
      // Determinar qué calcular según las variables ingresadas
      let tasaDecimal = this.i ? this.i / 100 : null; // Convertir porcentaje a decimal si existe
      
      // Caso 1: Calcular S (Valor Futuro)
      if (this.A != null && this.i != null && this.n != null) {
        this.S = this.A * ((Math.pow(1 + tasaDecimal, this.n) - 1) / tasaDecimal);
        this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `S (Valor Futuro) calculado: ${this.S}`);
        return;
      }
    
      // Caso 2: Calcular n (Número de períodos)
      if (this.S != null && this.A != null && this.i != null) {
        if (tasaDecimal === 0) {
          this.servicio_mensajes.mensaje_Error("Ups...", "Error: La tasa de interés (i) no puede ser 0 para este cálculo.");
          return;
        }
        this.n = Math.log((this.S * tasaDecimal / this.A) + 1) / Math.log(1 + tasaDecimal);
        this.servicio_mensajes.mensaje_Exito("Cálculo Exitoso", `n (Número de períodos) calculado: ${this.n}`);
        return;
      }
    
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
    
    if (this.i != null && this.i !== undefined  && (this.i < 0 || this.i > 100)) {
      this.error_i = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (i) debe estar entre el 0% a 100%.");
      return;
    }
    
    if (this.j != null && this.j !== undefined && (this.j < 0 || this.j > 100)) {
      this.error_j = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: La Tasa (j) debe estar entre el 0% a 100%.");
      return;
    }
    if (this.n != null && this.n !== undefined && (this.n < 0 || this.n>100)) {
      this.error_n = true;
      this.servicio_mensajes.mensaje_Error("Ups...", "Error: El número de períodos (n) debe estar entre cero y 100 períodos");
      return;
    }
  }
}
