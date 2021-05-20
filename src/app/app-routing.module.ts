import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from "./component/error404/error404.component";
import { BienvenidaComponent } from "./page/bienvenida/bienvenida.component";
import { SeccionUsuariosComponent } from "./page/seccion-usuarios/seccion-usuarios.component";
import { ValidarAdminGuard } from './guard/validar-admin.guard';

const routes: Routes = [
  { path: "", redirectTo: "bienvenido", pathMatch: "full" },
  { path: "bienvenido", component: BienvenidaComponent },
  { path: "admin/seccion-usuarios", component: SeccionUsuariosComponent, canActivate: [ValidarAdminGuard]},
  { path: "error404", component: Error404Component },
  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
