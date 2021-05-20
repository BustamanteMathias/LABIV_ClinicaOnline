import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inhabilitar-acceso',
  templateUrl: './inhabilitar-acceso.component.html',
  styleUrls: ['./inhabilitar-acceso.component.scss']
})
export class InhabilitarAccesoComponent implements OnInit {

  @Input() listaProfesionales:any;

  constructor() { }

  ngOnInit(): void {
  }

}
