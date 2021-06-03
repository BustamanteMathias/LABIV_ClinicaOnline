import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsuario',
})
export class FilterUsuarioPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPost = [];

    if (arg == '' || arg.length < 1) {
      return value;
    } else {
      for (const post of value) {
        if (
          //NOMBRE
          post.profesional.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //APELLIDO
          post.profesional.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //AREA
          post.turno.area.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //FECHA
          post.turno.fecha.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //HORA
          post.turno.hora.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //ESTADO
          post.turno.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //ALTURA
          post.turno.historiaClinica.altura.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //PESO
          post.turno.historiaClinica.peso.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //PRESION
          post.turno.historiaClinica.presion.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //TEMPERATURA
          post.turno.historiaClinica.temperatura.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //GENERICOS
          //CLAVE1
          post.turno.historiaClinica.datosGenerico[0].clave.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //CLAVE2
          post.turno.historiaClinica.datosGenerico[1].clave.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //CLAVE3
          post.turno.historiaClinica.datosGenerico[2].clave.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //DESC1
          post.turno.historiaClinica.datosGenerico[0].valor.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //DESC2
          post.turno.historiaClinica.datosGenerico[1].valor.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          //DESC3
          post.turno.historiaClinica.datosGenerico[2].valor.toLowerCase().indexOf(arg.toLowerCase()) > -1

        ) {
          resultPost.push(post);
        }
      }
    }

    return resultPost;
  }
}
