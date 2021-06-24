import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos-solicitados-por-medico',
  templateUrl: './turnos-solicitados-por-medico.component.html',
  styleUrls: ['./turnos-solicitados-por-medico.component.scss'],
})
export class TurnosSolicitadosPorMedicoComponent
  implements OnInit, AfterViewInit
{
  listaFirebaseTurnos: Observable<any[]>;
  listaTurnos: any[] = [];
  listaFirebaseProfesionales: Observable<any[]>;
  listaUsuarios: any[] = [];
  listaUidProfesionales: any[] = [];
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  constructor(private context: AngularFireDatabase) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.listaFirebaseTurnos = this.context.list('turnos').valueChanges();
    this.listaFirebaseTurnos.subscribe((response) => {
      //GUARDO TODOS LOS TURNOS
      this.listaTurnos = response;

      this.listaFirebaseProfesionales = this.context
        .list('usuarios')
        .valueChanges();
      this.listaFirebaseProfesionales.subscribe((response2) => {
        //GUARDO TODOS LOS PROFESIONALES
        this.listaUsuarios = response2;

        //ME QUEDO CON LOS UID
        this.listaUsuarios.forEach((u) => {
          if(u.estado == 'ALTA' && u.tipo == 'PROFESIONAL'){
            if (!this.listaUidProfesionales.includes(u.id)) {
              this.listaUidProfesionales.push(u.id);
            }
          }
        });
        //MATCHEO UID CON USUARIO
        let profesionales: string[] = [];
        let cantidad: number[] = [];
        let colorGrafico: string[] = [];
        this.listaUidProfesionales.forEach((id) => {
          this.listaUsuarios.forEach((u) => {
            if (id == u.id) {
              profesionales.push(u.apellido + ', ' + u.nombre);
            }
          });

          let aux: number = 0;
          this.listaTurnos.forEach((t) => {
            if (id == t.idProfesional) {
              aux++;
            }
          });
          cantidad.push(aux);

          colorGrafico.push(
            '#' + Math.floor(Math.random() * 16777215).toString(16)
          );
        });
        //CANVAS
        this.canvas = this.mychart.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        new Chart(this.ctx, {
          type: 'horizontalBar',
          data: {
            labels: profesionales,
            datasets: [
              {
                label: 'Cantidad de turnos solicitados',
                backgroundColor: colorGrafico,
                data: cantidad,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'TURNOS SOLICITADOS POR MEDICO',
            },
          },
        });
      });
    });
  }
}
