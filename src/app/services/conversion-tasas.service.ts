import { Injectable } from '@angular/core';
import { Periodos } from './periodos.enum';

@Injectable({
  providedIn: 'root'
})
export class ConversionTasasService {

  constructor() { }

  
  efectiva_nominal(i: Number|null,n_i: Periodos, j:Number,n_j:Periodos):number{
    let m:Number;
    if(n_i===n_j){
      if(i===null && j!=null){
        m = 12/n_j;
        return j/m;
      }
      else{
        //return j=i*m;
      }
    }
    else{

    }

  }

}
