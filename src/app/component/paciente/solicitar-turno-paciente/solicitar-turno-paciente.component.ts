import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Turno } from '../../../model/turno';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-solicitar-turno-paciente',
  templateUrl: './solicitar-turno-paciente.component.html',
  styleUrls: ['./solicitar-turno-paciente.component.scss'],
})
export class SolicitarTurnoPacienteComponent implements OnInit {
  listaUsuarios: Observable<any[]>;
  listaProfesionales: any[] = [];
  listaTurnos: Observable<any[]>;
  listaTurnosDisponibles: any[] = [];

  //LISTAS DOM
  listaPacientes: any[] = [];
  listaEspecialidades: any[] = [];
  listaProfesionalesEspecialidadSeleccionada: any[] = [];
  listaHorariosDisponibles: any[] = [];
  //
  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private context: AngularFireDatabase
  ) {}

  @Input() EsAdmin: boolean = false;

  spinner: boolean = false;
  verPacientes: boolean = false;
  verEspecialidades: boolean = true;
  verProfesionales: boolean = false;
  verHorariosDisponibles: boolean = false;
  verConfirmar: boolean = false;
  //VARIABLES PARA SOLICITAR TURNO
  idPaciente_Admin: string = '';
  idProfesional: string = '';
  areaEspecialidad: string = '';
  fecha: string = '';
  hora: string = '';
  //

  auxProfesional: any;

  ngOnInit(): void {
    this.spinner = true;
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS PROFECIONALES
        this.listaProfesionales = response.filter(
          (p) => p.tipo == 'PROFESIONAL' && p.estado == 'ALTA'
        );

        if (this.EsAdmin) {
          //GUARDO TODOS LOS PACIENTES
          this.listaPacientes = response.filter(
            (p) => p.tipo == 'PACIENTE' && p.estado == 'ALTA'
          );

          this.Ver(0);
        } else {
          this.Ver(1);
        }

        this.listaProfesionales.forEach((profesional) => {
          profesional.especialidades.forEach((especialidad) => {
            if (!this.listaEspecialidades.includes(especialidad)) {
              this.listaEspecialidades.push(especialidad);
            }
          });
        });

      },
      (error) => {
        console.log(error);
      }
    );

    this.listaTurnos = this.context.list('turnos').valueChanges();
    this.listaTurnos.subscribe(
      (response) => {
        //GUARDO TODOS LOS TURNOS
        this.listaTurnosDisponibles = response;
      },
      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      this.ObtenerTurnosDisponibles();
      this.ArmarListaHorarios();
      this.spinner = false;
    }, 2000);
  }

  //: if request.auth != null; Salvar por las dudas, la poronga de Storage lloraba por esta validacion al tomar fotos.
  SetPaciente(p: any) {
    this.idPaciente_Admin = p.id;
    this.Ver(1);
  }

  SetEspecialidad(e: string) {
    this.areaEspecialidad = e;
    this.ListaProfesionalPorEspecialidad(e);
    this.Ver(2);
  }

  ListaProfesionalPorEspecialidad(especialidadSeleccionada: string) {
    this.listaProfesionales.forEach((profesional) => {
      profesional.especialidades.forEach((especialidad) => {
        if (especialidad == especialidadSeleccionada) {
          if (
            !this.listaProfesionalesEspecialidadSeleccionada.includes(
              profesional
            )
          ) {
            this.listaProfesionalesEspecialidadSeleccionada.push(profesional);
          }
        }
      });
    });
  }

  SetProfesional(p: any) {
    //aux para Confirmar
    this.auxProfesional = p;
    //
    this.idProfesional = p.id;
    this.ObtenerTurnosDisponibles();
    this.ArmarListaHorarios();
    this.Ver(3);
  }

  SetFechaHora(f: string, h: string) {
    this.fecha = f;
    this.hora = h;
    this.Ver(4);
  }

  Confirmar(opcion: boolean) {
    if (opcion) {
      this.Ver(5);
      this.SetTurno();
    }
  }

  Ver(opcion: number) {
    switch (opcion) {
      case 0:
        this.verEspecialidades = false;
        this.verProfesionales = false;
        this.verHorariosDisponibles = false;
        this.verConfirmar = false;
        this.verPacientes = true;
        break;
      case 1:
        this.verEspecialidades = true;
        this.verProfesionales = false;
        this.verHorariosDisponibles = false;
        this.verConfirmar = false;
        this.verPacientes = false;
        break;
      case 2:
        this.verEspecialidades = false;
        this.verProfesionales = true;
        this.verHorariosDisponibles = false;
        this.verConfirmar = false;
        this.verPacientes = false;
        break;
      case 3:
        this.verEspecialidades = false;
        this.verProfesionales = false;
        this.verHorariosDisponibles = true;
        this.verConfirmar = false;
        this.verPacientes = false;
        break;
      case 4:
        this.verEspecialidades = false;
        this.verProfesionales = false;
        this.verHorariosDisponibles = false;
        this.verConfirmar = true;
        this.verPacientes = false;
        break;
      case 5:
        this.verEspecialidades = false;
        this.verProfesionales = false;
        this.verHorariosDisponibles = false;
        this.verConfirmar = false;
        this.verPacientes = false;
        if (this.EsAdmin) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['paciente']);
        }
        break;
    }
  }

  SetTurno() {
    if (this.firebase.userData$ != undefined) {
      let t: Turno = new Turno();
      if (this.EsAdmin) {
        t.idPaciente = this.idPaciente_Admin;
      } else {
        t.idPaciente = this.firebase.userData$.id;
      }
      t.idProfesional = this.idProfesional;
      t.area = this.areaEspecialidad;
      t.fecha = this.fecha;
      t.hora = this.hora;

      this.firebase
        .Insert_Turno(t)
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log('Error, usuario no autenticado');
    }
  }

  ObtenerTurnosDisponibles() {
    let tLunes: any[] = [];
    let tMartes: any[] = [];
    let tMiercoles: any[] = [];
    let tJueves: any[] = [];
    let tViernes: any[] = [];
    let tSabado: any[] = [];

    this.listaProfesionales.forEach((p) => {
      if (p.id == this.idProfesional) {
        //LUNES
        if (p.atiende[0].lunes.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].lunes.inicio);
          let auxFin: number = parseInt(p.atiende[0].lunes.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tLunes.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'LUNES',
          fecha: '',
          horarios: tLunes,
        });
        //MARTES
        if (p.atiende[0].martes.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].martes.inicio);
          let auxFin: number = parseInt(p.atiende[0].martes.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tMartes.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'MARTES',
          fecha: '',
          horarios: tMartes,
        });
        //MIERCOLES
        if (p.atiende[0].miercoles.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].miercoles.inicio);
          let auxFin: number = parseInt(p.atiende[0].miercoles.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tMiercoles.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'MIERCOLES',
          fecha: '',
          horarios: tMiercoles,
        });
        //JUEVES
        if (p.atiende[0].jueves.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].jueves.inicio);
          let auxFin: number = parseInt(p.atiende[0].jueves.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tJueves.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'JUEVES',
          fecha: '',
          horarios: tJueves,
        });
        //VIERNES
        if (p.atiende[0].viernes.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].viernes.inicio);
          let auxFin: number = parseInt(p.atiende[0].viernes.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tViernes.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'VIERNES',
          fecha: '',
          horarios: tViernes,
        });
        //SABADO
        if (p.atiende[0].sabado.estado == true) {
          let auxInicio: number = parseInt(p.atiende[0].sabado.inicio);
          let auxFin: number = parseInt(p.atiende[0].sabado.fin);

          for (let index = auxInicio; index <= auxFin; index += 100) {
            let auxHora =
              index.toString().slice(0, index.toString().length - 2) +
              ':' +
              index.toString().slice(index.toString().length - 2);
            tSabado.push(auxHora);
          }
        }
        this.listaHorariosDisponibles.push({
          dia: 'SABADO',
          fecha: '',
          horarios: tSabado,
        });
      }
    });
  }

  ArmarListaHorarios() {
    this.ObtenerTurnosDisponibles();

    let auxLista: any[] = [...this.listaHorariosDisponibles];
    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      auxLista.push(this.listaHorariosDisponibles[index]);
    }

    let d = new Date();
    let auxCorte: any[];
    let auxCorte2: any[];

    if (d.getDay() != 0) {
      auxCorte = auxLista.slice(d.getDay() - 1, auxLista.length);
      auxCorte2 = auxLista.slice(0, d.getDay() - 1);
      auxLista = [...auxCorte];
      for (let index = 0; index < auxCorte2.length; index++) {
        auxLista.push(auxCorte2[index]);
      }
    }

    this.listaHorariosDisponibles = [...auxLista];

    //Coloco fecha
    let cont: number = 0;
    let auxFecha: string[] = [];

    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      auxFecha.push(this.SumarFecha(cont));
      if (this.listaHorariosDisponibles[index].dia == 'SABADO') {
        cont += 2;
      } else {
        cont++;
      }
    }

    let nuevoArray: any[] = [];
    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      nuevoArray.push({
        dia: this.listaHorariosDisponibles[index].dia,
        fecha: auxFecha[index],
        horarios: this.listaHorariosDisponibles[index].horarios,
      });
    }
    this.listaHorariosDisponibles = [...nuevoArray];

    // HASTA ACA TENGO LOS HORARIOS DISPONIBLES POR PROFESIONAL
    // ACA FILTRO LOS NO DISPONIBLES

    this.listaTurnosDisponibles.forEach((turno) => {
      if (turno.idProfesional == this.idProfesional) {
        for (
          let index = 0;
          index < this.listaHorariosDisponibles.length;
          index++
        ) {
          if (this.listaHorariosDisponibles[index].fecha == turno.fecha) {
            this.listaHorariosDisponibles[index].horarios.forEach((horario) => {
              if (horario == turno.hora) {
                let indexHorario =
                  this.listaHorariosDisponibles[index].horarios.indexOf(
                    horario
                  );
                this.listaHorariosDisponibles[index].horarios.splice(
                  indexHorario,
                  1
                );
              }
            });
          }
        }
      }
    });

    //ME QUEDO CON LOS PROXIMOS 15 DIAS
    if (this.listaHorariosDisponibles.length > 16) {
      let aux: any[] = [];

      for (let index = 1; index < 16; index++) {
        const element = this.listaHorariosDisponibles[index];
        aux.push(element);
      }

      this.listaHorariosDisponibles = aux;
    }
  }

  SumarFecha(cantDias: number): string {
    var Fecha = new Date();
    var sFecha =
      fecha ||
      Fecha.getDate() +
        '/' +
        (Fecha.getMonth() + 1) +
        '/' +
        Fecha.getFullYear();
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + cantDias);
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    let fechaFinal: string = dia + sep + mes + sep + anno;
    return fechaFinal;
  }

  VolverPaciente() {
    this.router.navigate(['paciente/mi-perfil']);
  }

  VolverAdmin() {
    this.router.navigate(['admin']);
  }
}
