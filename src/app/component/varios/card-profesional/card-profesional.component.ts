import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-profesional',
  templateUrl: './card-profesional.component.html',
  styleUrls: ['./card-profesional.component.scss']
})
export class CardProfesionalComponent implements OnInit {

  @Input() profesional:any = {
    nombre: '',
    apellido: '',
    tipo: '',
    edad: '',
    correo: ''
  };
  @Input() numero:number;
  @Output() outPut_Correo = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  EnviarOutput(correo:string){
    this.outPut_Correo.emit(correo);
  }

}
