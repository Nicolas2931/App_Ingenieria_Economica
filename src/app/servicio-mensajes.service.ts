import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioMensajesService {

  // Método que muestra un mensaje de éxito al usuario
  mensaje_Exito(titulo:string,mensaje:string | undefined):void{
    Swal.fire({
      //position: "top-end",
      icon: "success",
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      //timer: 1500
    });
  }
  
  // Método que muestra un mensaje de error al usuario
  mensaje_Error(titulo:string,mensaje:string | undefined):void{
    Swal.fire({
      icon: "error",
      title: titulo,
      text: mensaje,
    });
  }

  // Método que pregunta al usuario si desea realizar una opción, retorna un TRUE o FALSE según su respuesta.
  async mensaje_Pregunta(
    titulo: string,
    mensaje: string | undefined,
    txt_verdadero: string | undefined,
    txt_falso: string | undefined
  ): Promise<boolean> {
    // Usamos await para esperar a que la promesa de Swal.fire se resuelva
    if(txt_verdadero == null || txt_verdadero == undefined){
      txt_verdadero = "Confirmar";
    }
    if(txt_falso == null || txt_falso == undefined){
      txt_falso = "Cancelar";
    }
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      
      confirmButtonText: txt_verdadero,
      cancelButtonText: txt_falso,
    });
  
    // Devolvemos el resultado que es un booleano (true o false)
    return result.isConfirmed;
  }



}
