import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidarPacienteGuard } from '../../guard/validar-paciente.guard';

import { Error404Component } from '../../component/error404/error404.component';
import { MiPerfilPacienteComponent } from '../../component/paciente/mi-perfil-paciente/mi-perfil-paciente.component';
import { MisTurnosPacienteComponent } from '../../component/paciente/mis-turnos-paciente/mis-turnos-paciente.component';
import { SolicitarTurnoPacienteComponent } from '../../component/paciente/solicitar-turno-paciente/solicitar-turno-paciente.component';
import { HistorialComponent } from '../../component/paciente/historial/historial.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [ValidarPacienteGuard],
    children: [
      { path: '', redirectTo: 'mi-perfil', pathMatch: "full" },
      { path: 'mi-perfil', component: MiPerfilPacienteComponent },
      { path: 'mis-turnos', component: MisTurnosPacienteComponent },
      { path: 'solicitar-turno', component: SolicitarTurnoPacienteComponent },
      { path: 'historial-clinico', component: HistorialComponent },
      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyLoadPacienteModule {}
