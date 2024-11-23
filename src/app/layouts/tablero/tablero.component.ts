import { Component } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {
   // Variable para almacenar la opción seleccionada
   opcionSeleccionada: string = '';
   
  ngOnInit(){
    this.opcionSeleccionada='0';
  }
   // Método para recibir la opción desde el componente hijo
   recibirOpcion(opcion: string) {
     this.opcionSeleccionada = opcion;
   }

}
