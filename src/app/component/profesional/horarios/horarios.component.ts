import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
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
export class HorariosComponent implements OnInit {
  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private context: AngularFireDatabase
  ) {}

  sDia: string = 'LUNES';
  profesion: string;
  fin: string = '1900';
  inicio: string = '800';
  listaEspecialidades: any = [];

  habDes: string = 'Deshabilitar';
  checked: boolean = true;

  listaUsuarios: Observable<any[]>;
  usuarioAux:any;

  ngOnInit(): void {
    if (this.firebase.userData$ != undefined) {
      this.firebase.userData$.especialidades.forEach((element) => {
        this.listaEspecialidades.push(element);
      });
      this.profesion = this.listaEspecialidades[0];
    }

    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS PACIENTES
        this.usuarioAux = response.filter(
          (p) => p.id == this.firebase.userData$.id
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  HabilitarDeshabilitar() {
    !this.checked
      ? (this.habDes = 'Deshabilitar')
      : (this.habDes = 'Habilitar');
  }

  SetHorario(cond: boolean) {

    if (cond) {
      let auxHora: any = {
        estado: this.checked,
        inicio: parseInt(this.inicio),
        fin: parseInt(this.fin),
        literal: this.sDia.toUpperCase(),
        profesion: this.profesion.toUpperCase(),
      };

      if (
        auxHora.inicio < auxHora.fin &&
        auxHora.literal != '' &&
        auxHora.profesion != '' &&
        auxHora.literal != undefined &&
        auxHora.profesion != undefined
      ) {
        switch (auxHora.literal) {
          case 'LUNES':
            this.usuarioAux[0].atiende[0].lunes = auxHora;
            console.log()
            break;
          case 'MARTES':
            this.usuarioAux[0].atiende[0].martes = auxHora;
            break;
          case 'MIERCOLES':
            this.usuarioAux[0].atiende[0].miercoles = auxHora;
            break;
          case 'JUEVES':
            this.usuarioAux[0].atiende[0].jueves = auxHora;
            break;
          case 'VIERNES':
            this.usuarioAux[0].atiende[0].viernes = auxHora;
            break;
          case 'SABADO':
            this.usuarioAux[0].atiende[0].sabado = auxHora;
            break;
        }
        this.firebase.Update_Usuario(this.usuarioAux[0]);
      }else{
        console.log('error')
      }
    } else {
      this.router.navigate(['profesional/mi-perfil']);
    }
  }
}
