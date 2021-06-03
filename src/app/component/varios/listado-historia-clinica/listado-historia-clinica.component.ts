import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-listado-historia-clinica',
  templateUrl: './listado-historia-clinica.component.html',
  styleUrls: ['./listado-historia-clinica.component.scss'],
})
export class ListadoHistoriaClinicaComponent implements OnInit {
  tipoUsuario: string = this.firebase.userData$.tipo;
  listaTurnos: Observable<any[]>;
  listaUsuarios: Observable<any[]>;

  listaTotalTurnos: any[] = [];
  listaPaciente: any[] = [];
  listaProfesional: any[] = [];

  verFolder: boolean = true;
  listaAux: any[] = [];
  listaAuxTurno: any[] = [];
  listaAuxFiltro: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private context: AngularFireDatabase,
    private router: Router
  ) {}

  item: any;
  verComponentHistoria: boolean = false;
  iconoHistoriaClinica: string =
    '../../../../assets/Iconos/historiaClinica.svg';
  iconoFolder: string = '../../../../assets/Iconos/folder.svg';

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS USUARIOS
        this.listaPaciente = response.filter((p) => p.tipo == 'PACIENTE');
        this.listaProfesional = response.filter((p) => p.tipo == 'PROFESIONAL');
      },
      (error) => {
        console.log(error);
      }
    );

    this.listaTurnos = this.context.list('turnos').valueChanges();
    this.listaTurnos.subscribe(
      (response) => {
        //GUARDO TODOS LOS TURNOS
        this.listaTotalTurnos = response;
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {

      this.listaTotalTurnos.forEach((turno) => {
        let y,x = '';
        for (const item of this.listaPaciente) {
          if(item.id == turno.idPaciente){
            y = item;
          }
        }
        for (const item of this.listaProfesional) {
          if(item.id == turno.idProfesional){
            x = item;
          }
        }

        if(y != '' && x != ''){
          this.listaAux.push({
            turno: turno,
            paciente: y,
            profesional: x,
          });
        }
      });

      if (this.firebase.userData$.tipo == 'PACIENTE') {
        this.listaAux = this.listaAux.filter(
          (elemet) => elemet.turno.idPaciente == this.firebase.userData$.id && elemet.turno.estado == 'FINALIZADO'
        );
      } else if (this.firebase.userData$.tipo == 'PROFESIONAL') {
        this.listaAux = this.listaAux.filter(
          (elemet) => elemet.turno.idProfesional == this.firebase.userData$.id && elemet.turno.estado == 'FINALIZADO'
        );
      }
      this.listaAux.forEach((elemento) => {
        if (!this.listaAuxFiltro.includes(elemento.paciente)) {
          this.listaAuxFiltro.push(elemento.paciente);
        }
      });
    }, 200);
  }

  VerHistoriaClinica(elemento: any) {
    this.item = elemento;
    this.verComponentHistoria = true;
  }

  CerrarHistoriaClinica($event: boolean) {
    this.verComponentHistoria = $event;
  }

  Filtrar(paciente: any) {
    console.log(this.listaAuxTurno);
    this.listaAuxTurno = this.listaAux.filter(
      (elemento) => elemento.paciente.id == paciente.id
    );
    console.log(this.listaAuxTurno);
    this.verFolder = false;
  }

  Cerrar() {
    this.verFolder = true;
  }

  Volver(path: string) {
    this.router.navigate([path]);
  }
}
