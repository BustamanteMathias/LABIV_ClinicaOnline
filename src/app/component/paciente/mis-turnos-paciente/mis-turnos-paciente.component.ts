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

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private context: AngularFireDatabase
  ) {
  }

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

  VolverPaciente() {
    this.router.navigate(['paciente/mi-perfil']);
  }
}
