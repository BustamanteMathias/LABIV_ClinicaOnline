import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.scss']
})
export class InicioAdminComponent implements OnInit {

  @Input() listaProfesionales:any;
  @Input() listaPacientes:any;

  constructor() { }

  ngOnInit(): void {
  }

}
