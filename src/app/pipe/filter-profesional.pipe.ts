import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProfesional'
})
export class FilterProfesionalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];

    if (arg == '' || arg.length < 1) {
      return value;
    } else {
      for (const post of value) {
        if (
          post.paciente.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.paciente.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          post.turno.area.toLowerCase().indexOf(arg.toLowerCase()) > -1
        ) {
          resultPost.push(post);
        }
      }
    }

    return resultPost;
  }

}
