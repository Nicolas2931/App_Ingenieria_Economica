import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcularCuotaService {

  constructor() { }

  calcular_A_S(S:number, i:number,n:number):number{
    let A:number;
    A=(S*i)/(Math.pow(1 +i,n) - 1) ;
    return A;
  }

  calcular_A_P(P:number, i:number,n:number):number{
    let A:number;
    A=(P*i)/((1-Math.pow(1 +i,-n))) ;
    return A;
  }

  calcular_S(A:number, i:number,n:number):number{
    let S:number;
    S=A*((Math.pow(1 +i,n) - 1) / i) ;
    return S;
  }

  calcular_P(A:number, i:number,n:number):number{
    let P:number;
    P=A*((1-Math.pow(1 +i,-n)) / i) ;
    return P;
  }

}
