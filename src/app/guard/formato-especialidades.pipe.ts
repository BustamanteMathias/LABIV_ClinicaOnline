import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoEspecialidades'
})
export class FormatoEspecialidadesPipe implements PipeTransform {

  transform(especialidades: any[]): string {

    if(especialidades.length > 2){
      return (especialidades[0] + ', ' + especialidades[1] + ', [...]');
    }else{
      return especialidades.length == 1 ? especialidades[0] : especialidades[0] + ', ' + especialidades[1];
    }
  }

}
