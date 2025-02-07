import { Component } from '@angular/core';

@Component({
  selector: 'app-anualidades',
  templateUrl: './anualidades.component.html',
  styleUrl: './anualidades.component.css'
})
export class AnualidadesComponent {
    S:Number;
    A:Number;
    i?: number;
    j?: number;
    n:String;
    get deshabilitarJ(): boolean {
      return this.i !== undefined && this.i !== null;
    }

    get deshabilitarI(): boolean {
      return this.j !== undefined && this.j !== null;
    }


    calcularAnualidad(){

    }
}
