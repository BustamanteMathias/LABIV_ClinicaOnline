import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent implements OnInit {

  @Input() paciente:any = {
    nombre: '',
    apellido: '',
    tipo: '',
    edad: '',
    correo: ''
  };

  @Input() numero:number = 0;
  @Output() outPut_Correo = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  EnviarOutput(correo:string){
    this.outPut_Correo.emit(correo);
  }

}
