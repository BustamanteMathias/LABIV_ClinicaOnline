import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../service/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { Admin } from '../../model/admin';
import { Paciente } from '../../model/paciente';
import { Profesional } from '../../model/profesional';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;

  tipo: string = 'PACIENTE';
  titulo: string = 'PACIENTE';
  btnCanbiarRegistro: string = '';
  captchas: string[] = [
    '../../../assets/Captcha1.png',
    '../../../assets/Captcha2.png',
    '../../../assets/Captcha3.png',
  ];
  captchaRandom: number = 0;
  errorCuenta: boolean = false;
  errorCaptcha: boolean = false;

  listaProfesiones: string[] = [];
  file1: any;
  file2: any;
  img1: any;
  img2: any;

  //DATOS CRUD - PROFESIONAL
  _pProfesiones: string[] = [];
  //

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private fireStorage: AngularFireStorage,
    private router: Router,
    private toast: ToastrService
  ) {
    this.buildForm();
    this.captchaRandom = Math.floor(Math.random() * (3 - 0));
    if (this.tipo == 'PACIENTE') {
      this.btnCanbiarRegistro = 'PROFESIONAL';
    }
  }

  ngOnInit(): void {
    this.listaProfesiones = this.firebase.firebaseProfesiones;
  }

  CambiarTipoRegistro() {
    this.RecargarCaptcha();

    if (this.tipo == 'PACIENTE') {
      this.btnCanbiarRegistro = this.tipo;
      this.tipo = 'PROFESIONAL';
    } else {
      this.btnCanbiarRegistro = this.tipo;
      this.tipo = 'PACIENTE';
    }
  }

  RecargarCaptcha() {
    let aux: number = Math.floor(Math.random() * (3 - 0));

    while (aux == this.captchaRandom) {
      aux = Math.floor(Math.random() * (3 - 0));
    }

    this.captchaRandom = aux;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      edad: [
        '18',
        [Validators.required, Validators.min(18), Validators.max(99)],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999),
        ],
      ],
      obraSocial: ['NINGUNA', [Validators.required]],
      captcha: ['', [Validators.required]],
    });

    this.form2 = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      edad: [
        '18',
        [Validators.required, Validators.min(18), Validators.max(99)],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999),
        ],
      ],
      profesion: ['',],
      captcha: ['', [Validators.required]],
      nuevaProfesion: ['', [Validators.minLength(3)]],
    });
  }

  GetFoto(e) {
    this.file1 = e.target.files[0];
    this.file2 = e.target.files[1];
  }

  SubirFile(id: string) {
    if (this.file1) {
      this.img1 = `/usuarios/${id}/1`;
      this.fireStorage.upload(this.img1, this.file1);
    } else {
      this.img1 = `/usuarios/default.jpg`;
    }

    if (this.file2) {
      this.img2 = `/usuarios/${id}/2`;
      this.fireStorage.upload(this.img2, this.file2);
    } else {
      this.img2 = `/usuarios/default.jpg`;
    }
  }

  ValidarCaptcha(tipo: string) : boolean {
    let captcha: string;

    if(tipo == 'PACIENTE'){
      captcha = this.form.value.captcha;
    }else{
      captcha = this.form2.value.captcha;
    }

    captcha = captcha.toUpperCase();

    this.errorCaptcha = false;
    switch (this.captchaRandom) {
      case 0:
        if (captcha != 'LMAO') {
          this.errorCaptcha = true;
        }
        break;
      case 1:
        if (captcha != 'UWU') {
          this.errorCaptcha = true;
        }
        break;
      case 2:
        if (captcha != 'AYUDA') {
          this.errorCaptcha = true;
        }
        break;
      default:
        console.log('Captcha indefinido');
        break;
    }
    return this.errorCaptcha;
  }

  RegistrarPaciente(event: Event) {

    if (!this.ValidarCaptcha('PACIENTE')) {
      event.preventDefault();

      if (this.form.valid) {
        const value = this.form.value;
        let paciente = new Paciente();
        let pass = value.password;

        paciente.apellido = value.apellido;
        paciente.correo = value.correo;
        paciente.dni = value.dni;
        paciente.edad = value.edad;
        paciente.nombre = value.nombre;
        paciente.obraSocial = value.obraSocial;
        paciente.estado = 'ALTA';
        paciente.id = '';
        paciente.foto1 = '';
        paciente.foto2 = '';

        this.Register(paciente.correo, pass, paciente);
        this.router.navigate(['']);
      } else {
        this.form.markAllAsTouched();
        //this.toastr.warning('TEXTO 1!', 'TEXTO 2');
      }
    }
  }

  RegistrarProfesional(event: Event) {

    if (!this.ValidarCaptcha('PROFESIONAL')) {
      event.preventDefault();

      if (this.form2.valid) {
        const value = this.form2.value;
        let profesional = new Profesional();
        let pass = value.password;

        profesional.apellido = value.apellido;
        profesional.correo = value.correo;
        profesional.dni = value.dni;
        profesional.edad = value.edad;
        profesional.nombre = value.nombre;
        profesional.estado = 'PENDIENTE';
        profesional.foto1 = '';

        this.listaProfesiones.forEach((p) => {
          profesional.especialidades.push(p);
        });

        this.Register(profesional.correo, pass, profesional);
      } else {
        this.form2.markAllAsTouched();
        //this.toastr.warning('TEXTO 1!', 'TEXTO 2');
      }
    }
  }

  SetProfesion(profesion: string) {
    profesion = profesion.toLocaleUpperCase();
    if (profesion != '' && profesion.length > 2) {
      let index = this._pProfesiones.indexOf(profesion);
      if (index != -1) {
        this._pProfesiones.splice(index, 1);
      } else {
        this._pProfesiones.push(profesion);
      }

      index = this.listaProfesiones.indexOf(profesion);
      if (index == -1) {
        this.listaProfesiones.push(profesion);
      }
    }
  }

  Login(_correo: string, _pass: string) {
    this.firebase
      .Login(_correo, _pass)
      .then((res: any) => {
        if (res.user.emailVerified) {
          //this.router.navigate(['admin/seccion-usuarios']);
        } else {
          this.toast.error(
            'Falta verificación de Correo Electronico',
            'Error',
            { timeOut: 5000 }
          );
        }
      })
      .catch((error: any) => {
        this.toast.error(error, 'Error', { timeOut: 5000 });
      });
  }

  Register(correo: string, password: string, usuario: any) {
    this.firebase
      .Register(correo, password)
      .then((resolve) => {
        this.firebase.GetCurrentUser().then((user) => {
          this.SubirFile(user.uid);
          if (usuario.tipo == 'PACIENTE') {
            usuario.foto1 = this.img1;
            usuario.foto2 = this.img2;
            this.firebase.Insert_Usuario(usuario);
          } else {
            usuario.foto1 = this.img1;
            this.firebase.Insert_Usuario(usuario);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
