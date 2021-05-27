import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() SelectNavBar = new EventEmitter<string>();

  constructor(private firebase: FirebaseService, private router:Router) { }

  ngOnInit(): void {
  }

  Select(seleccion:string){
    this.SelectNavBar.emit(seleccion);
  }

  Volver(){
    this.router.navigate(['admin']);
  }
}
