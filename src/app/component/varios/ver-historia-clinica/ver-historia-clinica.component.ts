import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss'],
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
          500,
          style({
            transform: 'translateY(0%)',
            opacity: 1,
          })
        )
      ),
    ]),
  ],
})
export class VerHistoriaClinicaComponent implements OnInit {

  @Input() hClinica:any;

  @Output() Ver = new EventEmitter<boolean>();
  iconoPdf: string = '../../../../assets/Iconos/pdf.svg';

  constructor() { }

  ngOnInit(): void {
  }

  Cerrar(){
    this.Ver.emit(false);
  }

  private GenerarCabeceraPDF(doc: any){
    let imgLogoClinica:string = '../../../../assets/clinica.jpg';

    //'a4': [595.28, 841.89],
    let hoy = new Date();
    doc.text('Emitido: ' + hoy.getDate() + '/' + hoy.getMonth() + '/' + hoy.getFullYear(),10,20);
    doc.setFontSize(40);
    let fontSize = doc.internal.getFontSize();
    let pageWidth = doc.internal.pageSize.width;
    let txtWidth = doc.getStringUnitWidth('CLÍNICA ONLINE')*fontSize/doc.internal.scaleFactor;
    let x = ( pageWidth - txtWidth ) / 2;
    doc.text('CLÍNICA ONLINE',x,100);

    doc.addImage(imgLogoClinica, 'JPEG', 212.5, 150, 180, 180);
    //doc.addPage();
    return doc;
  }

  DescargarPDF() {

    // Extraemos el
    let DATA = document.getElementById('historiaClinica');
    let doc = new jsPDF('p', 'pt', 'a4');
    let options = {
      background: 'white',
      scale: 3,
      align : "center"
    };

    doc = this.GenerarCabeceraPDF(doc);

    html2canvas(DATA, options).then((canvas) => {

      let img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      let bufferX = 15;
      let bufferY = 400;
      let imgProps = (doc as any).getImageProperties(img);
      let pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_HistoriaClinica.pdf`);
    });

    /**const doc = new jsPDF(); //'p', 'mm', 'a4'
    let imgData = '../../../../assets/clinico.png';
    doc.setFontSize(40);
    doc.text('Paranyan loves jsPDF', 35, 25);
    doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
    doc.save();*/
  }
}
