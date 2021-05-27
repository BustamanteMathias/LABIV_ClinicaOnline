import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-card-profesional',
  templateUrl: './card-profesional.component.html',
  styleUrls: ['./card-profesional.component.scss'],
})
export class CardProfesionalComponent implements OnInit {
  @Input() profesional: any = {
    nombre: '',
    apellido: '',
    tipo: '',
    edad: '',
    correo: '',
    foto1:
      'https://firebasestorage.googleapis.com/v0/b/clinicaonline2021-d1bf2.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=6e76614c-3fda-49a4-9ed9-a3d10c62b2be',
  };
  @Input() numero: number;
  @Output() outPut_Correo = new EventEmitter<string>();

  refFoto1: any;

  constructor(private aStorage: AngularFireStorage) {}

  ngOnInit(): void {
    //Obtener Foto
    this.refFoto1 = this.aStorage.storage.ref().child(this.profesional.foto1);
    this.refFoto1.getDownloadURL().then((url) => {
      this.profesional.foto1 = url;
    });
  }

  EnviarOutput(correo: string) {
    this.outPut_Correo.emit(correo);
  }
}
