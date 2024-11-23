import { Component } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Output } from '@angular/core'; 
import { ServicioMensajesService } from '../../services/servicio-mensajes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private servicioMensajesService: ServicioMensajesService
  ) {}

   // Variable para controlar la visibilidad del menú
  menuVisible = false;
  // Variable que almacena la opción seleccionada por el usuario
  @Output() opc= new EventEmitter<string>(); 

  // Método para alternar la visibilidad del menú
  mostrarMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Método que permite enviar la opción al componente padre
  setOpcion(value:string){
    this.opc.emit(value);
    // Se oculta el menú una vez se selecciona una opción
    this.mostrarMenu();
  }

}
