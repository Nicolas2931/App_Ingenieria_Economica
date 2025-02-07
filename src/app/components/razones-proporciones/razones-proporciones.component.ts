import { Component } from '@angular/core';

@Component({
  selector: 'app-razones-proporciones',
  templateUrl: './razones-proporciones.component.html',
  styleUrl: './razones-proporciones.component.css'
})
export class RazonesProporcionesComponent {


  onSubmit(e: Event) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    let values = {}
    formData.forEach((value, key) => {
      values = { 
        ...values,
        [key]: value
      }
    })
    console.log(values)
  }
}
 