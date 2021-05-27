import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from "./component/error404/error404.component";
import { BienvenidaComponent } from "./page/bienvenida/bienvenida.component";
import { PageLoginComponent } from "./page/page-login/page-login.component";
import { PageRegisterComponent } from "./page/page-register/page-register.component";

const routes: Routes = [
  { path: '', redirectTo: 'bienvenido', pathMatch: "full" },
  { path: 'bienvenido', component: BienvenidaComponent },
  { path: 'ingreso', component: PageLoginComponent },
  { path: 'registro', component: PageRegisterComponent },
  {
    path: 'paciente',
    loadChildren: () => import ('./modules/lazy-load-paciente/modulo-paciente.module').then(m => m.ModuloPacienteModule)
  },
  {
    path: 'admin',
    loadChildren: () => import ('./modules/lazy-load-admin/modulo-admin.module').then(m => m.ModuloAdminModule)
  },
  {
    path: 'profesional',
    loadChildren: () => import ('./modules/lazy-load-profesional/modulo-profesional.module').then(m => m.ModuloProfesionalModule)
  },
  { path: 'error404', component: Error404Component },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
