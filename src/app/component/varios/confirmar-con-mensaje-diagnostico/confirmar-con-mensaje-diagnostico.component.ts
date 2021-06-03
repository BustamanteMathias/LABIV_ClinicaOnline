import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar-con-mensaje-diagnostico',
  templateUrl: './confirmar-con-mensaje-diagnostico.component.html',
  styleUrls: ['./confirmar-con-mensaje-diagnostico.component.scss'],
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
export class ConfirmarConMensajeDiagnosticoComponent implements OnInit {
  @Input() Titulo: string = '';
  @Input() subTitulo: string = '';
  @Output() eOpcion = new EventEmitter<boolean>();
  @Output() eMensaje = new EventEmitter<string>();
  @Output() eDiagnostico = new EventEmitter<any>();

  msj: string = '';

  eMsj: boolean = false;
  eDato1: boolean = false;
  eDato2: boolean = false;
  eDato3: boolean = false;
  eDescripcion1: boolean = false;
  eDescripcion2: boolean = false;
  eDescripcion3: boolean = false;

  vAltura: number = 1.8;
  vPeso: number = 80;
  vTemperatura: number = 36.5;
  vPresion: number = 80;
  vDato1: string = '';
  vDato2: string = '';
  vDato3: string = '';
  vDescripcion1: string = '';
  vDescripcion2: string = '';
  vDescripcion3: string = '';

  constructor() {}

  ngOnInit(): void {}

  Confirmar(opcion: boolean) {
    if (this.msj != '') {
      if (
        (this.vDato1 != '' && this.vDescripcion1 == '') ||
        (this.vDato1 == '' && this.vDescripcion1 != '') ||
        (this.vDato2 != '' && this.vDescripcion2 == '') ||
        (this.vDato2 == '' && this.vDescripcion2 != '') ||
        (this.vDato3 != '' && this.vDescripcion3 == '') ||
        (this.vDato3 == '' && this.vDescripcion3 != '')
      ) {
        if (this.vDato1 != '' && this.vDescripcion1 == '') {
          this.eDescripcion1 = true;
        }
        if (this.vDato1 == '' && this.vDescripcion1 != '') {
          this.eDato1 = true;
        }

        if (this.vDato2 != '' && this.vDescripcion2 == '') {
          this.eDescripcion2 = true;
        }
        if (this.vDato2 == '' && this.vDescripcion2 != '') {
          this.eDato2 = true;
        }

        if (this.vDato3 != '' && this.vDescripcion3 == '') {
          this.eDescripcion3 = true;
        }
        if (this.vDato3 == '' && this.vDescripcion3 != '') {
          this.eDato3 = true;
        }
      } else {
        this.eMsj = false;
        this.eDato1 = false;
        this.eDato2 = false;
        this.eDato3 = false;
        this.eDescripcion1 = false;
        this.eDescripcion2 = false;
        this.eDescripcion3 = false;
        this.eOpcion.emit(opcion);
        this.eMensaje.emit(this.msj);
        this.eDiagnostico.emit({
          altura: this.vAltura,
          peso: this.vPeso,
          presion: this.vPresion,
          temperatura: this.vTemperatura,
          datosGenerico: [
            {
              clave: this.vDato1,
              valor: this.vDescripcion1,
            },
            {
              clave: this.vDato2,
              valor: this.vDescripcion2,
            },
            {
              clave: this.vDato3,
              valor: this.vDescripcion3,
            },
          ],
        });
      }
    } else {
      this.msj == '' ? (this.eMsj = true) : (this.eMsj = false);
    }
  }
}
