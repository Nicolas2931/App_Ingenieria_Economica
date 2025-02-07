import { Component } from '@angular/core';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrl: './amortizacion.component.css'
})
export class AmortizacionComponent {
  rows: number = 0;
  cols: number = 0;
  table: any[][] = [];

  generateTable() {
    this.table = [];
    for (let i = 0; i < this.rows; i++) {
      this.table[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.table[i][j] = `Row ${i + 1}, Col ${j + 1}`;
      }
    }
  }
}