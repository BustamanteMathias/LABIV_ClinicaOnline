import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {

  listaUsuarios: Observable<any[]>;
  listaTurnos: Observable<any[]>;

  listaProfesionalesPendientes:any[]=[];
  listaProfesionalesAlta:any[]=[];

  listaProfesionales:any[];
  listaPacientes:any[];
  listaTotalTurnos:any[];

  selectNavBar:string = 'INICIO';

  spinner:boolean = false;

  constructor(private context: AngularFireDatabase) {

  }


  ngOnInit(): void {
    this.spinner = true;

    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS USUARIOS

        this.listaPacientes = response.filter(paciente => paciente.tipo == 'PACIENTE');
        this.listaProfesionales = response.filter(paciente => paciente.tipo == 'PROFESIONAL');

        this.listaProfesionalesPendientes = this.listaProfesionales.filter(profesional => profesional.estado == 'PENDIENTE');
        this.listaProfesionalesAlta = this.listaProfesionales.filter(profesional => profesional.estado == 'ALTA');
      },
      (error) => {
        console.log(error);
      }
    );

    this.listaTurnos = this.context.list('turnos').valueChanges();
    this.listaTurnos.subscribe(
      (response) => {
        this.listaTotalTurnos = response;
      },
      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

  GetSelect($event){
    this.selectNavBar = $event;
  }
}
