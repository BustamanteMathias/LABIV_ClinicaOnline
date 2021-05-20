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
    SprinnerComponent
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
