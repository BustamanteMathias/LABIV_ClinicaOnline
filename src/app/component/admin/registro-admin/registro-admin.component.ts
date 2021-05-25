import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../model/admin';
import { FirebaseService } from '../../../service/firebase.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss'],
})
export class RegistroAdminComponent implements OnInit {
  form: FormGroup;

  captchas: string[] = [
    '../../../../assets/Captcha1.png',
    '../../../../assets/Captcha2.png',
    '../../../../assets/Captcha3.png',
  ];
  captchaRandom: number = 0;
  errorCuenta: boolean = false;
  errorCaptcha: boolean = false;
  avatarAdmin: string = '../../../../assets/AvatarAdmin.png';
  listaProfesiones: string[] = [];
  file1: any;
  file2: any;
  img1: any;
  img2: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private fireStorage: AngularFireStorage,
    private router: Router,
    private toast: ToastrService
  ) {
    this.buildForm();
    this.captchaRandom = Math.floor(Math.random() * (3 - 0));
  }

  ngOnInit(): void {
    this.listaProfesiones = this.firebase.firebaseProfesiones;
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
      captcha: ['', [Validators.required]],
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

  ValidarCaptcha(tipo: string): boolean {
    let captcha: string;
    captcha = this.form.value.captcha.toUpperCase();

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

    console.log();
    console.log('Num: ' + this.captchaRandom + ' captcha: ' + captcha);
    return this.errorCaptcha;
  }

  RegistrarAdmin(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const value = this.form.value;
      let admin: Admin = new Admin();
      let pass: string = value.password;

      admin.id = '';
      admin.nombre = value.nombre;
      admin.apellido = value.apellido;
      admin.correo = value.correo;
      admin.dni = value.dni;
      admin.edad = value.edad;
      admin.estado = 'ALTA';
      admin.foto1 = '';
      admin.tipo = 'ADMIN';

      this.Register(admin.correo, pass, admin);
      this.router.navigate(['']);
    }
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

  Ir(){
    //this.router.navigate(['admin/usuarios']);
  }
}
