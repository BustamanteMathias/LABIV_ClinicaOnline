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
  }

  GetSelect($event){
    this.selectNavBar = $event;
  }
}
