import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import * as XLSX from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.scss'],
  animations: [
    trigger('animacionMenu', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition(
        ':enter',
        animate(
          750,
          style({
            transform: 'translateY(0%)',
            opacity: 1,
          })
        )
      ),
    ]),
  ],
})
export class InicioAdminComponent implements OnInit {

  @Input() listaProfesionales:any;
  @Input() listaPacientes:any;
  @Input() listaTurnos:any;
  iconoDescarga:string = '../../../../assets/Iconos/descargar.svg';
  iconoExcel:string = '../../../../assets/Iconos/excel.svg';
  iconoPdf:string = '../../../../assets/Iconos/pdf.svg';

  verPopUp:boolean = false;
  listaFiltro:any[] = [];
  fileName:string = 'File.xlsx';
  constructor() { }

  ngOnInit(): void {
  }

  ExportExcel(path:string, idElementoTabla:string): void
  {
    let element = document.getElementById(idElementoTabla);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, path);
  }

  Confirmar(opcion:boolean){
    if(opcion){
      this.ExportExcel(this.fileName, 'excel-tabla-filtro');
    }else{
      this.verPopUp = false;
    }
  }

  VerPouUpPaciente(paciente:any){
    this.verPopUp = true;
    this.fileName = paciente.apellido + '-' + paciente.nombre + '.xlsx';
    this.listaFiltro = [];

    this.listaTurnos.forEach(t => {
      if(t.idPaciente == paciente.id){
        for (const profesional of this.listaProfesionales) {
          if(t.idProfesional == profesional.id){
            this.listaFiltro.push({
              turno: t,
              paciente: paciente,
              profesional: profesional
            });
          }
        }
      }
    });
  }
}
