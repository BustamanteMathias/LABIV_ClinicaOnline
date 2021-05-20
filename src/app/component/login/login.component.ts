import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorCuenta: boolean = false;

  hCuenta: string = '';
  hPass: string = '';

  cRecordar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.buildForm();
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

  ngOnInit(): void {}

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

  HardcodeoUsuarios(tipoCuenta: string) {
    switch (tipoCuenta) {
      case 'PACIENTE':
        this.form.get('correo').setValue('paciente@example.com');
        this.form.get('password').setValue('123456');
        break;
      case 'ADMIN':
        this.form.get('correo').setValue('admin@example.com');
        this.form.get('password').setValue('123456');
        break;
      case 'PROFESIONAL':
        this.form.get('correo').setValue('profesional@example.com');
        this.form.get('password').setValue('123456');
        break;
    }
  }

  Login(_correo: string, _pass: string) {
    this.firebase
      .Login(_correo, _pass)
      .then((res: any) => {
        if (
          res.user.emailVerified ||
          ((_correo == 'paciente@example.com' ||
            _correo == 'admin@example.com' ||
            _correo == 'profesional@example.com') &&
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
              this.router.navigate(['admin/seccion-usuarios']);
              break;
            case 'PACIENTE':
              this.router.navigate(['admin/seccion-usuarios']);
              break;
            case 'PROFESIONAL':
              this.router.navigate(['admin/seccion-usuarios']);
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
}
