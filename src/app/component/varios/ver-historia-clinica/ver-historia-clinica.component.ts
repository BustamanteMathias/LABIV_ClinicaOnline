import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss'],
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
          500,
          style({
            transform: 'translateY(0%)',
            opacity: 1,
          })
        )
      ),
    ]),
  ],
})
export class VerHistoriaClinicaComponent implements OnInit {

  @Input() hClinica:any;

  @Output() Ver = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  Cerrar(){
    this.Ver.emit(false);
  }
}
