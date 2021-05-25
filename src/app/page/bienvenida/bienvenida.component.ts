import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  pathIcon:string = '../../../assets/favicon.png';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Ir(path:string){
    this.router.navigate([path]);
  }
}
