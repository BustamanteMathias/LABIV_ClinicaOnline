import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/model/profesional';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-mi-perfil-generico',
  templateUrl: './mi-perfil-generico.component.html',
  styleUrls: ['./mi-perfil-generico.component.scss'],
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
          1000,
          style({
            transform: 'translateY(0%)',
            opacity: 1,
          })
        )
      ),
    ]),
  ],
})
export class MiPerfilGenericoComponent implements OnInit {
  objAux: any;
  tipoUsuario: string;
  refFoto1: any;
  refFoto2: any;
  listaEspecialidades:string = '';
  horariosProfesional:any = '';

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private aStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    if (this.firebase.userData$ != undefined) {
      this.tipoUsuario = this.firebase.userData$.tipo;
      this.objAux = this.firebase.userData$;

      switch (this.tipoUsuario) {
        case 'PACIENTE':
            this.refFoto1 = this.aStorage.storage
            .ref()
            .child(this.objAux.foto1);
          this.refFoto2 = this.aStorage.storage
            .ref()
            .child(this.objAux.foto2);
          this.refFoto1.getDownloadURL().then((url) => {
            this.objAux.foto1 = url;
          });
          this.refFoto2.getDownloadURL().then((url) => {
            this.objAux.foto2 = url;
          });
          break;

        default:
          this.refFoto1 = this.aStorage.storage
            .ref()
            .child(this.objAux.foto1);
          this.refFoto1.getDownloadURL().then((url) => {
            this.objAux.foto1 = url;
          });

          if(this.tipoUsuario == 'PROFESIONAL'){
            this.objAux.especialidades.forEach(e => {
              this.listaEspecialidades === '' ? this.listaEspecialidades = e : this.listaEspecialidades += ', ' + e;
            });

            this.horariosProfesional = this.objAux.atiende[0];
            if(this.horariosProfesional.lunes.estado){
              this.horariosProfesional.lunes.inicio = (this.horariosProfesional.lunes.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.lunes.fin = (this.horariosProfesional.lunes.fin/100).toString() + ':' + '00';
            }
            if(this.horariosProfesional.martes.estado){
              this.horariosProfesional.martes.inicio = (this.horariosProfesional.martes.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.martes.fin = (this.horariosProfesional.martes.fin/100).toString() + ':' + '00';
            }
            if(this.horariosProfesional.miercoles.estado){
              this.horariosProfesional.miercoles.inicio = (this.horariosProfesional.miercoles.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.miercoles.fin = (this.horariosProfesional.miercoles.fin/100).toString() + ':' + '00';
            }
            if(this.horariosProfesional.jueves.estado){
              this.horariosProfesional.jueves.inicio = (this.horariosProfesional.jueves.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.jueves.fin = (this.horariosProfesional.jueves.fin/100).toString() + ':' + '00';
            }
            if(this.horariosProfesional.viernes.estado){
              this.horariosProfesional.viernes.inicio = (this.horariosProfesional.viernes.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.viernes.fin = (this.horariosProfesional.viernes.fin/100).toString() + ':' + '00';
            }
            if(this.horariosProfesional.sabado.estado){
              this.horariosProfesional.sabado.inicio = (this.horariosProfesional.sabado.inicio/100).toString() + ':' + '00';
              this.horariosProfesional.sabado.fin = (this.horariosProfesional.sabado.fin/100).toString() + ':' + '00';
            }
          }
          break;
      }
    }
  }

  Ir(path: string) {
    this.router.navigate([path]);
  }
}
