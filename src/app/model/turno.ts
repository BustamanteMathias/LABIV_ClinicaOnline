export class Turno {

  id:string = '';
  idPaciente:string = '';
  idProfesional:string = '';
  estado:string = 'PENDIENTE';
  hora:string = '';
  fecha:string = '';
  area:string = '';
  comentarioProfesional:string = '';
  comentarioPaciente:string = '';
  encuesta:any = {
    atencionRecibida: '',
    servicioOnline: '',
    estadoEstablecimiento: '',
    recomiendaClinida: ''
  };
  historiaClinica:any = {
    altura: '',
    peso: '',
    temperatura: '',
    presion: '',
    datosGenerico: [
      {clave: '', valor: ''},{clave : '', valor: ''},{clave: '', valor: ''}
    ]
  };

  constructor() {
  }

  GenerarID(){
    let auxFecha:string[] = this.fecha.split('/');
    let auxFecha2:string = '';
    for (let index = 0; index < auxFecha.length; index++) {
      auxFecha2+=auxFecha[index];
    }

    this.id = `${this.idProfesional}+${auxFecha2}+${this.hora}`;
  }
}
