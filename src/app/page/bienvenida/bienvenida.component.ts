import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  swap:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  Swap(){
    this.swap = !this.swap;
  }
}
