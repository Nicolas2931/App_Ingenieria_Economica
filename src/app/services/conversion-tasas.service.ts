import { Injectable } from '@angular/core';
import { Periodos } from './periodos.enum';

interface convertir_tasa_props {
  i?: number;
  m: Periodos;
  j?: number;
  n: Periodos;
}

@Injectable({
  providedIn: 'root'
})
export class ConversionTasasService {

  constructor() { }

  nominal_efectiva(j: number, m: Periodos) {
    return j / m;
  }
  
  efectiva_nominal(i: number, m:Periodos): number{
    return i * m;
  }

  conversion_tasas(i: number, n: Periodos, m: Periodos) {
    const exp = n/m;
    const nueva_tasa = Math.pow((1+i), exp) - 1
    return nueva_tasa;
  }

  convertir_a_nominal({ i, n, m }: convertir_tasa_props){
    i = this.conversion_tasas(i,n,m)

    return this.efectiva_nominal(i,m)
  }

  convertir_a_efectiva({ j, n, m }: convertir_tasa_props){
    const i = this.nominal_efectiva(j,n)
    const conversion = this.conversion_tasas(i,n,m)
    console.log("conversion", conversion)
    return conversion
  }

  convertir({ i, j, n, m }: convertir_tasa_props) {
    if(i && !j) {
      return this.convertir_a_nominal({i,n,m})
    } 
    
    return this.convertir_a_efectiva({ j, n, m })
  }
}