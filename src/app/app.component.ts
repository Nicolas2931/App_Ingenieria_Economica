import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioMensajesService } from './services/servicio-mensajes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Ingeniería Económica";
  num1: number; // Inicializa los valores
  num2: number;
  respuesta:boolean;
  constructor(private servicio_mensajes:ServicioMensajesService){
    
  }

    //this.servicio_mensajes.mensaje_Exito("Felicitaciones","Se ha registrado su trabajo");
    async showSum() {
      this.respuesta = await this.servicio_mensajes.mensaje_Pregunta(
        "¿Desea continuar?",
        "Esta acción es irreversible",
        "Continuar",
        "No continuar"
      );
      if(this.respuesta == true){
        //Que hacer si verdadero
      }
      else{
        //Que hacer si falso
      }
    }
  }

