import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar-con-mensaje',
  templateUrl: './confirmar-con-mensaje.component.html',
  styleUrls: ['./confirmar-con-mensaje.component.scss'],
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
export class ConfirmarConMensajeComponent implements OnInit {

  @Input() Titulo:string = '';
  @Input() subTitulo:string = '';
  @Output() eOpcion = new EventEmitter<boolean>();
  @Output() eMensaje = new EventEmitter<string>();

  msj:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion:boolean){
    this.eOpcion.emit(opcion);
    this.eMensaje.emit(this.msj);
  }
}
