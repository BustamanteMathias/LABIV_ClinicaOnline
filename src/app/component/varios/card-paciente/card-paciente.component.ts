import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent implements OnInit {

  @Input() paciente:any = {
    nombre: '',
    apellido: '',
    tipo: '',
    edad: '',
    correo: '',
    foto1: 'https://firebasestorage.googleapis.com/v0/b/clinicaonline2021-d1bf2.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=6e76614c-3fda-49a4-9ed9-a3d10c62b2be',
    foto2: 'https://firebasestorage.googleapis.com/v0/b/clinicaonline2021-d1bf2.appspot.com/o/usuarios%2Fdefault.png?alt=media&token=6e76614c-3fda-49a4-9ed9-a3d10c62b2be'
  };

  refFoto1:any;
  refFoto2:any;

  @Input() numero:number = 0;
  @Output() outPut_Correo = new EventEmitter<string>();

  constructor(private aStorage: AngularFireStorage) { }

  ngOnInit(): void {
    //Obtener Foto
    this.refFoto1 = this.aStorage.storage.ref().child(this.paciente.foto1);
    this.refFoto2 = this.aStorage.storage.ref().child(this.paciente.foto2);
    this.refFoto1.getDownloadURL().then(url => {
      this.paciente.foto1 = url;
    });
    this.refFoto2.getDownloadURL().then((url) => {
      this.paciente.foto2 = url;
    });
  }

  EnviarOutput(correo:string){
    this.outPut_Correo.emit(correo);
  }

}
