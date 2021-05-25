import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from 'src/app/component/error404/error404.component';
import { ValidarAdminGuard } from '../../guard/validar-admin.guard';
import { SeccionUsuariosComponent } from '../../page/seccion-usuarios/seccion-usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'seccion-usuarios', pathMatch: "full" },
      { path: 'seccion-usuarios', component: SeccionUsuariosComponent, canActivate: [ValidarAdminGuard] },
      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadAdminModule { }
