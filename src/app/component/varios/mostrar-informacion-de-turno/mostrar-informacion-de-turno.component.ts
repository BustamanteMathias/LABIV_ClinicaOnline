import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mostrar-informacion-de-turno',
  templateUrl: './mostrar-informacion-de-turno.component.html',
  styleUrls: ['./mostrar-informacion-de-turno.component.scss'],
  animations: [
    trigger('animacionMenu', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition(
        ':enter',
        animate(
          750,
          style({
            transform: 'translateY(0%)',
            opacity: 1,
          })
        )
      ),
    ]),
  ],
})
export class MostrarInformacionDeTurnoComponent implements OnInit {
  @Input() Titulo: string = '';
  @Input() subTitulo: string = '';
  @Output() eOpcion = new EventEmitter<boolean>();
  @Input() Turno: any;

  verComponentHistoria: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  Confirmar(opcion: boolean) {
    this.eOpcion.emit(opcion);
  }

  VerHistoriaClinica() {
    this.verComponentHistoria = true;
  }

  CerrarHistoriaClinica($event){
    this.verComponentHistoria = $event;
  }
}
