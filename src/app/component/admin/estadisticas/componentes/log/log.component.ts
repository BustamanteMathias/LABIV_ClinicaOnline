import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  listaFirebase: Observable<any[]>;
  listaLog: any[] = [];

  constructor(private context: AngularFireDatabase) { }

  ngOnInit(): void {
    this.listaFirebase = this.context.list('log').valueChanges();
    this.listaFirebase.subscribe(
      (response) => {
        //FALTA ORDENAR LA LISTA PARA OBTENER LOS ULTIMOS OCHO
        for (let i = 0; i < response.length - 1; i++) {
          for (let j = i + 1; j < response.length; j++) {

            if(response[j].dia > response[i].dia){
              let aux = response[i];
              response[i] = response[j];
              response[j] = aux;
            }else if(response[j].dia == response[i].dia){
              if(response[j].hora > response[i].hora){
                let aux = response[i];
                response[i] = response[j];
                response[j] = aux;
              }
            }
          }
        }
        this.listaLog = response.slice(0, 8);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
