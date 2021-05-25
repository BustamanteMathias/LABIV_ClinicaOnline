import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Initialize Firebase
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseService } from "./service/firebase.service";
import { environment } from "../environments/environment";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BienvenidaComponent } from './page/bienvenida/bienvenida.component';
import { Error404Component } from './component/error404/error404.component';
import { SeccionUsuariosComponent } from './page/seccion-usuarios/seccion-usuarios.component';
import { NavBarComponent } from './component/admin/nav-bar/nav-bar.component';
import { HabilitarAccesoComponent } from './component/admin/habilitar-acceso/habilitar-acceso.component';
import { InhabilitarAccesoComponent } from './component/admin/inhabilitar-acceso/inhabilitar-acceso.component';
import { NuevosUsuariosComponent } from './component/admin/nuevos-usuarios/nuevos-usuarios.component';
import { RegistroAdminComponent } from './component/admin/registro-admin/registro-admin.component';
import { InicioAdminComponent } from './component/admin/inicio-admin/inicio-admin.component';
import { SprinnerComponent } from './component/sprinner/sprinner.component';
import { PageLoginComponent } from './page/page-login/page-login.component';
import { PageRegisterComponent } from './page/page-register/page-register.component';
import { CardPacienteComponent } from './component/varios/card-paciente/card-paciente.component';
import { CardProfesionalComponent } from './component/varios/card-profesional/card-profesional.component';
import { LoginUsuariosTestComponent } from './component/varios/login-usuarios-test/login-usuarios-test.component';
import { PacienteComponent } from './page/paciente/paciente.component';
import { ProfesionalComponent } from './page/profesional/profesional.component';
import { MiPerfilProfesinalComponent } from './component/profesional/mi-perfil-profesinal/mi-perfil-profesinal.component';
import { MiPerfilPacienteComponent } from './component/paciente/mi-perfil-paciente/mi-perfil-paciente.component';
import { MiPerfilAdminComponent } from './component/admin/mi-perfil-admin/mi-perfil-admin.component';
import { MisTurnosPacienteComponent } from './component/paciente/mis-turnos-paciente/mis-turnos-paciente.component';
import { SolicitarTurnoPacienteComponent } from './component/paciente/solicitar-turno-paciente/solicitar-turno-paciente.component';
import { MisTurnosProfesionalComponent } from './component/profesional/mis-turnos-profesional/mis-turnos-profesional.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BienvenidaComponent,
    Error404Component,
    SeccionUsuariosComponent,
    NavBarComponent,
    HabilitarAccesoComponent,
    InhabilitarAccesoComponent,
    NuevosUsuariosComponent,
    RegistroAdminComponent,
    InicioAdminComponent,
    SprinnerComponent,
    PageLoginComponent,
    PageRegisterComponent,
    CardPacienteComponent,
    CardProfesionalComponent,
    LoginUsuariosTestComponent,
    PacienteComponent,
    ProfesionalComponent,
    MiPerfilProfesinalComponent,
    MiPerfilPacienteComponent,
    MiPerfilAdminComponent,
    MisTurnosPacienteComponent,
    SolicitarTurnoPacienteComponent,
    MisTurnosProfesionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }), // ToastrModule added
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    FirebaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
