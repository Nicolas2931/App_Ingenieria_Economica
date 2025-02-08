import { Component, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-interes-compuesto',
  templateUrl: './interes-compuesto.component.html',
  styleUrl: './interes-compuesto.component.css',
})
export class InteresCompuestoComponent {
  @ViewChild('form_valor_presente') miFormulario!: NgForm;

  capital: number ; // P
  capitalFuturo: number ; // S
  tipoTasa: string ; // i, j
  periodo: string ; // mesual, trimestral, semestral, anual
  numeroDePeriodos: number ; // n
  tasaInteres: number; // 1-100%
  resultado: any;

  //variables de la operación seleccionada
  operacionSeleccionada: string = '';

  //habilitar el btn calcular
  habilitarCalcular: boolean = false;

  // Método para calcular el interés compuesto
  calcularInteres() {
    // Validar que los campos obligatorios estén llenos
    /*console.log('Calculando interés compuesto...',this.operacionSeleccionada);
    console.log('Capital:', this.capital);
    console.log('Tipo de tasa:', this.tipoTasa);
    console.log('Periodo:', this.periodo);
    console.log('Número de periodos:', this.numeroDePeriodos);
    console.log('Tasa de interés:', this.tasaInteres);*/
    console.log('Calculando interés compuesto...', this.operacionSeleccionada);
    this.validarCampos();

    //Espacio para converti tipo de tasa
    console.log('Entrando Inters');
    this.interesCompuesto(this.operacionSeleccionada, this.capital, this.capitalFuturo, this.tasaInteres, this.numeroDePeriodos);
    console.log('Saliendo Inters');
  }

  // Método para limpiar los campos del formulario
  limpiarCampos() {
    console.log('Limpiando campos...');
    this.miFormulario.resetForm();
    this.resultado = null;
    this.habilitarCalcular = false;
  }
  // Método para calcular el interes compuesto
  interesCompuesto(opcion: string, P: number, S: number, i: number, n: number) {
    i= i/100;//convertir a porcentaje
    switch (opcion) {
      case "s": // Calcula S (Valor Futuro)
        return console.log(this.resultado=(" S: "+(P * Math.pow(1 + i, n)).toFixed(3)));
      case "p": // Calcula P (Valor Presente)
        return console.log(this.resultado=(" P: "+(S / Math.pow(1 + i, n)).toFixed(3)));
      case "i_s": // Calcula i (Tasa de Interés)
        // Esta fórmula es más compleja y puede requerir métodos numéricos para resolverla.
        return console.log(this.resultado=(" i: "+((Math.pow(S / P, 1 / n) - 1)*100).toFixed(3)));
      case "n": // Calcula n (Número de Períodos)
        // Esta fórmula también es más compleja e involucra logaritmos:
        return console.log(this.resultado=(" t: "+(Math.log(S / P) / Math.log(1 + i)).toFixed(3)));

      default:
        console.error("Opción no válida.");
        return null;
    }
  }
  // Método para validaciones de los campos
  validarCampos() {
    if (this.operacionSeleccionada == '') {
      alert('Debe seleccionar una operación.');
      this.habilitarCalcular = true;
      return;
    }

    if (isNaN(this.capitalFuturo) || this.capitalFuturo <= 49999) {
      if (this.operacionSeleccionada != 's') {
        alert(
          'El valor futuro (S) debe ser un número positivo y mayor a 50000.'
        );
        this.habilitarCalcular = true;
        return;
      }
    }
    if (isNaN(this.capital) || this.capital <= 49999) {
      if (this.operacionSeleccionada != 'p') {
        alert('El capital (P) debe ser un número positivo y mayor a 50000.');
        this.habilitarCalcular = true;
        return;
      }
    }
    if (this.tipoTasa == '') {
      alert('Debe seleccionar un tipo de tasa.');
      this.habilitarCalcular = true;
      return;
    }
    if (this.periodo == '' && this.operacionSeleccionada != 'i_s') {
      alert('Debe seleccionar un periodo.');
      this.habilitarCalcular = true;
      return;
    }
    if (
      isNaN(this.numeroDePeriodos) ||
      this.numeroDePeriodos <= 0 ||
      !Number.isInteger(this.numeroDePeriodos)|| this.numeroDePeriodos > 50
    ) {
      if (this.operacionSeleccionada != 'n') {
        alert('El número de períodos (n) debe ser un número entero positivo menor a 50.');
        this.habilitarCalcular = true;
        return;
      }
    }

    if (
      isNaN(this.tasaInteres) ||
      this.tasaInteres <= 1 ||
      this.tasaInteres > 100
    ) {
      if (this.operacionSeleccionada != 'i_s') {
        alert(
          'La tasa de interés (i) debe ser un número mayor o igual a cero y menor que 100.'
        );
        this.habilitarCalcular = true;
        return;
      }
    }

    //validar inversión a largo plazo
    if(this.operacionSeleccionada === 'n' ){
      return;
    }else if (
      this.operacionSeleccionada != 'p' &&
      this.operacionSeleccionada != 's'
    ) {
      if (this.capital > this.capitalFuturo) {
        alert('El valor futuro (S) debe ser mayor al capital (P).');
        this.habilitarCalcular = true;
        return;
      }
    }
  }

}
