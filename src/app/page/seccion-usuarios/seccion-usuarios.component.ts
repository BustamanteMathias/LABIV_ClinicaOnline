import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent implements OnInit {

  listaProfesionalesPendientes:any[]=[];
  listaProfesionalesAlta:any[]=[];

  listaProfesionales:any[];
  listaPacientes:any[];

  selectNavBar:string = 'INICIO';

  spinner:boolean = false;

  constructor(private firebase: FirebaseService) {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 4000);
  }


  ngOnInit(): void {
    this.listaProfesionalesPendientes = this.firebase.GetProfesionales().filter(profesional => profesional.estado == 'PENDIENTE');
    this.listaProfesionalesAlta = this.firebase.GetProfesionales().filter(profesional => profesional.estado == 'ALTA');

    this.listaPacientes = this.firebase.GetPacientes();
    this.listaProfesionales = this.firebase.GetProfesionales();
  }

  GetSelect($event){
    this.selectNavBar = $event;
  }
}
