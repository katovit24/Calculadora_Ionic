import { Component, input } from '@angular/core';
import { IonTextarea, IonContent, IonGrid, IonCol, IonRow,IonButton, IonIcon, IonLabel, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { backspaceOutline, addOutline, closeOutline, reorderTwoOutline, removeOutline } from 'ionicons/icons';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultadoOperacion } from '../Interfaces/resultado-operacion';
import { BotonOperacion } from '../Interfaces/boton-operacion';
import { Operadores } from '../Interfaces/operadores';
import { Pilas } from '../Interfaces/pilas';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonGrid, IonRow, IonButton, IonIcon, IonInput, IonTextarea]
  
})
export class HomePage {
  constructor(public servicio : ServicesService) {
    addIcons({ backspaceOutline, addOutline, closeOutline, reorderTwoOutline, removeOutline })
  }

  public numeroInicial = 0;
  public total : number | null= null;
  public stringOperacion : string = "";
  public numeroOperacion : number =0;
  public botonOperacion : BotonOperacion = {operador: "", pulsado: false};
  public resultadoOperacion: ResultadoOperacion = {numero: 0, cadena: ""};

  public pilaOperadores : string[]=[];
  public pilaOperandos: string[]=[];

  public listaNumeros : number[]= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  public operadores: Map<string, Operadores> = new Map([
    ["sumar", { simbolo: "+", operador: "Suma" }],
    ["restar", { simbolo: "-", operador: "Resta" }],
    ["multiplicar", { simbolo: "*", operador: "Multiplicación" }],
    ["dividir", { simbolo: "/", operador: "División" }],
    ["igual", { simbolo: "=", operador: "Igual" }]
  ]);


  public add( numero: number): void {
    
    let resultadoOperacion : ResultadoOperacion = this.servicio.add(this.numeroOperacion, numero, this.stringOperacion);
    this.numeroOperacion = resultadoOperacion.numero;
    this.stringOperacion = resultadoOperacion.cadena;

    this.pilaOperadores = this.servicio.separaPilas(this.stringOperacion, this.pilaOperadores, this.pilaOperandos).pilaOperadores;
    this.pilaOperandos = this.servicio.separaPilas(this.stringOperacion, this.pilaOperadores, this.pilaOperandos).pilaOperandos;
   
    this.igual();
  }

  public restart():void{
    this.stringOperacion="";
    this.total=null;
  }

  public botonIgual():void{
   // this.stringOperacion=this.total?.toString();
  }

  public addSymbol(simbolo: string): BotonOperacion {
    
        this.stringOperacion = this.servicio.addSymbol(this.stringOperacion, simbolo);
        //this.igual();
        return this.botonOperacion = {operador: simbolo, pulsado:true};
  }

   public igual( ):void{
    
     this.total=this.servicio.operarPilas(this.pilaOperadores, this.pilaOperandos);
     console.log(this.total)

   }
   

}
