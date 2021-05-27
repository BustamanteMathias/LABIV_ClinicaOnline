import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss'],
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
export class ConfirmarComponent implements OnInit {

  @Input() Titulo:string = '';
  @Output() eOpcion = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion:boolean){
    this.eOpcion.emit(opcion);
  }
}
