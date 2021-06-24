import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.scss'],
})
export class TurnosPorEspecialidadComponent implements OnInit, AfterViewInit {
  listaFirebase: Observable<any[]>;
  listaTurnos: any[] = [];
  canvas: any;
  ctx: any;

  //AUXILIARES
  listaProfesionesContador: any[] = [];
  listaProfesiones: any[] = [];

  @ViewChild('mychart') mychart: any;

  constructor(private context: AngularFireDatabase) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.listaFirebase = this.context.list('turnos').valueChanges();
    this.listaFirebase.subscribe(
      (response) => {
        //GUARDO TODOS LOS TURNOS
        this.listaTurnos = response;
        this.listaTurnos.forEach((turno) => {
          if (!this.listaProfesiones.includes(turno.area)) {
            this.listaProfesiones.push(turno.area);
          }
        });

        this.listaProfesiones.forEach((p) => {
          this.listaProfesionesContador.push({ area: p, contador: 0 });
        });

        this.listaTurnos.forEach((turno) => {
          this.listaProfesionesContador.forEach((e) => {
            if (turno.area == e.area) {
              e.contador++;
            }
          });
        });

        //PROCESO PARA EL GRAFICO
        let profesion: string[] = [];
        let cantidad: number[] = [];
        let colorGrafico: string[] = [];

        this.listaProfesionesContador.forEach((e) => {
          profesion.push(e.area);
          cantidad.push(e.contador);
          colorGrafico.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        });

        this.canvas = this.mychart.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: profesion,
            datasets: [
              {
                label: 'Cantidad de Turnos',
                backgroundColor: colorGrafico,
                data: cantidad,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'TURNOS POR ESPECIALIDAD',
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
