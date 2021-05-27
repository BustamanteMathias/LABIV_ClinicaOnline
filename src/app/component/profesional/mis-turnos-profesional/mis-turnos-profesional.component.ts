import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/model/turno';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-mis-turnos-profesional',
  templateUrl: './mis-turnos-profesional.component.html',
  styleUrls: ['./mis-turnos-profesional.component.scss']
})
export class MisTurnosProfesionalComponent implements OnInit {
  listaTurnos: Observable<any[]>;
  listaTurnosUsuario: any[] = [];
  listaUsuarios: Observable<any[]>;
  listaPacientes: any[] = [];
  listaDOM: any[] = [];
  filterPost: string = '';
  //CONTROL DOM
  verTabla:boolean = true;
  eventOpcion:boolean = false;

  verCancelarTurno:boolean = false;
  verRechazarTurno:boolean = false;
  verAceptarTurno:boolean = false;
  verFinalizarTurno:boolean  = false;
  verReseniaTurno:boolean = false;
  //

  itemActual:any;
  msjAux:string = '';

  constructor(private router: Router,
    private firebase: FirebaseService,
    private context: AngularFireDatabase) { }

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS PACIENTES
        this.listaPacientes = response.filter(
          (p) => p.tipo == 'PACIENTE'
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
          (t) => t.idProfesional == this.firebase.userData$.id
        );
        this.listaDOM = [];
        this.listaTurnosUsuario.forEach((t) => {
          this.listaPacientes.forEach((p) => {
            if (t.idPaciente == p.id) {
              this.listaDOM.push({
                turno: t,
                paciente: p,
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

  Cancelar(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verCancelarTurno = true;
  }

  Rechazar(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verRechazarTurno = true;
  }

  Aceptar(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verAceptarTurno = true;
  }

  Finalizar(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verFinalizarTurno = true;
  }

  Resenia(item:any){
    this.verTabla = false;
    this.itemActual = item;
    this.verReseniaTurno = true;
  }

  setMsj(event$:string){
    this.msjAux = event$;
  }

  eventCancelarTurno(event$){
    setTimeout(() => {
      if(event$){
        this.itemActual.turno.comentarioProfesional = this.msjAux;
        this.itemActual.turno.estado = 'CANCELADO';
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verCancelarTurno = false;
        this.verTabla = true;

        this.itemActual = [];
        this.msjAux = '';
      }else{
        this.verCancelarTurno = false;
        this.verTabla = true;
      }

    }, 200);
  }

  eventRechazarTurno(event$){
    setTimeout(() => {
      if(event$){
        this.itemActual.turno.comentarioProfesional = this.msjAux;
        this.itemActual.turno.estado = 'RECHAZADO';
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verRechazarTurno = false;
        this.verTabla = true;

        this.itemActual = [];
        this.msjAux = '';
      }else{
        this.verRechazarTurno = false;
        this.verTabla = true;
      }

    }, 200);
  }

  eventAceptarTurno(event$){
    setTimeout(() => {
      if(event$){
        this.itemActual.turno.estado = 'ACEPTADO';
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verAceptarTurno = false;
        this.verTabla = true;

        this.itemActual = [];
      }else{
        this.verAceptarTurno = false;
        this.verTabla = true;
      }

    }, 200);
  }

  eventFinalizarTurno(event$){
    setTimeout(() => {
      if(event$){
        this.itemActual.turno.comentarioProfesional = this.msjAux;
        this.itemActual.turno.estado = 'FINALIZADO';
        this.firebase.Update_Turno(this.itemActual.turno);
        this.verFinalizarTurno = false;
        this.verTabla = true;

        this.itemActual = [];
        this.msjAux = '';
      }else{
        this.verFinalizarTurno = false;
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

  VolverPaciente() {
    this.router.navigate(['profesional/mi-perfil']);
  }
}
