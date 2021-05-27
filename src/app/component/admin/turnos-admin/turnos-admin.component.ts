import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-turnos-admin',
  templateUrl: './turnos-admin.component.html',
  styleUrls: ['./turnos-admin.component.scss'],
})
export class TurnosAdminComponent implements OnInit {
  listaTurnos: Observable<any[]>;
  listaTurnosUsuario: any[] = [];
  listaUsuarios: Observable<any[]>;
  listaProfesionales: any[] = [];
  listaPacientes: any[] = [];

  listaDOM: any[] = [];
  filterPost: string = '';

  constructor(
    private router: Router,
    private context: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS PROFESIONALES
        this.listaProfesionales = response.filter((p) => p.tipo == 'PROFESIONAL');
        this.listaPacientes = response.filter((p) => p.tipo == 'PACIENTE');
      },
      (error) => {
        console.log(error);
      }
    );

    this.listaTurnos = this.context.list('turnos').valueChanges();
    this.listaTurnos.subscribe(
      (response) => {
        //GUARDO TODOS LOS TURNOS
        this.listaTurnosUsuario = response;
        this.listaDOM = [];

        this.listaTurnosUsuario.forEach((turno) => {
          this.listaProfesionales.forEach((profesional) => {
            if (turno.idProfesional == profesional.id) {
              this.listaPacientes.forEach((paciente) => {
                if (turno.idPaciente == paciente.id) {
                  this.listaDOM.push({
                    turno: turno,
                    profesional: profesional,
                    paciente: paciente,
                  });
                }
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

  Volver() {
    this.router.navigate(['admin']);
  }
}
