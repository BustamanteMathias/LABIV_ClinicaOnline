import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-habilitar-acceso',
  templateUrl: './habilitar-acceso.component.html',
  styleUrls: ['./habilitar-acceso.component.scss']
})
export class HabilitarAccesoComponent implements OnInit {

  @Input() listaProfesionales:any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
