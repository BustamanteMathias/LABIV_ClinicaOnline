import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('animacionUsuariosTest', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter', animate(300, style({
        transform: 'translateX(0%)',
        opacity: 1
      }))),
    ]),
    trigger('animacionBoton', [
      state('activo', style({
        opacity: 1
      })),
      state('inactivo', style({
        opacity: 0
      })),
      transition('activo <=> inactivo', animate(300))
    ]),
  ],
})


export class LoginComponent implements OnInit {

  form: FormGroup;
  errorCuenta: boolean = false;

  hCuenta: string = '';
  hPass: string = '';

  cRecordar: boolean = false;
  verUsuariosTest:boolean = false;

  listaUsuarios: Observable<any[]>;
  Paciente1: any;
  Paciente2: any;
  Admin: any;
  Profesional1: any;
  Profesional2: any;

  correoHardcodeo: string = '';

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

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private firebase: FirebaseService,
    private router: Router,
    private context: AngularFireDatabase
  ) {
    this.buildForm();
  }

  GetCorreoCard($event){
    this.form.get('correo').setValue($event);
    this.form.get('password').setValue('123456');
  }

  private buildForm() {
    if (localStorage.getItem('correo') && localStorage.getItem('pass')) {
      this.form = this.formBuilder.group({
        correo: [
          localStorage.getItem('correo'),
          [Validators.required, Validators.email],
        ],
        password: [
          localStorage.getItem('pass'),
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
      });
    } else {
      this.form = this.formBuilder.group({
        correo: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
      });
    }
  }

  Ingresar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const value = this.form.value;
      this.Login(value.correo, value.password);
    } else {
      this.form.markAllAsTouched();
      //this.toastr.warning('TEXTO 1!', 'TEXTO 2');
    }
  }

  Login(_correo: string, _pass: string) {
    this.firebase
      .Login(_correo, _pass)
      .then((res: any) => {
        if (
          res.user.emailVerified ||
          ((_correo == 'paciente1@lab.com' ||
            _correo == 'paciente2@lab.com' ||
            _correo == 'profesional1@lab.com' ||
            _correo == 'profesional2@lab.com' ||
            _correo == 'admin@lab.com') &&
            _pass == '123456')
        ) {
          if (this.cRecordar) {
            this.GuardarInformacionLocalDeUsuario(res.user.uid, _correo, _pass);
          } else {
            this.LimpiarInformacionDelUsuario();
            this.GuardarInformacionLocalDeUsuario(res.user.uid);
          }

          switch (this.firebase.userData$.tipo) {
            case 'ADMIN':
              this.router.navigate(['admin']);
              break;
            case 'PACIENTE':
              this.router.navigate(['paciente']);
              break;
            case 'PROFESIONAL':
              this.router.navigate(['profesional']);
              break;
            default:
              break;
          }

        } else {
          this.toast.error(
            'Falta verificación de Correo Electronico',
            'Error',
            { timeOut: 10000 }
          );
        }
      })
      .catch((error: any) => {
        this.toast.error(error, 'Error', { timeOut: 10000 });
      });
  }

  GuardarInformacionLocalDeUsuario(
    uID: string,
    correo?: string,
    pass?: string
  ) {
    localStorage.setItem('uID', uID);

    if (correo) {
      localStorage.setItem('correo', correo);
    }
    if (pass) {
      localStorage.setItem('pass', pass);
    }
  }


  LimpiarInformacionDelUsuario() {
    localStorage.removeItem('uID');
    localStorage.removeItem('correo');
    localStorage.removeItem('pass');
  }

  Ir(path:string){
    this.router.navigate([path]);
  }

  estadoAnimacion:string = 'activo';

  VerUsuariosTest(){
    this.estadoAnimacion = this.estadoAnimacion === 'activo' ? 'inactivo' : 'activo';
    this.verUsuariosTest = !this.verUsuariosTest;
    this.estadoAnimacion = 'activo';
  }
}
