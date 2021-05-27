import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Turno } from '../model/turno';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  public userData$: any;

  listaUsuarios: Observable<any[]>;
  firebaseUsuarios: any[] = [];
  firebaseProfesiones: any[] = [];

  constructor(
    private AFauth: AngularFireAuth,
    private context: AngularFireDatabase,
    private router: Router,
  ) {
    // Inicializar
    this.FirebaseGetAllData();
  }

  FirebaseGetAllData() {
    this.FirebaseUsuarios();
  }

  FirebaseUsuarios() {
    this.listaUsuarios = this.context.list('usuarios').valueChanges();
    this.listaUsuarios.subscribe(
      (response) => {
        //GUARDO TODOS LOS USUARIOS
        this.firebaseUsuarios = response;
        //GUARDO PROFESIONES
        this.GetProfesiones(this.firebaseUsuarios);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  GetProfesiones(listaUsuarios:any){
    listaUsuarios.forEach(u => {
      if(u.tipo == 'PROFESIONAL' && u.estado == 'ALTA'){
        u.especialidades.forEach(e => {
          if(!this.firebaseProfesiones.includes(e)){
            this.firebaseProfesiones.push(e);
          }
        });
      }
    });
  }

  Login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(
        (response) => {
          this.SetTipoUsuario(response.user.uid);
          resolve(response);
        },
        (error: any) => {
          console.log(error);
          switch (error.code) {
            case 'auth/user-not-found':
              rejected('El usuario no existe');
              break;
            case 'auth/invalid-email':
              rejected('Mail invalido');
              break;
            case 'auth/wrong-password':
              rejected('Contraseña incorrecta');
              break;
            default:
              rejected(error);
              break;
          }
        }
      );
    });
  }

  Register(email: string, password: string) {
    return new Promise<any>((resolve, rejected) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(
        (response: any) => {
          this.EnviarMailDeVerificacion();
          this.router.navigate(['']);
          resolve(response);
        },
        (error: any) => {
          switch (error.code) {
            case 'auth/weak-password':
              rejected('Contraseña corta');
              break;
            case 'auth/invalid-email':
              rejected('Mail invalido');
              break;
            case 'auth/wrong-password':
              rejected('Contraseña invalida');
              break;
            case 'auth/email-already-in-use':
              rejected('Correo existente');
              break;
            default:
              rejected('ERROR' + error);
              break;
          }
        }
      );
    });
  }

  Insert_Turno(t: Turno): Promise<void> {
    t.GenerarID();
    return this.context.list('turnos').set(t.id, t);
  }

  Insert_Usuario(p: any) {
    switch (p.tipo) {
      case 'PACIENTE':
        this.GetCurrentUser().then((response: any) => {
          this.context.list('usuarios').set(response.uid, {
            id: response.uid,
            tipo: p.tipo,
            correo: p.correo,
            nombre: p.nombre,
            apellido: p.apellido,
            edad: p.edad,
            dni: p.dni,
            obraSocial: p.obraSocial,
            foto1: p.foto1,
            foto2: p.foto2,
            estado: p.estado,
          });
        });
        this.LogOutCurrentUser();
        break;
      case 'PROFESIONAL':
        this.GetCurrentUser().then((response: any) => {
          this.context.list('usuarios').set(response.uid, {
            id: response.uid,
            tipo: p.tipo,
            correo: p.correo,
            nombre: p.nombre,
            apellido: p.apellido,
            edad: p.edad,
            dni: p.dni,
            foto1: p.foto1,
            estado: p.estado,
            especialidades: p.especialidades,
            atiende: p.atiende,
          });
        });
        this.LogOutCurrentUser();
        break;

      case 'ADMIN':
        this.GetCurrentUser().then((response: any) => {
          this.context.list('usuarios').set(response.uid, {
            id: response.uid,
            tipo: p.tipo,
            correo: p.correo,
            nombre: p.nombre,
            apellido: p.apellido,
            edad: p.edad,
            dni: p.dni,
            foto1: p.foto1,
            estado: p.estado,
          });
        });
        this.LogOutCurrentUser();
        break;
    }
  }

  Update_Usuario(value) {
    this.GetCurrentUser().then((response: any) => {
      this.context.list('usuarios').update(value.id, value);
    });
  }

  Update_Turno(value) {
    this.GetCurrentUser().then((response: any) => {
      this.context.list('turnos').update(value.id, value);
    });
  }

  async EnviarMailDeVerificacion() {
    return await (await this.AFauth.currentUser).sendEmailVerification();
  }

  GetCurrentUser() {
    return this.AFauth.currentUser;
  }

  LogOutCurrentUser() {
    this.AFauth.signOut();
  }

  SetTipoUsuario(uid:any){
    this.firebaseUsuarios.forEach(u =>{
      if(u.estado == 'ALTA' && u.id == uid){
        this.userData$ = u;
        localStorage.setItem('uid', u.id);
      }
    });
  }

  GetProfesionales() : any[]{
    let auxLista:any[] = [];

    this.firebaseUsuarios.forEach( p => {
      if(p.tipo == 'PROFESIONAL'){
        auxLista.push(p);
      }
    });

    return auxLista;
  }

  GetPacientes() : any[]{
    let auxLista:any[] = [];

    this.firebaseUsuarios.forEach( p => {
      if(p.tipo == 'PACIENTE'){
        auxLista.push(p);
      }
    });

    return auxLista;
  }

}
