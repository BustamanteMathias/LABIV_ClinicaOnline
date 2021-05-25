import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-habilitar-acceso',
  templateUrl: './habilitar-acceso.component.html',
  styleUrls: ['./habilitar-acceso.component.scss']
})
export class HabilitarAccesoComponent implements OnInit {

  @Input() listaProfesionales:any;

  constructor(private firebase: FirebaseService) {
  }

  ngOnInit(): void {
  }

  Habilitar(profesional:any){
    profesional.estado = 'ALTA';
    this.firebase.Update_Usuario(profesional);
  }

}
