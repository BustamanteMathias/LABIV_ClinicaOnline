import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-inhabilitar-acceso',
  templateUrl: './inhabilitar-acceso.component.html',
  styleUrls: ['./inhabilitar-acceso.component.scss']
})
export class InhabilitarAccesoComponent implements OnInit {

  @Input() listaProfesionales:any;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  Inhabilitar(profesional:any){
    profesional.estado = 'PENDIENTE';
    this.firebase.Update_Usuario(profesional);
  }
}
