import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.scss'],
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
export class EncuestaPacienteComponent implements OnInit {
  @Output() eOpcion = new EventEmitter<boolean>();
  @Output() eMensaje = new EventEmitter<any>();

  verError:boolean = false;

  calificacion: number = 1;
  recomendacion: string = 'SI';
  atencion: string = 'BUENA';
  estadoEstablecimiento: string = 'BUENO';

  constructor() {}

  ngOnInit(): void {}

  Confirmar(opcion: boolean) {
    if (opcion) {
      if (
        this.atencion != '' &&
        this.estadoEstablecimiento != '' &&
        this.recomendacion &&
        this.calificacion > 0 &&
        this.calificacion < 6
      ) {
        this.verError = false;
        this.eOpcion.emit(opcion);
        this.eMensaje.emit({
          atencionRecibida: this.atencion,
          estadoEstablecimiento: this.estadoEstablecimiento,
          recomiendaClinida: this.recomendacion,
          servicioOnline: this.calificacion,
        });
      }else{
        this.verError = true;
      }
    }
  }
}
