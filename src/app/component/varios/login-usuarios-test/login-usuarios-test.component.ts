import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-usuarios-test',
  templateUrl: './login-usuarios-test.component.html',
  styleUrls: ['./login-usuarios-test.component.scss'],
})
export class LoginUsuariosTestComponent implements OnInit {
  listaUsuarios: Observable<any[]>;
  Paciente1: any;
  Paciente2: any;
  Admin: any;
  Profesional1: any;
  Profesional2: any;

  @Output() correoEvent = new EventEmitter<string>();
  correoHardcodeo: string = '';

  constructor(private context: AngularFireDatabase) {}

  ngOnInit(): void {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        response.forEach((usuario) => {
          switch (usuario.correo) {
            case 'paciente1@lab.com':
              this.correoHardcodeo = 'paciente1@lab.com';
              this.Paciente1 = usuario;
              break;
            case 'paciente2@lab.com':
              this.correoHardcodeo = 'paciente2@lab.com';
              this.Paciente2 = usuario;
              break;
            case 'profesional1@lab.com':
              this.correoHardcodeo = 'profesional1@lab.com';
              this.Profesional1 = usuario;
              break;
            case 'profesional2@lab.com':
              this.correoHardcodeo = 'profesional2@lab.com';
              this.Profesional2 = usuario;
              break;
            case 'admin@lab.com':
              this.correoHardcodeo = 'admin@lab.com';
              this.Admin = usuario;
              break;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SendCorreo($event) {
    this.correoEvent.emit(this.correoHardcodeo);
  }
}
