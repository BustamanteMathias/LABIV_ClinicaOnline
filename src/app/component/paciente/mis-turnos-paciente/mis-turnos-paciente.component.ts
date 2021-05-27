import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.scss'],
})
export class MisTurnosPacienteComponent implements OnInit {
  listaTurnos: Observable<any[]>;
  listaTurnosUsuario: any[] = [];
  listaUsuarios: Observable<any[]>;
  listaProfesionales: any[] = [];

  listaDOM: any[] = [];
  filterPost: string = '';
  //CONTROL DOM
  verTabla: boolean = true;
  eventOpcion: boolean = false;

  verCancelarTurno: boolean = false;
  verReseniaTurno: boolean = false;
  verAtencionTurno:boolean = false;
  //
  itemActual: any;
  msjAux: string = '';

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private context: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS PROFESIONALES
        this.listaProfesionales = response.filter(
          (p) => p.tipo == 'PROFESIONAL'
        );
      },
      (error) => {
        console.log(error);
      }
    );

    this.listaTurnos = this.context.list('turnos').valueChanges();
    this.listaTurnos.subscribe(
      (response) => {
        //GUARDO TODOS LOS TURNOS
        this.listaTurnosUsuario = response.filter(
          (t) => t.idPaciente == this.firebase.userData$.id
        );
        this.listaDOM = [];
        this.listaTurnosUsuario.forEach((t) => {
          this.listaProfesionales.forEach((p) => {
            if (t.idProfesional == p.id) {
              this.listaDOM.push({
                turno: t,
                profesional: p,
              });
            }
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Cancelar(item: any) {
    this.verTabla = false;
    this.itemActual = item;
    this.verCancelarTurno = true;
  }

  Resenia(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verReseniaTurno = true;
  }

  Atencion(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verAtencionTurno = true;
  }

  eventCancelarTurno(event$) {
    setTimeout(() => {
      if (event$) {
        this.itemActual.turno.comentarioPaciente = this.msjAux;
        this.itemActual.turno.estado = 'CANCELADO';
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verCancelarTurno = false;
        this.verTabla = true;

        this.itemActual = [];
        this.msjAux = '';
      } else {
        this.verCancelarTurno = false;
        this.verTabla = true;
      }
    }, 200);
  }

  eventAtencionTurno(event$) {
    setTimeout(() => {
      if (event$) {
        this.itemActual.turno.comentarioPaciente = this.msjAux;
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verAtencionTurno = false;
        this.verTabla = true;

        this.itemActual = [];
        this.msjAux = '';
      } else {
        this.verAtencionTurno = false;
        this.verTabla = true;
      }
    }, 200);
  }

  eventReseniaTurno(event$){
    if(!event$){
      this.verReseniaTurno = false;
      this.itemActual = [];
      this.verTabla = true;
    }
  }

  setMsj(event$: string) {
    this.msjAux = event$;
  }

  VolverPaciente() {
    this.router.navigate(['paciente/mi-perfil']);
  }
}
