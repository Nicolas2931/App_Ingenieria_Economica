import { Component, ViewChild  } from '@angular/core';
import { NgForm, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-interes-compuesto',
  templateUrl: './interes-compuesto.component.html',
  styleUrl: './interes-compuesto.component.css',
})
export class InteresCompuestoComponent {
  @ViewChild('form_valor_presente') miFormulario!: NgForm;


  capital: number = 0;// P
  capitalFuturo: number = 0;// S
  tipoTasa: string = '';// i, j
  periodo: string = '';// mesual, trimestral, semestral, anual
  numeroDePeriodos: number = 0;
  tasaInteres: number = 0;// 1-100%

  //variables de la operación seleccionada
  operacionSeleccionada: string = '';

  // Método para calcular el interés compuesto
  calcularInteres() {
    // Validar que los campos obligatorios estén llenos
    console.log('Capital:', this.capital);
    console.log('Tipo de tasa:', this.tipoTasa);
    console.log('Periodo:', this.periodo);
    console.log('Número de periodos:', this.numeroDePeriodos);
    console.log('Tasa de interés:', this.tasaInteres);

    if (!this.capital && this.capital < 50000) {
      alert('Por favor, ingrese el capital inicial mayor a $50000');
      return;
    } else {
      console.log('Capital:', this.capital);
      return;
    }
  }

  // Método para limpiar los campos del formulario
  limpiarCampos() {
    console.log('Limpiando campos...');
    this.miFormulario.resetForm();
    this.capital = 0;
    this.tipoTasa = '';
    this.periodo = '';
    this.numeroDePeriodos = 0;
    this.tasaInteres = 0;
  }


}
