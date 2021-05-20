export class Admin {
  id: string;
  tipo: string;
  correo: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  foto1: string;
  estado: string;

  constructor() {
    this.tipo = 'ADMIN';
  }
}
