import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  verGeneral: boolean = true;
  ver: number = 0;
  constructor(private router: Router) {}
  spinner: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  Ir(path: string) {
    this.router.navigate([path]);
  }

  Ver(opc: number) {
    this.verGeneral = false;
    opc == 0 ? (this.verGeneral = true) : (this.ver = opc);
  }

  DescargarPDF() {
    // Extraemos el
    const DATA = document.getElementById("canvas"+this.ver.toString());
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_estadistica.pdf`);
      });
  }
}
