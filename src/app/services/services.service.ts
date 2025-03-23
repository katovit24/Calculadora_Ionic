import { Injectable, input } from '@angular/core';
import { ResultadoOperacion } from '../Interfaces/resultado-operacion';
import { BotonOperacion } from '../Interfaces/boton-operacion';
import { Pilas } from '../Interfaces/pilas';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  add(numeroOperacion:number, numero : number, stringOperacion: string):ResultadoOperacion{
    const KEY_NUMBER : number =10;
    let resultadoOperacion: ResultadoOperacion = { numero: 0, cadena: "" };
    resultadoOperacion.numero=numeroOperacion*KEY_NUMBER+numero;
    resultadoOperacion.cadena=stringOperacion + numero.toString();
    return resultadoOperacion
  }

  addSymbol(stringOperacion:string, simbolo : string):string{
    return  stringOperacion + simbolo;
  }

  botonIgual(total :number){
    
  }

  separaPilas(stringOperacion:string, pilaOperadores:string[], pilaOperandos:string[]):Pilas{

    pilaOperadores = stringOperacion.match(/[+\-*/]/g) || [];
    pilaOperandos = stringOperacion.match(/\d+/g) || [];
    return {pilaOperadores: pilaOperadores, pilaOperandos:pilaOperandos}
  }
    
  operarPilas(pilaOperadores:string[], pilaOperandos:string[]):number{

    let valorFinal : number = 0;
    let valor : number = 0;
    
    while (pilaOperadores.includes("*") || pilaOperadores.includes("/")) {

      let indexMultiplicacion = pilaOperadores.indexOf("*");
      let indexDivision = pilaOperadores.indexOf("/");

      if((indexMultiplicacion==-1 && indexDivision!=-1) ||
        (indexDivision!=-1 && indexMultiplicacion!=-1 
        && indexDivision < indexMultiplicacion)){

        valor = parseFloat(pilaOperandos[indexDivision]) / parseFloat(pilaOperandos[indexDivision +1])
        pilaOperandos[indexDivision] = valor.toString();
        pilaOperandos.splice(indexDivision +1, 1)
        pilaOperadores.splice(indexDivision,1)
   
        if(pilaOperandos.length==1){
          valorFinal = valor
        }
        valor = 0;
      }

      if((indexDivision==-1 && indexMultiplicacion!=-1) ||
        (indexMultiplicacion!=-1 && indexDivision!=-1 
        && indexMultiplicacion < indexDivision)){

        valor = parseFloat(pilaOperandos[indexMultiplicacion]) * parseFloat(pilaOperandos[indexMultiplicacion +1])
        pilaOperandos[indexMultiplicacion] = valor.toString();
        pilaOperandos.splice(indexMultiplicacion +1, 1)
        pilaOperadores.splice(indexMultiplicacion,1)
 
        if(pilaOperandos.length==1){
          valorFinal = valor
        }
        valor = 0;
      }

   }
   
   while (pilaOperadores.length > 0) {
      if(pilaOperadores[0]=="+"){ 

         valor = parseFloat(pilaOperandos[0])+parseFloat(pilaOperandos[1]);
         pilaOperadores.shift();
         pilaOperandos.shift();
         pilaOperandos[0] = valor.toString();

         if(pilaOperandos.length==1){
          valorFinal = valor
        }
         valor=0; 
      }

      if(pilaOperadores[0]=="-"){

        valor = parseFloat(pilaOperandos[0])-parseFloat(pilaOperandos[1]);
        pilaOperadores.shift();
        pilaOperandos.shift();
        pilaOperandos[0] = valor.toString();

        if(pilaOperandos.length==1){
         valorFinal = valor
       }
        valor=0; 
     }
   }
    return valorFinal;
  }
  
      
  

  
}
