import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.scss']
})
export class InicioAdminComponent implements OnInit {

  @Input() listaProfesionales:any;
  @Input() listaPacientes:any;
  iconoDescarga:string = '../../../../assets/Iconos/descargar.svg';

  constructor() { }

  ngOnInit(): void {}

  ExportExcel(path:string, idElementoTabla:string): void
  {
    /* pass here the table id */
    let element = document.getElementById(idElementoTabla);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, path);

  }
}
