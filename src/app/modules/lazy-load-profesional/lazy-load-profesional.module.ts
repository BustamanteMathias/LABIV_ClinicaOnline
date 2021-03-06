import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidarProfesionalGuard } from '../../guard/validar-profesional.guard';

import { Error404Component } from 'src/app/component/error404/error404.component';
import { MiPerfilProfesinalComponent } from 'src/app/component/profesional/mi-perfil-profesinal/mi-perfil-profesinal.component';
import { MisTurnosProfesionalComponent } from 'src/app/component/profesional/mis-turnos-profesional/mis-turnos-profesional.component';
import { PacientesComponent } from 'src/app/component/profesional/pacientes/pacientes.component';
import { HorariosComponent } from 'src/app/component/profesional/horarios/horarios.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [ValidarProfesionalGuard],
    children: [
      { path: '', redirectTo: 'mi-perfil', pathMatch: "full" },
      { path: 'mi-perfil', component: MiPerfilProfesinalComponent },
      { path: 'mis-turnos', component: MisTurnosProfesionalComponent },
      { path: 'mis-horarios', component: HorariosComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadProfesionalModule { }
