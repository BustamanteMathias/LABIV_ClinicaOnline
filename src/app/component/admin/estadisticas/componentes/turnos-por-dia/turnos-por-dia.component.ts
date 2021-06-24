import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.scss'],
})
export class TurnosPorDiaComponent implements OnInit, AfterViewInit {
  listaFirebase: Observable<any[]>;
  canvas: any;
  ctx: any;

  db_data: any = {
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
  };

  @ViewChild('mychart') mychart: any;

  constructor(private context: AngularFireDatabase) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.listaFirebase = this.context.list('turnos').valueChanges();
    this.listaFirebase.subscribe(
      (response) => {
        this.canvas = this.mychart.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        response.forEach((turno) => {
          let split: any[] = turno.fecha.split('/');
          let dia = new Date(split[2], split[1] - 1, split[0], 12).getDay();
          if(turno.estado == 'FINALIZADO'){
            switch (dia) {
              case 1:
                this.db_data.lunes++;
                break;
              case 2:
                this.db_data.martes++;
                break;
              case 3:
                this.db_data.miercoles++;
                break;
              case 4:
                this.db_data.jueves++;
                break;
              case 5:
                this.db_data.viernes++;
                break;
              case 6:
                this.db_data.sabado++;
                break;
            }
          }
        });

        new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            datasets: [
              {
                label: 'Cantidad de Turnos',
                backgroundColor: [
                  '#3e95cd',
                  '#8e5ea2',
                  '#3cba9f',
                  '#e8c3b9',
                  '#c45850',
                  '#ffba9f',
                ],
                data: [
                  this.db_data.lunes,
                  this.db_data.martes,
                  this.db_data.miercoles,
                  this.db_data.jueves,
                  this.db_data.viernes,
                  this.db_data.sabado,
                ],
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'TURNOS POR DÍA',
            },
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
