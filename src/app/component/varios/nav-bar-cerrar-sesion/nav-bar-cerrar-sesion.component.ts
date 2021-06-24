import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-nav-bar-cerrar-sesion',
  templateUrl: './nav-bar-cerrar-sesion.component.html',
  styleUrls: ['./nav-bar-cerrar-sesion.component.scss']
})
export class NavBarCerrarSesionComponent implements OnInit {

  @Input() Titulo:string = '';

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  CerrarSesion(){
    this.firebase.LogOutCurrentUser();
    this.router.navigate(['']);
  }

  Ir(path:string){
    this.router.navigate([path]);
  }
}
