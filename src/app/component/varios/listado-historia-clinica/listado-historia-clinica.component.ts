import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  listaAuxFiltro2: any[] = [];

  imgGeneral: string = '../../../../assets/general.png';
  imgOculista: string = '../../../../assets/oculista.jpg';
  imgDentista: string = '../../../../assets/dentista.png';
  imgClinico: string = '../../../../assets/clinico.png';

  constructor(
    private firebase: FirebaseService,
    private context: AngularFireDatabase,
    private aStorage: AngularFireStorage,
    private router: Router
  ) {}

  item: any;
  verComponentHistoria: boolean = false;
  iconoHistoriaClinica: string =
    '../../../../assets/Iconos/historiaClinica.svg';
  iconoFolder: string = '../../../../assets/Iconos/folder.svg';
  iconoPdf: string = '../../../../assets/Iconos/pdf.svg';

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS USUARIOS
        this.listaPaciente = response.filter((p) => p.tipo == 'PACIENTE');
        this.listaProfesional = response.filter((p) => p.tipo == 'PROFESIONAL');

        //ME GUARDO LAS FOTOS
        this.listaPaciente.forEach((p) => {
          let refFoto1: any = this.aStorage.storage.ref().child(p.foto1);
          let refFoto2: any = this.aStorage.storage.ref().child(p.foto2);

          refFoto1.getDownloadURL().then((url) => {
            p.foto1 = url;
          });
          refFoto2.getDownloadURL().then((url) => {
            p.foto2 = url;
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
        //Ordeno turnos por fecha
        response.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return -1;
          }
          if (a.fecha < b.fecha) {
            return 1;
          }
          return 0;
        });
        //GUARDO TODOS LOS TURNOS
        this.listaTotalTurnos = response;
      },
      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      this.listaTotalTurnos.forEach((turno) => {
        let y,
          x = '';
        for (const item of this.listaPaciente) {
          if (item.id == turno.idPaciente) {
            y = item;
          }
        }
        for (const item of this.listaProfesional) {
          if (item.id == turno.idProfesional) {
            x = item;
          }
        }

        if (y != '' && x != '') {
          this.listaAux.push({
            turno: turno,
            paciente: y,
            profesional: x,
          });
        }
      });

      if (this.firebase.userData$.tipo == 'PACIENTE') {
        this.listaAux = this.listaAux.filter(
          (elemet) =>
            elemet.turno.idPaciente == this.firebase.userData$.id &&
            elemet.turno.estado == 'FINALIZADO'
        );
      } else if (this.firebase.userData$.tipo == 'PROFESIONAL') {
        this.listaAux = this.listaAux.filter(
          (elemet) =>
            elemet.turno.idProfesional == this.firebase.userData$.id &&
            elemet.turno.estado == 'FINALIZADO'
        );
      }

      this.listaAux.forEach((elemento) => {
        if (!this.listaAuxFiltro.includes(elemento.paciente)) {
          this.listaAuxFiltro.push(elemento.paciente);
        }
      });

      //Recorrer filtro y agregar turnos con id, agregar contador de 3
      this.listaAuxFiltro.forEach((filtro) => {
        let contador: number = 0;
        let aux: any = {
          paciente: filtro,
          t: {
            a: false,
            b: false,
            c: false,
          },
        };

        this.listaAux.forEach((turnos) => {
          if (
            filtro.id == turnos.paciente.id &&
            turnos.turno.estado == 'FINALIZADO'
          ) {
            switch (contador) {
              case 0:
                aux.t.a = turnos.turno;
                break;
              case 1:
                aux.t.b = turnos.turno;
                break;
              case 2:
                aux.t.c = turnos.turno;
                break;
            }
            contador++;
          }
        });

        this.listaAuxFiltro2.push(aux);
      });
      console.log(this.listaAux);
    }, 500);
  }

  VerHistoriaClinica(elemento: any) {
    this.item = elemento;
    this.verComponentHistoria = true;
  }

  CerrarHistoriaClinica($event: boolean) {
    this.verComponentHistoria = $event;
  }

  Filtrar(paciente: any) {
    this.listaAuxTurno = this.listaAux.filter(
      (elemento) => elemento.paciente.id == paciente.id
    );
    this.verFolder = false;
  }

  DescargarPDF(turno: any) {

    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });

    /**const doc = new jsPDF(); //'p', 'mm', 'a4'
    let imgData = '../../../../assets/clinico.png';
    doc.setFontSize(40);
    doc.text('Paranyan loves jsPDF', 35, 25);
    doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
    doc.save();*/
  }

  Cerrar() {
    this.verFolder = true;
  }

  Volver(path: string) {
    this.router.navigate([path]);
  }
}
