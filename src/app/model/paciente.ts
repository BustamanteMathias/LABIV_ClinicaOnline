export class Paciente {
  id: string;
  tipo: string;
  correo: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  obraSocial: string;
  foto1: string;
  foto2: string;
  estado: string;

  constructor() {
    this.tipo = 'PACIENTE';
  }
}
