import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidarAdministradorGuard } from 'src/app/guard/validar-administrador.guard';

import { MiPerfilAdminComponent } from 'src/app/component/admin/mi-perfil-admin/mi-perfil-admin.component';
import { TurnosAdminComponent } from 'src/app/component/admin/turnos-admin/turnos-admin.component';
import { UsuariosAdminComponent } from 'src/app/component/admin/usuarios-admin/usuarios-admin.component';
import { Error404Component } from 'src/app/component/error404/error404.component';
import { SeccionUsuariosComponent } from '../../page/seccion-usuarios/seccion-usuarios.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [ValidarAdministradorGuard],
    children: [
      { path: '', redirectTo: 'mi-perfil', pathMatch: "full" },
      { path: 'mi-perfil', component: MiPerfilAdminComponent},
      { path: 'usuarios', component: UsuariosAdminComponent},
      { path: 'turnos', component: TurnosAdminComponent},
      { path: 'seccion-usuarios', component: SeccionUsuariosComponent},
      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadAdminModule { }
