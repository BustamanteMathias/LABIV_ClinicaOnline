import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadPacienteModule } from "../lazy-load-paciente/lazy-load-paciente.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LazyLoadPacienteModule
  ]
})
export class ModuloPacienteModule { }
