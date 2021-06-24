import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {

  constructor(private router:Router) {}
  spinner:boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  Ir(path:string){
    this.router.navigate([path]);
  }
}
